import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { fetchUserVisitList, deleteUserVisit } from '../api';
import { UserVisitListResponse } from '../types';
import { AxiosError } from 'axios';

interface ServerError {
  message?: string;
}

export const useInfiniteUserVisitList = () => {
  return useInfiniteQuery<
    UserVisitListResponse,
    AxiosError,
    UserVisitListResponse,
    ['visitList'],
    number
  >({
    queryKey: ['visitList'],
    queryFn: ({ pageParam = 0 }) => fetchUserVisitList(pageParam),
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.last) return undefined;
      if (!lastPage.content?.length) return undefined;
      return lastPage.number + 1;
    },
    initialPageParam: 0,
  });
};

export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ServerError>, number>({
    mutationFn: (id: number) => deleteUserVisit(id),
    onSuccess: () =>
      queryClient.removeQueries({
        queryKey: ['visitList'],
      }),
    onError: (error) =>
      alert(error.response?.data?.message || error.message || '삭제 실패'),
  });
};
