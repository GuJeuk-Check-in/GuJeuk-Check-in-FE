export const CHECK_IN_SUBMISSION_MODES = {
  STANDARD: 'standard',
  HIGH_AVAILABILITY: 'high-availability',
} as const;

export type CheckInSubmissionMode =
  (typeof CHECK_IN_SUBMISSION_MODES)[keyof typeof CHECK_IN_SUBMISSION_MODES];

export type CheckInSignupRouteState = {
  readonly name: string;
  readonly phone: string;
  readonly submissionMode: CheckInSubmissionMode;
};

export type CheckInHomeRouteState = {
  readonly skipCheckInFunnelPageView: boolean;
};

const isRecordObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const parseCheckInSignupRouteState = (
  value: unknown
): CheckInSignupRouteState => {
  if (!isRecordObject(value)) {
    return {
      name: '',
      phone: '',
      submissionMode: CHECK_IN_SUBMISSION_MODES.STANDARD,
    };
  }

  return {
    name: typeof value.name === 'string' ? value.name : '',
    phone: typeof value.phone === 'string' ? value.phone : '',
    submissionMode:
      value.submissionMode === CHECK_IN_SUBMISSION_MODES.HIGH_AVAILABILITY
        ? CHECK_IN_SUBMISSION_MODES.HIGH_AVAILABILITY
        : CHECK_IN_SUBMISSION_MODES.STANDARD,
  };
};

export const createHighAvailabilityRouteState = (
  name = '',
  phone = ''
): CheckInSignupRouteState => ({
  name,
  phone,
  submissionMode: CHECK_IN_SUBMISSION_MODES.HIGH_AVAILABILITY,
});

export const createCheckInHomeRouteState = (): CheckInHomeRouteState => ({
  skipCheckInFunnelPageView: true,
});

export const shouldSkipCheckInFunnelPageView = (value: unknown): boolean =>
  isRecordObject(value) && value.skipCheckInFunnelPageView === true;
