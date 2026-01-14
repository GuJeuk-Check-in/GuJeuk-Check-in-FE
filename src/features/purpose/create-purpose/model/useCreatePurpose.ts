import { createPurpose } from '@entities/purpose/api/purpose.api';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreatePurposeRequest,
  PurposeResponse,
} from '@entities/purpose/model/types';

export const useCreatePurpose = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PurposeResponse,
    AxiosError<{ message?: string }>,
    CreatePurposeRequest
  >({
    mutationFn: createPurpose,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purposeList'] });
    },
  });
};
