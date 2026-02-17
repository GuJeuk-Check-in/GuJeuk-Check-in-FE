import { createResidence } from '@entities/residence/index';
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateResidenceRequest,
  ResidenceResponse,
} from '@entities/residence/index';

export const useCreateResidence = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResidenceResponse,
    AxiosError<{ message?: string }>,
    CreateResidenceRequest
  >({
    mutationFn: createResidence,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residenceList'] });
    },
  });
};
