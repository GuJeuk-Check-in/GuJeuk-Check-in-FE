import { useCallback, useState } from 'react';
import { getApiErrorMessage, organLogin, tokenStorage, type OrganLoginRequest } from '@entities/auth';

interface LoginCallbacks {
  readonly onSuccess: () => void;
  readonly onError: (message: string) => void;
}

const FALLBACK_MESSAGE = '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.';
const STORAGE_FAILURE_MESSAGE = '로그인 정보를 저장하지 못했습니다.';

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);

  const login = useCallback(async (values: OrganLoginRequest, { onSuccess, onError }: LoginCallbacks) => {
    setIsPending(true);
    try {
      const { accessToken, refreshToken } = await organLogin(values);
      if (!tokenStorage.save(accessToken, refreshToken)) {
        onError(STORAGE_FAILURE_MESSAGE);
        return;
      }
      onSuccess();
    } catch (error) {
      onError(getApiErrorMessage(error, FALLBACK_MESSAGE));
    } finally {
      setIsPending(false);
    }
  }, []);

  return { login, isPending };
};
