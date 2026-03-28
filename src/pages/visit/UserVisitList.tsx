import { PageLayout } from '@widgets/GlobalLayout';
import { UserVisitListFeature } from '@features/visit/visit-list/ui/UserVisitListFeature';

const UserVisitList = () => {
  return (
    <PageLayout>
      <UserVisitListFeature />
    </PageLayout>
  );
};

export default UserVisitList;
