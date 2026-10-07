import { useMemo } from 'react';
import { useFetchUserInformation } from '@entities/user';
import type { UserInformation } from '@entities/user';

interface UseUserDetailResult {
  userData: UserInformation | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
  isNotFound: boolean;
}

export const useUserDetail = (userIdParam?: string): UseUserDetailResult => {
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchUserInformation(userIdParam);

  const userData = useMemo<UserInformation | null>(() => {
    if (!userInfo) {
      return null;
    }
    return {
      id: userInfo.id || parseInt(userIdParam || '0', 10),
      name: userInfo.name || '',
      userId: userInfo.userId || '',
      phone: userInfo.phone || '',
      gender: userInfo.gender || 'MALE',
      birthYMD: userInfo.birthYMD || '',
      residence: userInfo.residence || '',
      privacyAgreed: userInfo.privacyAgreed || false,
    };
  }, [userInfo, userIdParam]);

  const isNotFound = !isLoading && !isError && !userData;

  return {
    userData,
    isLoading,
    isError,
    error,
    refetch,
    isNotFound,
  };
};
