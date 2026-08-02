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

export const createUnknownUserHighAvailabilitySignUp = async (
  payload: UnknownUserHighAvailabilitySignUpRequest
): Promise<void> => {
  await publicAxiosInstance.post('/user/ha-sign-up', payload);
};
