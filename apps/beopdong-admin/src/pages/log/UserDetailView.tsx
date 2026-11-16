import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { UserVisitDetail, VisitPageLayout } from '@widgets/log';
import { isAdultAge, useFetchVisitDetail } from '@entities/log';
import { getVisitPurposeOptions } from '@entities/purpose';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useLoadFailureModal } from '@shared/lib/useLoadFailureModal';

const UserDetailView = () => {
  const { logId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: visit, isLoading, isError, error, errorUpdatedAt, refetch } = useFetchVisitDetail(logId);
  const failureModal = useLoadFailureModal({
    title: '방명록을 불러오지 못했어요',
    isError,
    error,
    failedAt: errorUpdatedAt,
    onRetry: () => void refetch(),
    notFound: {
      title: '이미 삭제된 방명록입니다',
      subtitle: '목록으로 돌아가 최신 기록을 확인해주세요',
      confirmLabel: '목록으로',
      onConfirm: () => {
        void queryClient.invalidateQueries({ queryKey: ['visitList'] });
        navigate('/log');
      },
    },
  });
  const variant = visit && isAdultAge(visit.age) ? 'adult' : 'minor';

  return (
    <VisitPageLayout title="방명록 상세">
      <UserVisitDetail
        key={visit?.id}
        visit={visit}
        purposeOptions={getVisitPurposeOptions(variant)}
        statusMessage={isLoading ? '불러오는 중입니다.' : null}
      />
      <ConfirmModal isOpen={failureModal.isOpen} config={failureModal.config} onClose={failureModal.closeModal} />
    </VisitPageLayout>
  );
};

export default UserDetailView;
