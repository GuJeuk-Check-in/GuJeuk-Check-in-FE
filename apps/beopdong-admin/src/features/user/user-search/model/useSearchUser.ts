import { useState } from 'react';
import { useDebouncedValue } from '@center/ui/search';
import { useUserSearch } from '@entities/user';

const SEARCH_DEBOUNCE_MS = 300;

export const useSearchUser = () => {
  const [searchName, setSearchName] = useState('');
  const name = searchName.trim();
  const debouncedName = useDebouncedValue(name, SEARCH_DEBOUNCE_MS);
  const query = useUserSearch(name === debouncedName ? name : '');

  return { searchName, setSearchName, isSearching: name !== '', query };
};
