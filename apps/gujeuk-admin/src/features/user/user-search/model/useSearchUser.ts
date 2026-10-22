import { useCallback } from 'react';
import { useNameSearch } from '@center/ui/search';
import { User, UserSearchFilters } from '@entities/user';

export const useSearchUser = (allUsers: User[], filters: UserSearchFilters) => {
  const matchesResidence = useCallback(
    (user: User) => !filters.residence || user.residence === filters.residence,
    [filters.residence],
  );
  const { filteredItems, ...search } = useNameSearch(allUsers, matchesResidence);

  return { ...search, filteredUsers: filteredItems };
};
