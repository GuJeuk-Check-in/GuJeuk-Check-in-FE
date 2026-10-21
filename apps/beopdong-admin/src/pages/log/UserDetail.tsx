import { VisitForm, VisitPageLayout } from '@widgets/log';
import { previewVisits } from './model/previewVisits';

const UserDetail = () => {
  const purposeOptions = [...new Set(previewVisits.flatMap((record) => record.purposes))];

  return (
    <VisitPageLayout title="방명록 추가">
      <VisitForm purposeOptions={purposeOptions} />
    </VisitPageLayout>
  );
};

export default UserDetail;
