import { LoadErrorView } from '@center/ui/feedback';
import { usePurposeOptions } from '@entities/purpose';
import { VisitForm, VisitPageLayout } from '@widgets/log';

const UserDetail = () => {
  const { options, isError, refetch } = usePurposeOptions();

  return (
    <VisitPageLayout title="방명록 추가">
      {isError ? (
        <LoadErrorView
          title="이용대장 목록을 불러올 수 없습니다"
          hint="이용대장을 선택해야 방명록을 추가할 수 있습니다"
          retryLabel="이용대장 다시 조회하기"
          onRetry={() => void refetch()}
        />
      ) : (
        <VisitForm purposeNames={options.map(({ name }) => name)} />
      )}
    </VisitPageLayout>
  );
};

export default UserDetail;
