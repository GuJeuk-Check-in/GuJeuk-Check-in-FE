import { publicAxiosInstance } from '@shared/api';
import type {
  CheckUserRequest,
  CheckUserResponse,
  ExistingUserCheckInRequest,
  NewUserSignUpRequest,
  PublicUserVisitRequest,
  PublicUserVisitResponse,
} from '../model/types';

export const checkUserExists = async (
  payload: CheckUserRequest
): Promise<CheckUserResponse> => {
  const response = await publicAxiosInstance.post<CheckUserResponse>(
    '/user',
    payload
  );
  return response.data;
};

export const signUpPublicUser = async (
  payload: NewUserSignUpRequest
): Promise<void> => {
  await publicAxiosInstance.post('/user/sign-up', payload);
};

export const createExistingUserCheckIn = async (
  payload: ExistingUserCheckInRequest
): Promise<void> => {
  await publicAxiosInstance.post('/user/check-in', payload);
};

export const createPublicUserVisit = async (
  visitData: PublicUserVisitRequest
): Promise<PublicUserVisitResponse> => {
  const response = await publicAxiosInstance.post('/check-in', visitData);
  return response.data;
};
