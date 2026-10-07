export const CHECK_IN_SUBMISSION_OUTCOMES = {
  COMPLETE: 'complete',
  VISITOR_INPUT_ERROR: 'visitor_input_error',
  SAVE_FAILED: 'save_failed',
  LOCAL_QUEUE_SAVE_FAILED: 'local_queue_save_failed',
} as const;

export type CheckInSubmissionOutcome =
  (typeof CHECK_IN_SUBMISSION_OUTCOMES)[keyof typeof CHECK_IN_SUBMISSION_OUTCOMES];

export type CompleteCheckInSubmissionResult = {
  readonly outcome: typeof CHECK_IN_SUBMISSION_OUTCOMES.COMPLETE;
  readonly clientRecordId?: string;
};

export type FailedCheckInSubmissionResult = {
  readonly outcome: Exclude<
    CheckInSubmissionOutcome,
    typeof CHECK_IN_SUBMISSION_OUTCOMES.COMPLETE
  >;
  readonly error?: unknown;
};

export type CheckInSubmissionResult =
  | CompleteCheckInSubmissionResult
  | FailedCheckInSubmissionResult;

export const completeCheckInSubmission = (
  clientRecordId?: string
): CompleteCheckInSubmissionResult =>
  clientRecordId
    ? { outcome: CHECK_IN_SUBMISSION_OUTCOMES.COMPLETE, clientRecordId }
    : { outcome: CHECK_IN_SUBMISSION_OUTCOMES.COMPLETE };

export const createCheckInSubmissionFailure = (
  outcome:
    | typeof CHECK_IN_SUBMISSION_OUTCOMES.VISITOR_INPUT_ERROR
    | typeof CHECK_IN_SUBMISSION_OUTCOMES.SAVE_FAILED
    | typeof CHECK_IN_SUBMISSION_OUTCOMES.LOCAL_QUEUE_SAVE_FAILED,
  error?: unknown
): FailedCheckInSubmissionResult =>
  error === undefined ? { outcome } : { outcome, error };

export const isCompleteCheckInSubmission = (
  result: CheckInSubmissionResult
): result is CompleteCheckInSubmissionResult =>
  result.outcome === CHECK_IN_SUBMISSION_OUTCOMES.COMPLETE;

export const isFailedCheckInSubmission = (
  result: CheckInSubmissionResult
): result is FailedCheckInSubmissionResult =>
  !isCompleteCheckInSubmission(result);

export const unexpectedCheckInSubmissionErrorResult = (
  error?: unknown
): FailedCheckInSubmissionResult =>
  createCheckInSubmissionFailure(
    CHECK_IN_SUBMISSION_OUTCOMES.SAVE_FAILED,
    error
  );
