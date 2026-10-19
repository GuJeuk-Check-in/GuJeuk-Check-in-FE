import type { AgeType } from './age';

export type GenderType = 'MAN' | 'WOMAN';

export interface ApiErrorResponse {
  readonly message?: string;
  readonly status?: number;
  readonly timestamp?: string;
  readonly description?: string;
}

export interface CheckUserRequest {
  readonly name: string;
}

export interface CheckUserResponse {
  readonly userExists: boolean;
  readonly userId: number | null;
}

export interface ExistingUserCheckInRequest {
  readonly userId: number;
  readonly maleCount: number;
  readonly femaleCount: number;
  readonly purpose: string;
  readonly visitTime: string;
}

export interface NewUserSignUpRequest {
  readonly name: string;
  readonly gender: GenderType;
  readonly phone: string;
  readonly maleCount: number;
  readonly femaleCount: number;
  readonly birthYMD: string;
  readonly residence: string;
  readonly privacyAgreed: boolean;
  readonly purpose: string;
  readonly visitTime: string;
}

export interface PublicUserVisitRequest {
  readonly name: string | null;
  readonly age: AgeType;
  readonly phone: string;
  readonly residence?: string;
  readonly maleCount: number;
  readonly femaleCount: number;
  readonly purpose: string;
  readonly visitDate: string;
  readonly visitTime: string;
  readonly privacyAgreed: boolean;
}

export interface PublicUserVisitResponse {
  readonly id: number;
  readonly name: string | null;
  readonly age: AgeType;
  readonly phone: string;
  readonly residence: string;
  readonly maleCount: number;
  readonly femaleCount: number;
  readonly purpose: string;
  readonly visitDate: string;
  readonly visitTime: string;
  readonly privacyAgreed: boolean;
}

export const READY_HEALTH_VALUES = {
  UP: 'UP',
  DOWN: 'DOWN',
} as const;

export type ReadyHealthValue =
  (typeof READY_HEALTH_VALUES)[keyof typeof READY_HEALTH_VALUES];

export type ReadyHealthResponse = {
  readonly status: ReadyHealthValue;
  readonly db: ReadyHealthValue;
};

export type UnknownUserHighAvailabilityQueueRequest = Readonly<
  NewUserSignUpRequest & {
    readonly clientRecordId: string;
  }
>;

export type ExistingUserHighAvailabilityLogRequest = {
  readonly clientRecordId: string;
  readonly id: number;
  readonly purpose: string;
  readonly maleCount: number;
  readonly femaleCount: number;
  readonly visitTime: string;
};

export type UnknownUserHighAvailabilitySignUpRequest = Readonly<
  NewUserSignUpRequest & {
    readonly clientRecordId: string;
    readonly age: AgeType;
  }
>;
