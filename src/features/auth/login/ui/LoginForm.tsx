import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useLogin } from '../model/useLogin';
import { useModal } from '@shared/hooks/useModal';
import LabeledInput from '@shared/ui/Form/LabeledInput';
import PasswordButton from '@shared/ui/Button/PasswordButton';
import { Modal } from '../../../../components/Modal/Modal';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [currentPW, setCurrentPW] = useState('');

  const { isOpen, config, openModal, closeModal } = useModal();

  const { mutate: login, isPending } = useLogin();

  const handleConfirm = () => {
    if (!currentPW.trim()) {
      openModal({
        icon: <FaExclamationTriangle color="#D88282" />,
        title: '입력 확인',
        subtitle: '비밀번호를 입력해주세요.',
        theme: 'warning',
        buttons: [
          {
            label: '확인',
            variant: 'primary',
            onClick: closeModal,
          },
        ],
      });
      return;
    }

    login(
      { password: currentPW },
      {
        onSuccess: () => {
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '로그인 성공',
            subtitle: '관리자 페이지로 이동합니다.',
            theme: 'info',
            buttons: [
              {
                label: '이동하기',
                variant: 'secondary',
                onClick: () => {
                  closeModal();
                  navigate('/log', { replace: true });
                },
              },
            ],
          });
        },

        onError: (error) => {
          const message = error.response?.data?.message || '로그인 실패';
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '로그인 실패',
            subtitle: message,
            theme: 'warning',
            buttons: [
              {
                label: '닫기',
                variant: 'secondary',
                onClick: closeModal,
              },
            ],
          });
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <LoginContentGroup>
      <LabeledInput
        label=""
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={currentPW}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrentPW(e.target.value);
        }}
        isError={false}
        onKeyDown={handleKeyDown}
      />

      <ButtonWrapper>
        <PasswordButton
          content={isPending ? '확인 중...' : '확인'}
          onClick={handleConfirm}
        />
      </ButtonWrapper>

      <LinkButton onClick={() => navigate('/admin/change')}>
        비밀번호 변경하기
      </LinkButton>

      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </LoginContentGroup>
  );
};

const LoginContentGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LinkButton = styled.button`
  border: none;
  background: none;
  color: #a4dfff;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 5px;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
    color: #bee8ff;
  }
`;
