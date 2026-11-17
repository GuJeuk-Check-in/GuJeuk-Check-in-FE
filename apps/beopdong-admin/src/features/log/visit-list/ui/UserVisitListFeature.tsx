import { Modal } from '@center/ui/modal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { adminTokens } from '@center/tokens';
import { formatDateKoreanPadded } from '@center/ui/form';
import { UserVisitCard, getVisitDisplayName, type UserVisitSummary } from '@entities/log';
import styled from '@emotion/styled';
import { useConfirmDelete } from '@shared/lib/useConfirmDelete';
import { useLoadFailureModal } from '@shared/lib/useLoadFailureModal';
import { useConfirmModal } from '@shared/lib/useConfirmModal';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { PageTitle } from '@shared/ui';

interface UserVisitListFeatureProps {
  visits?: readonly UserVisitSummary[];
  isLoading?: boolean;
  isFetching?: boolean;
  isLast?: boolean;
  isError?: boolean;
  failedAt?: number;
  onLoadMore?: () => void;
  onRetry?: () => void;
  onDelete?: (visit: UserVisitSummary) => Promise<void>;
}

const DELETE_MESSAGES = {
  title: '이 방명록을 삭제하시겠습니까?',
  subtitle: (visit: UserVisitSummary) =>
    [getVisitDisplayName(visit), formatDateKoreanPadded(visit.visitDate), visit.purposes.join(', ')].join(' · '),
  pendingSubtitle: '현재 기록은 삭제되지 않았습니다.',
};

const EMPTY_MESSAGE = '방문 기록이 없습니다.';
const ERROR_MESSAGE = '방명록을 불러오지 못했어요.';

const formatVisitSubtitle = (visit: UserVisitSummary) =>
  [getVisitDisplayName(visit), formatDateKoreanPadded(visit.visitDate), visit.purposes.join(', ')].join(' · ');

export const UserVisitListFeature = ({
  visits = [],
  isLoading = false,
  isFetching = false,
  isLast = true,
  isError = false,
  failedAt = 0,
  onLoadMore,
  onRetry,
  onDelete,
}: UserVisitListFeatureProps) => {
  const { modal, confirmModal, handleDelete } = useConfirmDelete<UserVisitSummary>(DELETE_MESSAGES, {
    onDelete,
    alreadyDeleted: {
      title: '이미 삭제된 방명록입니다',
      subtitle: '목록으로 돌아가 최신 기록을 확인해주세요',
      confirmLabel: '확인',
      onConfirm: () => onRetry?.(),
    },
  });
  const failureModal = useLoadFailureModal({
    title: '방명록을 불러오지 못했어요',
    isError,
    failedAt,
    onRetry: () => onRetry?.(),
  });
  const { confirmModal: checkOutModal, openConfirm: openCheckOutConfirm } = useConfirmModal();

  const handleCheckOut = (visit: UserVisitSummary) => {
    openCheckOutConfirm({
      title: '이 사용자를 퇴실하시겠습니까?',
      subtitle: formatVisitSubtitle(visit),
      onConfirm: () => openApiPendingNotice(modal, '퇴실', '현재 퇴실 처리되지 않았습니다.'),
    });
  };

  return (
    <Container>
      <Title>방명록 조회</Title>
      {visits.length > 0 ? (
        <List aria-label="방명록 목록">
          {visits.map((visit) => (
            <li key={visit.id}>
              <UserVisitCard
                visit={visit}
                onDelete={() => handleDelete(visit)}
                onCheckOut={() => handleCheckOut(visit)}
              />
            </li>
          ))}
        </List>
      ) : (
        !isLoading && !isError && <EmptyState role="status">{EMPTY_MESSAGE}</EmptyState>
      )}
      {isLoading && <EmptyState role="status">불러오는 중입니다.</EmptyState>}
      {!isLoading && isError && (
        <>
          <EmptyState role="alert">{ERROR_MESSAGE}</EmptyState>
          {onRetry && <MoreButton type="button" onClick={onRetry}>다시 시도</MoreButton>}
        </>
      )}
      {!isLoading && !isError && !isLast && onLoadMore && (
        <MoreButton type="button" disabled={isFetching} onClick={onLoadMore}>
          더 보기
        </MoreButton>
      )}
      <ConfirmModal isOpen={failureModal.isOpen} config={failureModal.config} onClose={failureModal.closeModal} />
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <ConfirmModal isOpen={confirmModal.isOpen} config={confirmModal.config} onClose={confirmModal.closeModal} />
      <ConfirmModal isOpen={checkOutModal.isOpen} config={checkOutModal.config} onClose={checkOutModal.closeModal} />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled(PageTitle)`
  width: min(100%, 80rem);
  margin: 0 auto 2rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EmptyState = styled.p`
  margin: 0;
  padding: 2rem;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
  color: ${({ theme }) => adminTokens(theme).colors.text};
  font-size: 1.25rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const MoreButton = styled.button`
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.75rem 2rem;
  border: 0;
  border-radius: 1.5rem;
  background: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  color: ${({ theme }) => adminTokens(theme).colors.white};
  font-size: 1.125rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
