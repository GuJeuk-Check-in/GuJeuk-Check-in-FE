import { publicAxiosInstance } from '@shared/api';
import type {
  ExistingUserHighAvailabilityLogRequest,
  UnknownUserHighAvailabilitySignUpRequest,
} from '../model/types';

export const createExistingUserHighAvailabilityLog = async (
  payload: ExistingUserHighAvailabilityLogRequest
): Promise<void> => {
  await publicAxiosInstance.post('/user/ha-log', payload);
};

export const createUnknownUserHighAvailabilitySignUps = async (
  payload: readonly UnknownUserHighAvailabilitySignUpRequest[]
): Promise<void> => {
  await publicAxiosInstance.post('/user/ha-sign-up', payload);
};
