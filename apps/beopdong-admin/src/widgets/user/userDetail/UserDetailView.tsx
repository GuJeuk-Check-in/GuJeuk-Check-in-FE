import { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, useModal } from '@center/ui/modal';
import { ActionButton, CancelButton, EditButton } from '@shared/ui';
import { getApiErrorMessage } from '@entities/auth';
import { UserDetailFields, type UpdateUserRequest, type UserDetail } from '@entities/user';
import { useUpdateUser } from '@features/user/update-user';
import { useUnsavedChanges } from '@shared/lib/useUnsavedChanges';
import { ConfirmModal } from '@shared/ui/ConfirmModal';

interface UserDetailViewProps {
  readonly userId: string;
  readonly user: UserDetail;
}

export const UserDetailView = ({ userId, user }: UserDetailViewProps) => {
  const [draft, setDraft] = useState<UpdateUserRequest | null>(null);
  const initialDraft: UpdateUserRequest = { ...user, schoolType: null };
  const { mutate: saveUser, isPending: isSaving } = useUpdateUser(userId);
  const modal = useModal();
  const { isDirty, guard } = useUnsavedChanges({
    value: draft ?? initialDraft,
    initial: initialDraft,
    enabled: draft !== null,
  });

  const handleSave = () => {
    if (!draft || isSaving) return;
    saveUser(draft, {
      onSuccess: () => setDraft(null),
      onError: (error) => {
        modal.openModal({
          title: '수정 실패',
          subtitle: getApiErrorMessage(error, '회원 정보를 수정하지 못했습니다.'),
          buttons: [{ label: '확인', onClick: modal.closeModal }],
        });
      },
    });
  };

  return (
    <>
      <Content>
        <FormFields disabled={isSaving}>
          <UserDetailFields
            user={draft ?? initialDraft}
            isEditing={draft !== null}
            onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
          />
        </FormFields>
        <Actions>
          {draft ? (
            <>
              <CancelButton content="취소" onClick={() => setDraft(null)} disable={isSaving} />
              <ActionButton
                content={isSaving ? '저장 중' : '저장'}
                onClick={handleSave}
                disable={!isDirty || isSaving}
              />
            </>
          ) : (
            <EditButton content="수정" onClick={() => setDraft(initialDraft)} />
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

const FormFields = styled.fieldset`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;

    > button {
      flex: 1;
      min-width: 0;
    }
  }
`;
