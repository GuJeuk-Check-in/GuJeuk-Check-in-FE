import { Modal, useModal } from '@center/ui/modal';
import { adminTokens } from '@center/tokens';
import { useTheme } from '@emotion/react';
import { UserVisitCard, type UserVisitSummary } from '@entities/log';
import styled from '@emotion/styled';
import { IoWarningOutline } from 'react-icons/io5';

interface UserVisitListFeatureProps {
  visits?: readonly UserVisitSummary[];
}

export const UserVisitListFeature = ({ visits = [] }: UserVisitListFeatureProps) => {
  const modal = useModal();
  const { colors } = adminTokens(useTheme());

  const handleDelete = (visit: UserVisitSummary) => {
    modal.openModal({
      icon: <IoWarningOutline />,
      title: `정말 ${visit.name}님의 기록을 삭제하시겠나요?`,
      subtitle: '삭제된 기록은 복구할 수 없습니다.',
      theme: 'warning',
      buttons: [
        { label: '아니요', onClick: modal.closeModal },
        {
          label: '네, 삭제합니다',
          variant: 'primary',
          bgColor: colors.error,
          onClick: () => modal.openModal({
            title: '삭제 API 연결 전입니다.',
            subtitle: '현재 기록은 삭제되지 않았습니다.',
            buttons: [{ label: '확인', onClick: modal.closeModal }],
          }),
        },
      ],
    });
  };

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
