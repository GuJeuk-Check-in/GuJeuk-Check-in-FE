import { useCallback, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { searchUsers, UserSearchResponse } from '@entities/user';
import { useDebouncedValue } from '@shared/hooks';

const SEARCH_DEBOUNCE_MS = 300;

export const useSearchUser = () => {
  const [searchName, setSearchName] = useState('');
  const trimmedName = searchName.trim();
  const debouncedName = useDebouncedValue(trimmedName, SEARCH_DEBOUNCE_MS);

  const { data, isError } = useQuery<UserSearchResponse, AxiosError>({
    queryKey: ['userSearch', debouncedName],
    queryFn: () => searchUsers(debouncedName),
    enabled: debouncedName !== '',
    placeholderData: keepPreviousData,
    retry: false,
  });

  const handleSearchChange = useCallback(
    (value: string) => setSearchName(value),
    []
  );
  const handleClearSearch = useCallback(() => setSearchName(''), []);

  return {
    searchName,
    isSearching: trimmedName !== '',
    isSearchLoading: !data && !isError,
    isSearchError: isError,
    searchedUsers: isError ? [] : data?.content ?? [],
    handleSearchChange,
    handleClearSearch,
  };
};
