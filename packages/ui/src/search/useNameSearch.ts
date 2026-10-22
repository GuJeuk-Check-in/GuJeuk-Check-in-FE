import { useCallback, useMemo, useState } from 'react';
import { matchesKoreanSearch } from './koreanSearch';

export const useNameSearch = <T extends { name: string }>(
  items: readonly T[],
  matchesFilter?: (item: T) => boolean,
) => {
  const [searchName, setSearchName] = useState('');
  const filteredItems = useMemo(
    () => items.filter((item) =>
      matchesKoreanSearch(item.name, searchName) && (!matchesFilter || matchesFilter(item)),
    ),
    [items, searchName, matchesFilter],
  );
  const handleSearchChange = useCallback((value: string) => setSearchName(value), []);
  const handleClearSearch = useCallback(() => setSearchName(''), []);

  return {
    searchName,
    filteredItems,
    handleSearchChange,
    handleClearSearch,
    resultCount: filteredItems.length,
  };
};
