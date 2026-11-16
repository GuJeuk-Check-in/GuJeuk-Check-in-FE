import { UserVisitDetail, VisitPageLayout } from '@widgets/log';
import { isAdultAge, type UserVisitDetailRecord } from '@entities/log';
import { getVisitPurposeOptions } from '@entities/purpose';
import { useParams } from 'react-router-dom';
import { previewVisits } from './model/previewVisits';

const UserDetailView = ({ visit }: { visit?: UserVisitDetailRecord }) => {
  const { logId } = useParams();
  const selectedVisit = visit ?? previewVisits.find((record) => String(record.id) === logId);
  const variant = selectedVisit && isAdultAge(selectedVisit.age) ? 'adult' : 'minor';

  return (
    <VisitPageLayout title="방명록 상세">
      <UserVisitDetail key={selectedVisit?.id} visit={selectedVisit} purposeOptions={getVisitPurposeOptions(variant)} />
    </VisitPageLayout>
  );
};

export default UserDetailView;
