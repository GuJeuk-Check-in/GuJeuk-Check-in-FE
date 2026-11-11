import { useCallback, useState } from 'react';
import { getApiErrorMessage, updatePassword, type UpdatePasswordRequest } from '@entities/auth';

interface UpdatePasswordCallbacks {
  readonly onSuccess: () => void;
  readonly onError: (message: string) => void;
}

const FALLBACK_MESSAGE = '비밀번호 변경 중 오류가 발생했습니다.';

export const useUpdatePassword = () => {
  const [isPending, setIsPending] = useState(false);

  const submit = useCallback(
    async (values: UpdatePasswordRequest, { onSuccess, onError }: UpdatePasswordCallbacks) => {
      setIsPending(true);
      try {
        await updatePassword(values);
        onSuccess();
      } catch (error) {
        onError(getApiErrorMessage(error, FALLBACK_MESSAGE));
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return { updatePassword: submit, isPending };
};
