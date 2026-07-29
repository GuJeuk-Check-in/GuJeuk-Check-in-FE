import { publicAxiosInstance } from '@shared/api';
import type {
  ExistingUserHighAvailabilityLogRequest,
  UnknownUserHighAvailabilitySignUpRequest,
} from '../model/types';

export const createExistingUserHighAvailabilityLogs = async (
  payload: readonly ExistingUserHighAvailabilityLogRequest[]
): Promise<void> => {
  await publicAxiosInstance.post('/user/ha-log', payload);
};

export const createUnknownUserHighAvailabilitySignUps = async (
  payload: readonly UnknownUserHighAvailabilitySignUpRequest[]
): Promise<void> => {
  await publicAxiosInstance.post('/user/ha-sing-up', payload);
};
