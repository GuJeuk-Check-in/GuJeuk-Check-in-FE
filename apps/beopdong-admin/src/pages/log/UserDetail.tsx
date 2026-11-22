import { useMemo } from 'react';
import { getVisitPurposeOptions, usePurposeOptions } from '@entities/purpose';
import { VisitForm, VisitPageLayout } from '@widgets/log';

interface UserDetailProps {
  readonly title: string;
  readonly variant: 'minor' | 'adult';
}

const UserDetail = ({ title, variant }: UserDetailProps) => {
  const { options } = usePurposeOptions();
  const purposeOptions = useMemo(
    () =>
      getVisitPurposeOptions(
        variant,
        options.map(({ name }) => name)
      ),
    [variant, options]
  );

  return (
    <VisitPageLayout title={title}>
      <VisitForm key={variant} purposeOptions={purposeOptions} variant={variant} />
    </VisitPageLayout>
  );
};

export default UserDetail;
