import { useState, useMemo, useCallback } from 'react';
import { User, UserSearchFilters } from '@entities/user/index';

export const useSearchUser = (allUsers: User[], filters: UserSearchFilters) => {
  const [searchName, setSearchName] = useState('');

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      if (searchName && !user.name.includes(searchName)) {
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
