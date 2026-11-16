import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { createVisit, toCreateVisitRequest } from '@entities/log';

interface ServerError {
  message?: string;
}

type CreateVisitVariables = Parameters<typeof toCreateVisitRequest>[0];

export const useCreateVisitList = () => {
  const queryClient = useQueryClient();

  return useMutation<{ id: number }, AxiosError<ServerError>, CreateVisitVariables>({
    mutationFn: (form) => createVisit(toCreateVisitRequest(form)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitList'] }),
  });
};
