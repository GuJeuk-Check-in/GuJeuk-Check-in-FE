import type { ReactNode } from 'react';
import { UserListLayout } from '@center/ui/search';
import { UserInformationCard, type User } from '@entities/user';

interface UserListWithSearchProps {
  users: readonly User[];
  searchName: string;
  onSearchChange: (name: string) => void;
  totalCount?: number;
  resultCount: number;
  listStatus?: ReactNode;
}

export const UserListWithSearch = ({
  users, searchName, onSearchChange, totalCount, resultCount, listStatus,
}: UserListWithSearchProps) => {
  const name = searchName.trim();

  return (
    <UserListLayout
      totalCount={totalCount}
      searchName={searchName}
      searchPlaceholder="이름으로 회원 검색"
      resultCount={resultCount}
      showResultFooter
      onSearchChange={onSearchChange}
      onClearSearch={() => onSearchChange('')}
      listStatus={listStatus}
      emptyText={name
        ? `"${name}"에 해당하는 회원이 없습니다.`
        : '이 페이지에 표시할 회원이 없습니다.'}
    >
      {users.map((user) => <UserInformationCard key={user.id} user={user} />)}
    </UserListLayout>
  );
};
