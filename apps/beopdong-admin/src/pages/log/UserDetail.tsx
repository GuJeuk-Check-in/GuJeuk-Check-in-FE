import { useMemo } from 'react';
import { LoadErrorView } from '@center/ui/feedback';
import { getVisitPurposeOptions, usePurposeOptions } from '@entities/purpose';
import { VisitForm, VisitPageLayout } from '@widgets/log';

interface UserDetailProps {
  readonly title: string;
  readonly variant: 'minor' | 'adult';
}

const UserDetail = ({ title, variant }: UserDetailProps) => {
  const { options, isError, refetch } = usePurposeOptions();
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
      {isError ? (
        <LoadErrorView
          title="이용대장 목록을 불러올 수 없습니다"
          hint="이용대장을 선택해야 방명록을 추가할 수 있습니다"
          retryLabel="이용대장 다시 조회하기"
          onRetry={() => void refetch()}
        />
      ) : (
        <VisitForm key={variant} purposeOptions={purposeOptions} variant={variant} />
      )}
    </VisitPageLayout>
  );
};

export default UserDetail;
