import { PageLayout } from '@widgets/GlobalLayout';
import { UserListWithSearch } from '@widgets/user/userSearch/UserListSearch';

const UserInformation = () => {
  return (
    <PageLayout>
      <UserListWithSearch totalCountText="총" />
    </PageLayout>
  );
};

export default UserInformation;
