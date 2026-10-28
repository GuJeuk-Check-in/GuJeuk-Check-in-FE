import { Modal } from '@center/ui/modal';
import { adminTokens } from '@center/tokens';
import { UserVisitCard, type UserVisitSummary } from '@entities/log';
import styled from '@emotion/styled';
import { useConfirmDelete } from '@shared/lib/useConfirmDelete';

interface UserVisitListFeatureProps {
  visits?: readonly UserVisitSummary[];
}

const DELETE_MESSAGES = {
  title: (name: string) => `정말 ${name}님의 기록을 삭제하시겠나요?`,
  subtitle: '삭제된 기록은 복구할 수 없습니다.',
  pendingSubtitle: '현재 기록은 삭제되지 않았습니다.',
};

export const UserVisitListFeature = ({ visits = [] }: UserVisitListFeatureProps) => {
  const { modal, handleDelete } = useConfirmDelete(DELETE_MESSAGES);

  return (
    <Container>
      <Title id="admin-page-title" tabIndex={-1}>방명록 조회</Title>
      {visits.length > 0 ? (
        <List aria-label="방명록 목록">
          {visits.map((visit) => (
            <li key={visit.id}>
              <UserVisitCard visit={visit} onDelete={() => handleDelete(visit)} />
            </li>
          ))}
        </List>
      ) : (
        <EmptyState role="status">
          방명록 API 연결 전입니다. 연결 후 방문 기록이 표시됩니다.
        </EmptyState>
      )}
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-width: 0;
`;

const Title = styled.h1`
  width: min(100%, 80rem);
  margin: 0 auto 2rem;
  font-size: 2rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
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
