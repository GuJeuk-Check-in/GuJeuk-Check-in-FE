import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { PasswordButton } from '@center/ui/auth';
import { Modal, useModal } from '@center/ui/modal';
import { IoArrowBack } from 'react-icons/io5';
import { UserDetailFields, isUserDetailChanged } from '@entities/user';
import { useDeleteUser } from '@features/user/delete-user';
import type { UserDetail } from '@entities/user';

interface UserDetailViewProps {
  readonly user?: UserDetail;
}

export const UserDetailView = ({ user }: UserDetailViewProps) => {
  const [draft, setDraft] = useState(user);
  const modal = useModal();
  const deleteUser = useDeleteUser();
  const isChanged = !!user && !!draft && isUserDetailChanged(user, draft);

  const handleSave = () => {
    modal.openModal({
      title: '수정 API 연결 전입니다.',
      subtitle: '입력한 내용은 아직 저장되지 않았습니다.',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  return (
    <Card>
      <BackLink to="/organ/user/all" aria-label="회원 목록으로 돌아가기">
        <IoArrowBack aria-hidden="true" />
      </BackLink>
      <Content>
        <UserDetailFields
          user={draft}
          onChange={(patch) => setDraft((previous) => previous && { ...previous, ...patch })}
        />
        {user && draft && (
          <Actions>
            {isChanged ? (
              <SaveButton content="저장" onClick={handleSave} />
            ) : (
              <DeleteButton type="button" onClick={() => deleteUser.handleDelete(user)}>
                삭제
              </DeleteButton>
            )}
          </Actions>
        )}
      </Content>
      <Modal isOpen={modal.isOpen} config={modal.config} onClose={modal.closeModal} />
      <Modal
        isOpen={deleteUser.modal.isOpen}
        config={deleteUser.modal.config}
        onClose={deleteUser.modal.closeModal}
      />
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

const BackLink = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  font-size: 28px;
  color: ${({ theme }) => adminTokens(theme).colors.text};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 4px;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

const DeleteButton = styled.button`
  width: 172px;
  height: 52px;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => adminTokens(theme).colors.error};
  background-color: color-mix(in srgb, ${({ theme }) => adminTokens(theme).colors.warning} 40%, white);
  color: ${({ theme }) => adminTokens(theme).colors.error};
  font: inherit;
  font-size: 20px;
  line-height: 1.6;
  cursor: pointer;

  &:hover {
    background-color: color-mix(in srgb, ${({ theme }) => adminTokens(theme).colors.warning} 60%, white);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primaryDark};
    outline-offset: 4px;
  }
`;

const SaveButton = styled(PasswordButton)`
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
