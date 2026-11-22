import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { createVisit, toVisitRequest, type VisitFormValues, type VisitVariant } from '@entities/log';
import { usePurposeOptions } from '@entities/purpose';

interface ServerError {
  message?: string;
}

type CreateVisitVariables = VisitFormValues & { variant: VisitVariant };

export const useCreateVisitList = () => {
  const queryClient = useQueryClient();
  const { options } = usePurposeOptions();

  return useMutation<{ id: number }, AxiosError<ServerError>, CreateVisitVariables>({
    mutationFn: ({ variant, ...form }) => createVisit(toVisitRequest(form, variant, options)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visitList'] }),
  });
};
