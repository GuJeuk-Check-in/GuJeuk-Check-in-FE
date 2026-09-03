import type {
  ExistingUserCheckInRequest,
  ExistingUserHighAvailabilityLogRequest,
  NewUserSignUpRequest,
  UnknownUserHighAvailabilitySignUpRequest,
} from './types';
import { getAgeTypeFromKoreanAge } from './age';

const YEAR_PREFIX_PATTERN = /^(\d{4})-/;

export class HighAvailabilityPayloadContractError extends Error {
  readonly name = 'HighAvailabilityPayloadContractError';

  constructor(
    readonly birthYMD: string,
    readonly visitTime: string
  ) {
    super('고가용성 요청의 생년월일 또는 방문시각이 올바르지 않습니다.');
  }
}

const parseYear = (value: string): number | null => {
  const match = YEAR_PREFIX_PATTERN.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  return Number.isInteger(year) ? year : null;
};

export const createExistingUserHighAvailabilityPayload = (
  clientRecordId: string,
  payload: ExistingUserCheckInRequest
): ExistingUserHighAvailabilityLogRequest => ({
  clientRecordId,
  id: payload.userId,
  purpose: payload.purpose,
  maleCount: payload.maleCount,
  femaleCount: payload.femaleCount,
  visitTime: payload.visitTime,
});

export const createUnknownUserHighAvailabilityPayload = (
  clientRecordId: string,
  payload: NewUserSignUpRequest
): UnknownUserHighAvailabilitySignUpRequest => {
  const birthYear = parseYear(payload.birthYMD);
  const visitYear = parseYear(payload.visitTime);

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
