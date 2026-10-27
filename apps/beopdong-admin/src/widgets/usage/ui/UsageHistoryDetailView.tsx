import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { PasswordButton } from '@center/ui/auth';
import { Modal, useModal } from '@center/ui/modal';
import { UsageHistoryDetailFields } from '@entities/usage';
import { useDeleteUsageHistory } from '@features/usage/delete-history';
import type { UsageHistoryDetail } from '@entities/usage';

interface UsageHistoryDetailViewProps {
  readonly detail?: UsageHistoryDetail;
}

type TimeField = 'startTime' | 'endTime';

const EDITABLE_KEYS = ['name', 'count', 'usePurpose', 'startTime', 'endTime', 'seat'] as const;

export const UsageHistoryDetailView = ({ detail }: UsageHistoryDetailViewProps) => {
  const [draft, setDraft] = useState(detail);
  const [openField, setOpenField] = useState<TimeField | null>(null);
  const modal = useModal();
  const deleteHistory = useDeleteUsageHistory();
  const isChanged = !!detail && !!draft && EDITABLE_KEYS.some((key) => detail[key] !== draft[key]);
  const hasSeat = draft?.seat !== null && draft?.seat !== undefined;

  const handleSave = () => {
    modal.openModal({
      title: '수정 API 연결 전입니다.',
      subtitle: '입력한 내용은 아직 저장되지 않았습니다.',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  return (
    <Card>
      <BackLink to="/usage/history">‹ 종료된 이용대장 목록으로</BackLink>
      {draft ? (
        <Content>
          <UsageHistoryDetailFields
            detail={draft}
            isEditing={isChanged}
            onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
            openField={openField}
            onOpenFieldChange={setOpenField}
          />
          <Actions>
            {isChanged && <ActionButton content="저장" onClick={handleSave} />}
            {!isChanged && hasSeat && (
              <DeleteButton type="button" onClick={() => deleteHistory.handleDelete(draft)}>
                삭제
              </DeleteButton>
            )}
            {!isChanged && !hasSeat && (
              <ActionButton content="수정" onClick={() => setOpenField('startTime')} />
            )}
          </Actions>
        </Content>
      ) : (
        <StatusText role="status">종료된 이용대장 기록을 찾을 수 없습니다.</StatusText>
      )}
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <Modal
        isOpen={deleteHistory.modal.isOpen}
        config={deleteHistory.modal.config}
        onClose={deleteHistory.modal.closeModal}
      />
    </Card>
  );
};

const Card = styled.div`
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-sizing: border-box;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const BackLink = styled(Link)`
  align-self: flex-start;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 16px;
  line-height: 1.6;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 4px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: min(100%, 720px);
  margin: 0 auto;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const ActionButton = styled(PasswordButton)`
  width: 138px;
  height: 49px;
  background-color: ${({ theme }) => adminTokens(theme).colors.primary};
  box-shadow: none;

  &:hover {
    background-color: ${({ theme }) => adminTokens(theme).colors.primaryDark};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none;
  }
`;

const DeleteButton = styled.button`
  width: 138px;
  height: 49px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.error};
  background-color: color-mix(in srgb, ${({ theme }) => adminTokens(theme).colors.warning} 40%, white);
  color: ${({ theme }) => adminTokens(theme).colors.error};
  font: inherit;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: color-mix(in srgb, ${({ theme }) => adminTokens(theme).colors.warning} 60%, white);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 4px;
  }
`;

const StatusText = styled.p`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 20px;
  line-height: 1.6;
`;
