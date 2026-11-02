import { useState } from 'react';
import styled from '@emotion/styled';
import { Modal, useModal } from '@center/ui/modal';
import { ActionButton, BackLink, DetailPanel } from '@shared/ui';
import { UserDetailFields, validateUserDetail } from '@entities/user';
import { openApiPendingNotice } from '@shared/lib/openApiPendingNotice';
import { openInputCheckNotice } from '@shared/lib/openInputCheckNotice';
import type { UserDetail } from '@entities/user';

interface UserDetailViewProps {
  readonly user?: UserDetail;
}

export const UserDetailView = ({ user }: UserDetailViewProps) => {
  const [draft, setDraft] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const modal = useModal();

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
          isEditing={isEditing}
          onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
        />
        {user && draft && (
          <Actions>
            {isEditing ? (
              <ActionButton content="저장" onClick={handleSave} />
            ) : (
              <ActionButton content="수정" onClick={() => setIsEditing(true)} />
            )}
          </Actions>
        )}
      </Content>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
    </Card>
  );
};

const Card = styled(DetailPanel)`
  gap: 20px;
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
