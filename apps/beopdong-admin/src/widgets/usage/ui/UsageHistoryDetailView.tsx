import { useState } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { Modal, useModal } from '@center/ui/modal';
import { ActionButton, BackLink, DetailPanel } from '@shared/ui';
import { applyUsageHistoryPatch, UsageHistoryDetailFields, validateUsageHistoryDetail } from '@entities/usage';
import { useUnsavedChanges } from '@shared/lib/useUnsavedChanges';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
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
  const { isDirty, guard } = useUnsavedChanges({ value: draft, initial: detail, enabled: isEditing });

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
            onChange={(patch) => setDraft((previous) => previous && applyUsageHistoryPatch(previous, patch))}
            openField={openField}
            onOpenFieldChange={setOpenField}
          />
          <Actions>
            {isEditing ? (
              <ActionButton content="저장" onClick={handleSave} disable={!isDirty} />
            ) : (
              <ActionButton content="수정" onClick={handleEdit} />
            )}
          </Actions>
        </Content>
      ) : (
        <StatusText role="status">종료된 이용대장 기록을 찾을 수 없습니다.</StatusText>
      )}
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <ConfirmModal isOpen={guard.isOpen} config={guard.config} onClose={guard.onClose} />
    </Card>
  );
};

const Card = styled(DetailPanel)`
  gap: 32px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
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
