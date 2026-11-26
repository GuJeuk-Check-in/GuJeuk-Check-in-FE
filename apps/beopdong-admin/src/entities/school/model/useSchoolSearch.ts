import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { searchSchools } from '../api/school.api';
import type { SchoolSearchResponse } from './types';

export const useSchoolSearch = (name: string) => {
  const keyword = name.trim();

  return useInfiniteQuery<SchoolSearchResponse, AxiosError<{ message?: string }>>({
    queryKey: ['schoolSearch', keyword],
    queryFn: ({ pageParam }) => searchSchools(keyword, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    enabled: keyword.length > 0,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
