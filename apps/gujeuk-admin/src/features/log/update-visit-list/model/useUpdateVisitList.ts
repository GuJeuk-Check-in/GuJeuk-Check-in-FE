import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  updateVisitList,
  UpdateUserVisitRequest,
  UserVisitDetailResponse,
} from '@entities/log';
import { AxiosError } from 'axios';

interface ServerError {
  message?: string;
}

export const useUpdateAdminItem = (): UseMutationResult<
  UserVisitDetailResponse,
  AxiosError<ServerError>,
  UpdateUserVisitRequest
> => {
  const queryClient = useQueryClient();

  return useMutation<
    UserVisitDetailResponse,
    AxiosError<ServerError>,
    UpdateUserVisitRequest
  >({
    mutationFn: (updateData: UpdateUserVisitRequest) =>
      updateVisitList(updateData),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['visitDetail', String(variables.id)],
        }),
        queryClient.invalidateQueries({ queryKey: ['visitList'] }),
        queryClient.invalidateQueries({ queryKey: ['monthVisitList'] }),
        queryClient.invalidateQueries({ queryKey: ['monthVisitDetailList'] }),
      ]);
    },
  });
};
