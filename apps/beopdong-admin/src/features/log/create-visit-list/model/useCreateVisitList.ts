import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { createVisit, toVisitRequest, type VisitFormValues, type VisitVariant } from '@entities/log';

interface ServerError {
  message?: string;
}

type CreateVisitVariables = VisitFormValues & { variant: VisitVariant };

export const useCreateVisitList = () => {
  const queryClient = useQueryClient();

  return useMutation<{ id: number }, AxiosError<ServerError>, CreateVisitVariables>({
    mutationFn: ({ variant, ...form }) => createVisit(toVisitRequest(form, variant)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitList'] }),
  });
};
