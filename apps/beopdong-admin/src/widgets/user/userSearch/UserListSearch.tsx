import { Modal } from '@center/ui/modal';
import { UserListLayout } from '@center/ui/search';
import { UserInformationCard, type User } from '@entities/user';
import { useDeleteUser } from '@features/user/delete-user';
import { useSearchUser } from '@features/user/user-search';

interface UserListWithSearchProps {
  users: readonly User[];
}

export const UserListWithSearch = ({ users }: UserListWithSearchProps) => {
  const {
    searchName, filteredUsers, handleSearchChange, handleClearSearch, resultCount,
  } = useSearchUser(users);
  const { modal, handleDelete } = useDeleteUser();

  return (
    <>
      <UserListLayout
        totalCount={users.length}
        searchName={searchName}
        resultCount={resultCount}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        emptyText={searchName
          ? `"${searchName}"에 해당하는 회원이 없습니다.`
          : '등록된 회원이 없습니다.'}
      >
        {filteredUsers.map((user) => (
          <UserInformationCard key={user.id} user={user} onDelete={() => handleDelete(user)} />
        ))}
      </UserListLayout>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </>
  );
};
