import axios from 'axios';

const RETRYABLE_HTTP_STATUS_START = 500;
const RETRYABLE_AXIOS_ERROR_CODES = new Set([
  'ECONNABORTED',
  'ECONNRESET',
  'ERR_BAD_RESPONSE',
  'ERR_NETWORK',
]);

type ApiErrorBody = {
  readonly description?: string;
  readonly message?: string;
};

export const isRetryableCheckInError = (error: unknown): boolean => {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return false;
  }

  const status = error.response?.status;

  if (
    error.code &&
    RETRYABLE_AXIOS_ERROR_CODES.has(error.code) &&
    (status === undefined ||
      status < 400 ||
      status >= RETRYABLE_HTTP_STATUS_START)
  ) {
    return true;
  }

  if (status !== undefined) {
    return status >= RETRYABLE_HTTP_STATUS_START;
  }

  if (error.request !== undefined) {
    return true;
  }

  return typeof navigator !== 'undefined' && navigator.onLine === false;
};

export const getCheckInQueueErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    return (
      error.response?.data?.description ||
      error.response?.data?.message ||
      error.message ||
      '체크인 정보를 서버에 전송하지 못했습니다.'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '체크인 정보를 서버에 전송하지 못했습니다.';
};

export const getNextRetryAt = (
  attemptCount: number,
  now: number
): number => {
  const baseDelayMs = 30_000;
  const maxDelayMs = 10 * 60_000;
  const delayMs = Math.min(
    baseDelayMs * 2 ** Math.max(0, attemptCount - 1),
    maxDelayMs
  );

  return now + delayMs;
};
