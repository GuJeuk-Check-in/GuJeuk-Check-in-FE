import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toVisitRequest, updateVisit, type VisitFormValues, type VisitVariant } from '@entities/log';
import { usePurposeOptions } from '@entities/purpose';

interface ServerError {
  message?: string;
}

type UpdateVisitVariables = { id: number; variant: VisitVariant } & VisitFormValues;

export const useUpdateVisitList = () => {
  const queryClient = useQueryClient();
  const { options } = usePurposeOptions();

  return useMutation<void, AxiosError<ServerError>, UpdateVisitVariables>({
    mutationFn: ({ id, variant, ...form }) => updateVisit(id, toVisitRequest(form, variant, options)),
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['visitDetail', id] }),
        queryClient.invalidateQueries({ queryKey: ['visitList'] }),
      ]);
    },
  });
};
