import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import {
  updateVisitList,
  UpdateUserVisitRequest,
  UserVisitDetailResponse,
} from '@entities/visit/index';
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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminList'] });
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: ['adminItem', variables.id],
        });
      }
    },
  });
};
