import { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, useModal } from '@center/ui/modal';
import { ActionButton, CancelButton, EditButton } from '@shared/ui';
import { UserDetailFields, validateUserDetail } from '@entities/user';
import { useUnsavedChanges } from '@shared/lib/useUnsavedChanges';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import type { UserDetail } from '@entities/user';

interface UserDetailViewProps {
  readonly user: UserDetail;
}

export const UserDetailView = ({ user }: UserDetailViewProps) => {
  const [draft, setDraft] = useState<UserDetail | null>(null);
  const modal = useModal();
  const { isDirty, guard } = useUnsavedChanges({ value: draft ?? user, initial: user, enabled: draft !== null });

  const handleSave = () => {
    if (!draft) return;
    const error = validateUserDetail(draft);
    if (error) {
      openInputCheckNotice(modal, error);
      return;
    }
    openApiPendingNotice(modal, '수정');
  };

  return (
    <>
      <Content>
        <UserDetailFields
          user={draft ?? user}
          isEditing={draft !== null}
          onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
        />
        <Actions>
          {draft ? (
            <>
              <CancelButton content="취소" onClick={() => setDraft(null)} />
              <ActionButton content="저장" onClick={handleSave} disable={!isDirty} />
            </>
          ) : (
            <EditButton content="수정" onClick={() => setDraft(user)} />
          )}
        </Actions>
      </Content>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <ConfirmModal isOpen={guard.isOpen} config={guard.config} onClose={guard.onClose} />
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
`;
