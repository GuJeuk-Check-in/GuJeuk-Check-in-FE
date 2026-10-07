import { useState, useMemo, useCallback } from 'react';
import { User, UserSearchFilters } from '@entities/user';
import { matchesKoreanSearch } from '@shared/lib';

export const useSearchUser = (allUsers: User[], filters: UserSearchFilters) => {
  const [searchName, setSearchName] = useState('');

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      if (searchName && !matchesKoreanSearch(user.name, searchName)) {
        return false;
      }
      if (filters.residence && user.residence !== filters.residence) {
        return false;
      }
      return true;
    });
  }, [allUsers, filters.residence, searchName]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchName(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchName('');
  }, []);

  return {
    searchName,
    filteredUsers,
    handleSearchChange,
    handleClearSearch,
    resultCount: filteredUsers.length,
  };
};
