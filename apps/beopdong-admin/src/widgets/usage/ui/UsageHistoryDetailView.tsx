import { useState } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { Modal, useModal } from '@center/ui/modal';
import { ActionButton, BackLink } from '@shared/ui';
import { UsageHistoryDetailFields, validateUsageHistoryDetail } from '@entities/usage';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import type { UsageHistoryDetail, UsageTimeField } from '@entities/usage';

interface UsageHistoryDetailViewProps {
  readonly detail?: UsageHistoryDetail;
}

export const UsageHistoryDetailView = ({ detail }: UsageHistoryDetailViewProps) => {
  const [draft, setDraft] = useState(detail);
  const [isEditing, setIsEditing] = useState(false);
  const [openField, setOpenField] = useState<UsageTimeField | null>(null);
  const modal = useModal();

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    const error = draft && validateUsageHistoryDetail(draft);
    if (error) {
      openInputCheckNotice(modal, error);
      return;
    }
    openApiPendingNotice(modal, '수정');
  };

  return (
    <Card>
      <BackLink to="/usage/history" label="종료된 이용대장 목록으로" />
      {draft ? (
        <Content>
          <UsageHistoryDetailFields
            detail={draft}
            isEditing={isEditing}
            onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
            openField={openField}
            onOpenFieldChange={setOpenField}
          />
          <Actions>
            {isEditing ? (
              <ActionButton content="저장" onClick={handleSave} />
            ) : (
              <ActionButton content="수정" onClick={handleEdit} />
            )}
          </Actions>
        </Content>
      ) : (
        <StatusText role="status">종료된 이용대장 기록을 찾을 수 없습니다.</StatusText>
      )}
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
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
  gap: 12px;
`;

const StatusText = styled.p`
  margin: 0;
  color: ${({ theme }) => adminTokens(theme).colors.secondaryText};
  font-size: 20px;
  line-height: 1.6;
`;
