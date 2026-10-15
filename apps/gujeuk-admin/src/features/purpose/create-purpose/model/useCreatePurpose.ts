import {
  createPurpose,
  CreatePurposeRequest,
  PurposeResponse,
} from '@entities/purpose';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
