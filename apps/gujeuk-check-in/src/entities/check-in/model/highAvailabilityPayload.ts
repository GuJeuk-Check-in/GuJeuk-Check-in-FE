import type {
  ExistingUserCheckInRequest,
  ExistingUserHighAvailabilityLogRequest,
  NewUserSignUpRequest,
  UnknownUserHighAvailabilitySignUpRequest,
} from './types';
import { getAgeTypeFromKoreanAge } from './age';

const BIRTH_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const VISIT_TIME_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{3})?$/;

export class HighAvailabilityPayloadContractError extends Error {
  readonly name = 'HighAvailabilityPayloadContractError';

  constructor(
    readonly birthYMD: string,
    readonly visitTime: string
  ) {
    super('고가용성 요청의 생년월일 또는 방문시각이 올바르지 않습니다.');
  }
}

const isValidCalendarDate = (
  year: number,
  month: number,
  day: number
): boolean => {
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1) {
    return false;
  }

  return new Date(Date.UTC(year, month, 0)).getUTCDate() >= day;
};

const parseYear = (value: string, pattern: RegExp): number | null => {
  const match = pattern.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!Number.isInteger(year) || !isValidCalendarDate(year, month, day)) {
    return null;
  }

  if (pattern === VISIT_TIME_PATTERN) {
    const hour = Number(match[4]);
    const minute = Number(match[5]);
    const second = Number(match[6]);
    if (hour > 23 || minute > 59 || second > 59) return null;
  }

  return year;
};

export const createExistingUserHighAvailabilityPayload = (
  clientRecordId: string,
  payload: ExistingUserCheckInRequest
): ExistingUserHighAvailabilityLogRequest => {
  if (parseYear(payload.visitTime, VISIT_TIME_PATTERN) === null) {
    throw new HighAvailabilityPayloadContractError('', payload.visitTime);
  }

  return {
    clientRecordId,
    id: payload.userId,
    purpose: payload.purpose,
    maleCount: payload.maleCount,
    femaleCount: payload.femaleCount,
    visitTime: payload.visitTime,
  };
};

export const createUnknownUserHighAvailabilityPayload = (
  clientRecordId: string,
  payload: NewUserSignUpRequest
): UnknownUserHighAvailabilitySignUpRequest => {
  const birthYear = parseYear(payload.birthYMD, BIRTH_DATE_PATTERN);
  const visitYear = parseYear(payload.visitTime, VISIT_TIME_PATTERN);

  if (
    birthYear === null ||
    visitYear === null ||
    visitYear < birthYear
  ) {
    throw new HighAvailabilityPayloadContractError(
      payload.birthYMD,
      payload.visitTime
    );
  }

  return {
    clientRecordId,
    name: payload.name,
    phone: payload.phone,
    gender: payload.gender,
    birthYMD: payload.birthYMD,
    age: getAgeTypeFromKoreanAge(visitYear - birthYear + 1),
    residence: payload.residence,
    privacyAgreed: payload.privacyAgreed,
    maleCount: payload.maleCount,
    femaleCount: payload.femaleCount,
    purpose: payload.purpose,
    visitTime: payload.visitTime,
  };
};
