import { useState, useMemo, useCallback } from 'react';
import { User, UserSearchFilters } from '@entities/user';
import { matchesKoreanSearch } from '@shared/lib';

// 회원 목록을 이름(한글 검색) 및 거주지로 필터링하는 훅
export const useSearchUser = (allUsers: User[], filters: UserSearchFilters) => {
  // 검색어 입력값
  const [searchName, setSearchName] = useState('');

  // 검색어 & 거주지 조건에 맞는 회원만 필터링
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      // 검색어와 이름(초성 포함)이 매칭되지 않으면 제외
      if (searchName && !matchesKoreanSearch(user.name, searchName)) {
        return false;
      }
      // 선택된 거주지와 다르면 제외
      if (filters.residence && user.residence !== filters.residence) {
        return false;
      }
      return true;
    });
  }, [allUsers, filters.residence, searchName]);

  // 검색어 변경 처리
  const handleSearchChange = useCallback((value: string) => {
    setSearchName(value);
  }, []);

  // 검색어 초기화
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
