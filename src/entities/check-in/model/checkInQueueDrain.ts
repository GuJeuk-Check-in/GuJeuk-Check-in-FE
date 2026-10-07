import axios from 'axios';
import {
  createExistingUserHighAvailabilityLog,
  createUnknownUserHighAvailabilitySignUp,
} from '../api/highAvailabilityCheckIn.api';
import {
  getCheckInQueueErrorMessage,
  getNextRetryAt,
  isRetryableCheckInError,
} from './checkInRetryPolicy';
import { withCheckInQueueDrainLock } from './checkInQueueDrainLock';
import {
  deleteCheckInQueueRecords,
  getDueCheckInQueueRecords,
  markCheckInQueueRecordFailed,
  markCheckInQueueRecordSyncing,
} from './checkInQueueStorage';
import {
  CHECK_IN_QUEUE_KINDS,
  type CheckInQueueRecord,
} from './checkInQueueTypes';
import {
  createExistingUserHighAvailabilityPayload,
  createUnknownUserHighAvailabilityPayload,
  HighAvailabilityPayloadContractError,
} from './highAvailabilityPayload';

const DRAIN_BATCH_LIMIT = 5;
const LOCKED_DRAIN_RESULT: CheckInQueueDrainResult = {
  sentCount: 0,
  stoppedOnError: false,
};

export type CheckInQueueDrainResult = {
  readonly sentCount: number;
  readonly stoppedOnError: boolean;
};

let activeDrain: Promise<CheckInQueueDrainResult> | null = null;

type PreparedBatch = {
  readonly records: readonly CheckInQueueRecord[];
  readonly send: () => Promise<void>;
};

type BatchDrainResult = CheckInQueueDrainResult & {
  readonly shouldStopDrain: boolean;
};

export class UnexpectedCheckInQueueKindError extends Error {
  readonly name = 'UnexpectedCheckInQueueKindError';

  constructor() {
    super('지원하지 않는 체크인 큐 종류입니다.');
  }
}

const assertNever = (value: never): never => {
  void value;
  throw new UnexpectedCheckInQueueKindError();
};

const createPreparedBatches = async (
  records: readonly CheckInQueueRecord[]
): Promise<readonly PreparedBatch[]> => {
  const batches: PreparedBatch[] = [];

  for (const record of records) {
    switch (record.kind) {
      case CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN:
        try {
          const payload = createExistingUserHighAvailabilityPayload(
            record.id,
            record.payload
          );

          batches.push({
            records: [record],
            send: () => createExistingUserHighAvailabilityLog(payload),
          });
        } catch (error) {
          if (!(error instanceof HighAvailabilityPayloadContractError)) {
            throw error;
          }

          await markCheckInQueueRecordFailed(
            record,
            getCheckInQueueErrorMessage(error),
            null,
            Date.now()
          );
        }
        break;
      case CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP:
      case CHECK_IN_QUEUE_KINDS.HIGH_AVAILABILITY_CHECK_IN:
        try {
          const payload = createUnknownUserHighAvailabilityPayload(
            record.id,
            record.payload
          );

          batches.push({
            records: [record],
            send: () => createUnknownUserHighAvailabilitySignUp(payload),
          });
        } catch (error) {
          if (!(error instanceof HighAvailabilityPayloadContractError)) {
            throw error;
          }

          await markCheckInQueueRecordFailed(
            record,
            getCheckInQueueErrorMessage(error),
            null,
            Date.now()
          );
        }
        break;
      default:
        assertNever(record);
    }
  }

  return batches.sort((left, right) => {
    const leftCreatedAt = left.records[0]?.createdAt ?? Number.MAX_SAFE_INTEGER;
    const rightCreatedAt =
      right.records[0]?.createdAt ?? Number.MAX_SAFE_INTEGER;
    return leftCreatedAt - rightCreatedAt;
  });
};

const runBatch = async (batch: PreparedBatch): Promise<BatchDrainResult> => {
  for (const record of batch.records) {
    await markCheckInQueueRecordSyncing(record, Date.now());
  }

  let serverAccepted = false;

  try {
    await batch.send();
    serverAccepted = true;
    await deleteCheckInQueueRecords(batch.records.map((record) => record.id));
    return {
      sentCount: batch.records.length,
      stoppedOnError: false,
      shouldStopDrain: false,
    };
  } catch (error) {
    if (
      !serverAccepted &&
      !axios.isAxiosError(error) &&
      !(error instanceof DOMException)
    ) {
      throw error;
    }

    const retryable = serverAccepted || isRetryableCheckInError(error);
    const failedAt = Date.now();

    for (const record of batch.records) {
      await markCheckInQueueRecordFailed(
        record,
        getCheckInQueueErrorMessage(error),
        retryable
          ? getNextRetryAt(record.attemptCount + 1, failedAt)
          : null,
        failedAt
      );
    }

    return {
      sentCount: 0,
      stoppedOnError: true,
      shouldStopDrain: retryable,
    };
  }
};

const runDrain = async (): Promise<CheckInQueueDrainResult> => {
  const dueRecords = await getDueCheckInQueueRecords(
    Date.now(),
    DRAIN_BATCH_LIMIT
  );
  const batches = await createPreparedBatches(dueRecords);
  let sentCount = 0;
  let stoppedOnError = false;

  for (const batch of batches) {
    const result = await runBatch(batch);
    sentCount += result.sentCount;
    stoppedOnError = stoppedOnError || result.stoppedOnError;

    if (result.shouldStopDrain) break;
  }

  return { sentCount, stoppedOnError };
};

export const drainCheckInQueue = (): Promise<CheckInQueueDrainResult> => {
  if (activeDrain) return activeDrain;

  activeDrain = (async () => {
    const result = await withCheckInQueueDrainLock(
      runDrain,
      LOCKED_DRAIN_RESULT
    );
    const rerunResult = await withCheckInQueueDrainLock(
      runDrain,
      LOCKED_DRAIN_RESULT
    );

    return {
      sentCount: result.sentCount + rerunResult.sentCount,
      stoppedOnError: result.stoppedOnError || rerunResult.stoppedOnError,
    };
  })().finally(() => {
    activeDrain = null;
  });

  return activeDrain;
};
