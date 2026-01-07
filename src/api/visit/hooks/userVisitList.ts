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
    ['visits'],
    number
  >({
    queryKey: ['visits'],
    queryFn: ({ pageParam = 0 }) => fetchUserVisitList(pageParam),
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.last) return undefined;
      if (!lastPage.content?.length) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
  });
};

export const useDeleteVisitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ServerError>, number>({
    mutationFn: (id: number) => deleteUserVisit(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['visits'] }),
    onError: (error) =>
      alert(error.response?.data?.message || error.message || '삭제 실패'),
  });
};
