import type {
  AgeType,
  ExistingUserCheckInRequest,
  ExistingUserHighAvailabilityLogRequest,
  NewUserSignUpRequest,
  UnknownUserHighAvailabilitySignUpRequest,
} from './types';

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

const getAgeType = (koreanAge: number): AgeType => {
  if (koreanAge <= 8) return 'BABY';
  if (koreanAge <= 13) return 'AGE_9_13';
  if (koreanAge <= 16) return 'AGE_14_16';
  if (koreanAge <= 19) return 'AGE_17_19';
  if (koreanAge <= 24) return 'AGE_20_24';
  return 'ADULT';
};

export const createExistingUserHighAvailabilityPayload = (
  payload: ExistingUserCheckInRequest
): ExistingUserHighAvailabilityLogRequest => ({
  id: payload.userId,
  purpose: payload.purpose,
  maleCount: payload.maleCount,
  femaleCount: payload.femaleCount,
  visitTime: payload.visitTime,
});

export const createUnknownUserHighAvailabilityPayload = (
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
    name: payload.name,
    phone: payload.phone,
    gender: payload.gender,
    birthYMD: payload.birthYMD,
    age: getAgeType(visitYear - birthYear + 1),
    residence: payload.residence,
    privacyAgreed: payload.privacyAgreed,
    maleCount: payload.maleCount,
    femaleCount: payload.femaleCount,
    purpose: payload.purpose,
    visitTime: payload.visitTime,
  };
};
