import { useCallback, useState } from 'react';
import { getApiErrorMessage, updatePassword, type UpdatePasswordRequest } from '@entities/auth';
import { CURRENT_PASSWORD_MISMATCH_MESSAGE, type MutationCallbacks } from '@center/ui/auth';
import { isAxiosError } from 'axios';

const FALLBACK_MESSAGE = '비밀번호 변경 중 오류가 발생했습니다.';

export const useUpdatePassword = () => {
  const [isPending, setIsPending] = useState(false);

  const submit = useCallback(
    async (values: UpdatePasswordRequest, { onSuccess, onError }: MutationCallbacks) => {
      setIsPending(true);
      try {
        await updatePassword(values);
        onSuccess();
      } catch (error) {
        // 이 API의 401은 기존 비밀번호 불일치를 뜻한다.
        if (isAxiosError(error) && error.response?.status === 401) {
          onError(CURRENT_PASSWORD_MISMATCH_MESSAGE);
        } else {
          onError(getApiErrorMessage(error, FALLBACK_MESSAGE));
        }
      } finally {
        setIsPending(false);
      }
    },
    []
  );

  return { updatePassword: submit, isPending };
};
