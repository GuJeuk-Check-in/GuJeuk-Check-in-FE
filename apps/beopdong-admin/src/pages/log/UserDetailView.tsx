import { UserVisitDetail, VisitPageLayout } from '@widgets/log';
import type { UserVisitDetailRecord } from '@entities/log';
import { useParams } from 'react-router-dom';
import { previewVisits } from './model/previewVisits';

const UserDetailView = ({ visit }: { visit?: UserVisitDetailRecord }) => {
  const { logId } = useParams();
  const selectedVisit = visit ?? previewVisits.find((record) => String(record.id) === logId);
  const purposeOptions = [...new Set(previewVisits.flatMap((record) => record.purposes))];

  return (
    <VisitPageLayout title="방명록 상세">
      <UserVisitDetail key={selectedVisit?.id} visit={selectedVisit} purposeOptions={purposeOptions} />
    </VisitPageLayout>
  );
};

export default UserDetailView;
