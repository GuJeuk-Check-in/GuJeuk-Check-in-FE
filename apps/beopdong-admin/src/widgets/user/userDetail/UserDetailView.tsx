import { useState } from 'react';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { Modal } from '@center/ui/modal';
import { ActionButton, BackLink, DeleteButton } from '@shared/ui';
import { UserDetailFields, isUserDetailChanged, validateUserDetail } from '@entities/user';
import { useDeleteUser } from '@features/user/delete-user';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import type { UserDetail } from '@entities/user';

interface UserDetailViewProps {
  readonly user?: UserDetail;
}

export const UserDetailView = ({ user }: UserDetailViewProps) => {
  const [draft, setDraft] = useState(user);
  const { modal, handleDelete } = useDeleteUser();
  const isChanged = !!user && !!draft && isUserDetailChanged(user, draft);

  const handleSave = () => {
    const error = draft && validateUserDetail(draft);
    if (error) {
      openInputCheckNotice(modal, error);
      return;
    }
    openApiPendingNotice(modal, '수정');
  };

  return (
    <Card>
      <BackLink to="/organ/user/all" label="회원 목록으로" />
      <Content>
        <UserDetailFields
          user={draft}
          onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
        />
        {user && draft && (
          <Actions>
            {isChanged ? (
              <ActionButton content="저장" onClick={handleSave} />
            ) : (
              <DeleteButton type="button" onClick={() => handleDelete(user)}>
                삭제
              </DeleteButton>
            )}
          </Actions>
        )}
      </Content>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </Card>
  );
};

const Card = styled.div`
  width: min(100%, calc(90% + 80px), 1040px);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => adminTokens(theme).colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;
