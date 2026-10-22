import { useNameSearch } from '@center/ui/search';
import type { User } from '@entities/user';

export const useSearchUser = (allUsers: readonly User[]) => {
  const { filteredItems, ...search } = useNameSearch(allUsers);

  return { ...search, filteredUsers: filteredItems };
};
