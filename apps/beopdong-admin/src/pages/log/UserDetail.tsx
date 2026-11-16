import { getVisitPurposeOptions } from '@entities/purpose';
import { VisitForm, VisitPageLayout } from '@widgets/log';

interface UserDetailProps {
  readonly title: string;
  readonly variant: 'minor' | 'adult';
}

const UserDetail = ({ title, variant }: UserDetailProps) => {
  return (
    <VisitPageLayout title={title}>
      <VisitForm key={variant} purposeOptions={getVisitPurposeOptions(variant)} variant={variant} />
    </VisitPageLayout>
  );
};

export default UserDetail;
