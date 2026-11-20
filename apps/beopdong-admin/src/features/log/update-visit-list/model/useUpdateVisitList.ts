import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toVisitRequest, updateVisit, type VisitFormValues, type VisitVariant } from '@entities/log';

interface ServerError {
  message?: string;
}

type UpdateVisitVariables = { id: number; variant: VisitVariant } & VisitFormValues;

export const useUpdateVisitList = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ServerError>, UpdateVisitVariables>({
    mutationFn: ({ id, variant, ...form }) => updateVisit(id, toVisitRequest(form, variant)),
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['visitDetail', id] }),
        queryClient.invalidateQueries({ queryKey: ['visitList'] }),
      ]);
    },
  });
};
