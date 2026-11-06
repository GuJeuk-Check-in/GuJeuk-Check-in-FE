import { useCallback, useState } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { NormalizedUserPage, searchUsers } from '@entities/user';
import { useDebouncedValue } from '@shared/hooks';

const SEARCH_DEBOUNCE_MS = 300;

export const useSearchUser = () => {
  const [searchName, setSearchName] = useState('');
  const trimmedName = searchName.trim();
  const debouncedName = useDebouncedValue(trimmedName, SEARCH_DEBOUNCE_MS);

  const {
    data,
    isError,
    isPlaceholderData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<NormalizedUserPage, AxiosError>({
    queryKey: ['userSearch', debouncedName],
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;
      const res = await searchUsers(debouncedName, currentPage);

      return {
        users: res.content,
        totalCount: res.totalCount,
        last: res.content.length === 0,
        page: currentPage,
      };
    },

    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (count, page) => count + page.users.length,
        0
      );
      if (lastPage.last || loadedCount >= lastPage.totalCount) {
        return undefined;
      }
      return lastPage.page + 1;
    },

    enabled: debouncedName !== '',
    placeholderData: keepPreviousData,
    retry: false,
  });

  const handleClearSearch = useCallback(() => setSearchName(''), []);

  const pages = isError ? [] : data?.pages ?? [];

  return {
    searchName,
    isSearching: trimmedName !== '',
    isSearchLoading:
      !isError &&
      (!data || isPlaceholderData || trimmedName !== debouncedName),
    isSearchError: isError,
    searchedUsers: pages.flatMap((page) => page.users),
    searchTotalCount: pages[0]?.totalCount ?? 0,
    searchPagination: {
      hasNextPage: hasNextPage && !isPlaceholderData,
      isFetchingNextPage,
      fetchNextPage,
    },
    handleSearchChange: setSearchName,
    handleClearSearch,
  };
};
