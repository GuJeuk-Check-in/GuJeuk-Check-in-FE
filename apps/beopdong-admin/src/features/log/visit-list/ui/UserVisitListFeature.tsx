import { Modal } from '@center/ui/modal';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { adminTokens } from '@center/tokens';
import { formatDateKoreanPadded } from '@center/ui/form';
import { UserVisitCard, getVisitDisplayName, type UserVisitSummary } from '@entities/log';
import styled from '@emotion/styled';
import { useConfirmDelete } from '@shared/lib/useConfirmDelete';
import { useConfirmModal } from '@shared/lib/useConfirmModal';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { PageTitle } from '@shared/ui';

interface UserVisitListFeatureProps {
  visits?: readonly UserVisitSummary[];
}

const DELETE_MESSAGES = {
  title: '이 방명록을 삭제하시겠습니까?',
  subtitle: (visit: UserVisitSummary) =>
    [getVisitDisplayName(visit), formatDateKoreanPadded(visit.visitDate), visit.purposes.join(', ')].join(' · '),
  pendingSubtitle: '현재 기록은 삭제되지 않았습니다.',
};

const formatVisitSubtitle = (visit: UserVisitSummary) =>
  [getVisitDisplayName(visit), formatDateKoreanPadded(visit.visitDate), visit.purposes.join(', ')].join(' · ');

export const UserVisitListFeature = ({ visits = [] }: UserVisitListFeatureProps) => {
  const { modal, confirmModal, handleDelete } = useConfirmDelete<UserVisitSummary>(DELETE_MESSAGES);
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
        <EmptyState role="status">
          방명록 API 연결 전입니다. 연결 후 방문 기록이 표시됩니다.
        </EmptyState>
      )}
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
