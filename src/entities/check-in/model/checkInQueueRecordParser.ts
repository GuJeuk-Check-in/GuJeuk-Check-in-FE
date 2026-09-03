import {
  CHECK_IN_QUEUE_KINDS,
  CHECK_IN_QUEUE_STATUSES,
  type CheckInQueueRecord,
} from './checkInQueueTypes';

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isExistingUserPayload = (value: unknown): boolean => {
  if (!isRecordObject(value)) return false;

  return (
    typeof value.userId === 'number' &&
    typeof value.maleCount === 'number' &&
    typeof value.femaleCount === 'number' &&
    typeof value.purpose === 'string' &&
    typeof value.visitTime === 'string'
  );
};

const isNewUserPayload = (value: unknown): boolean => {
  if (!isRecordObject(value)) return false;

  return (
    typeof value.name === 'string' &&
    (value.gender === 'MAN' || value.gender === 'WOMAN') &&
    typeof value.phone === 'string' &&
    typeof value.maleCount === 'number' &&
    typeof value.femaleCount === 'number' &&
    typeof value.birthYMD === 'string' &&
    typeof value.residence === 'string' &&
    typeof value.privacyAgreed === 'boolean' &&
    typeof value.purpose === 'string' &&
    typeof value.visitTime === 'string'
  );
};

const isHighAvailabilityPayload = (value: unknown): boolean =>
  isRecordObject(value) &&
  typeof value.clientRecordId === 'string' &&
  isNewUserPayload(value);

export const isCheckInQueueRecord = (
  value: unknown
): value is CheckInQueueRecord => {
  if (!isRecordObject(value)) return false;

  const sharedShapeIsValid =
    typeof value.id === 'string' &&
    (value.status === CHECK_IN_QUEUE_STATUSES.PENDING ||
      value.status === CHECK_IN_QUEUE_STATUSES.SYNCING ||
      value.status === CHECK_IN_QUEUE_STATUSES.FAILED) &&
    typeof value.attemptCount === 'number' &&
    (typeof value.lastError === 'string' || value.lastError === null) &&
    (typeof value.nextRetryAt === 'number' || value.nextRetryAt === null) &&
    typeof value.createdAt === 'number' &&
    typeof value.updatedAt === 'number';

  if (!sharedShapeIsValid) return false;

  switch (value.kind) {
    case CHECK_IN_QUEUE_KINDS.EXISTING_USER_CHECK_IN:
      return isExistingUserPayload(value.payload);
    case CHECK_IN_QUEUE_KINDS.NEW_USER_SIGN_UP:
      return isNewUserPayload(value.payload);
    case CHECK_IN_QUEUE_KINDS.HIGH_AVAILABILITY_CHECK_IN:
      return isHighAvailabilityPayload(value.payload);
    default:
      return false;
  }
};
