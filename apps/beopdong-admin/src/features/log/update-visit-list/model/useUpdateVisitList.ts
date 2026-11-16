import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toUpdateVisitRequest, updateVisit } from '@entities/log';

interface ServerError {
  message?: string;
}

type UpdateVisitVariables = { id: number } & Parameters<typeof toUpdateVisitRequest>[0];

export const useUpdateVisitList = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ServerError>, UpdateVisitVariables>({
    mutationFn: ({ id, ...form }) => updateVisit(id, toUpdateVisitRequest(form)),
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['visitDetail', String(id)] }),
        queryClient.invalidateQueries({ queryKey: ['visitList'] }),
      ]);
    },
  });
};
