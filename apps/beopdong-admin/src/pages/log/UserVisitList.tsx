import { UserVisitListFeature } from '@features/log/visit-list';
import { previewVisits } from './model/previewVisits';

const UserVisitList = () => {
  return <UserVisitListFeature visits={previewVisits} />;
};

export default UserVisitList;
