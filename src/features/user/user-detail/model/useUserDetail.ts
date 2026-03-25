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
    return userInfo;
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
