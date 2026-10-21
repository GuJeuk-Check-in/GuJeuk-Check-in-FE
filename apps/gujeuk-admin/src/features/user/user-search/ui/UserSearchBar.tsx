import { SearchBar, type SearchBarProps } from '@center/ui/search';

export const UserSearchBar = ({ placeholder = '회원 검색', ...props }: SearchBarProps) => (
  <SearchBar {...props} placeholder={placeholder} />
);
