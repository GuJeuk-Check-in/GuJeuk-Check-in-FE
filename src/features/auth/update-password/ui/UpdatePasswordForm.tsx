import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useUpdatePassword } from '../model/useUpdatePassword';
import { useAuthStore } from '@entities/auth';
import { useModal } from '@shared/hooks/useModal';
import { AuthInput } from '@shared/ui/input/AuthInput';
import { PasswordButton } from '@shared/ui/Button/index';
import { Modal } from '@shared/ui/modal/Modal';

export const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const { isOpen, config, openModal, closeModal } = useModal();

  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleConfirm = () => {
    const errors: { [key: string]: string } = {};

    if (!currentPW.trim()) errors.currentPW = '기존 비밀번호를 입력해주세요.';
    if (!newPW.trim()) errors.newPW = '새 비밀번호를 입력해주세요.';
    if (!confirmPW.trim()) {
      errors.confirmPW = '비밀번호를 다시 입력해주세요.';
    } else if (newPW !== confirmPW) {
      errors.confirmPW = '비밀번호가 일치하지 않습니다.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    updatePassword(
      {
        oldPassword: currentPW,
        newPassword: newPW,
        confirmNewPassword: confirmPW,
      },
      {
        onSuccess: () => {
          openModal({
            icon: <FaCheckCircle color="#0F50A0" />,
            title: '변경 완료',
            subtitle: '비밀번호가 변경되었습니다. 다시 로그인해주세요.',
            theme: 'info',
            buttons: [
              {
                label: '로그인 화면으로',
                variant: 'secondary',
                onClick: () => {
                  closeModal();
                  logout();
                  navigate('/organ/login', { replace: true });
                },
              },
            ],
          });
        },

        onError: (error) => {
          const message =
            error.response?.data?.message ||
            '비밀번호 변경 중 오류가 발생했습니다.';
          openModal({
            icon: <FaExclamationTriangle color="#D88282" />,
            title: '변경 실패',
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
    if (e.key === 'Enter') handleConfirm();
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    field: string,
    value: string
  ) => {
    setter(value);
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <FormContainer>
      <InputGroup>
        <AuthInput
          label="기존 비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          value={currentPW}
          onChange={(e) =>
            handleChange(setCurrentPW, 'currentPW', e.target.value)
          }
          isError={!!formErrors.currentPW}
          onKeyDown={handleKeyDown}
        />
        <ErrorMessage visible={!!formErrors.currentPW}>
          {formErrors.currentPW}
        </ErrorMessage>
      </InputGroup>

      <InputGroup>
        <AuthInput
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          type="password"
          value={newPW}
          onChange={(e) => handleChange(setNewPW, 'newPW', e.target.value)}
          isError={!!formErrors.newPW}
          onKeyDown={handleKeyDown}
        />
        <ErrorMessage visible={!!formErrors.newPW}>
          {formErrors.newPW}
        </ErrorMessage>
      </InputGroup>

      <InputGroup>
        <AuthInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요."
          type="password"
          value={confirmPW}
          onChange={(e) =>
            handleChange(setConfirmPW, 'confirmPW', e.target.value)
          }
          isError={!!formErrors.confirmPW}
          onKeyDown={handleKeyDown}
        />
        <ErrorMessage visible={!!formErrors.confirmPW}>
          {formErrors.confirmPW}
        </ErrorMessage>
      </InputGroup>

      <ButtonWrapper>
        {/* 📌 [수정 2] disabled -> disable 로 변경 */}
        <PasswordButton
          content={isPending ? '변경 중...' : '변경'}
          onClick={handleConfirm}
          disable={isPending}
        />
      </ButtonWrapper>

      {isOpen && config && (
        <Modal isOpen={isOpen} config={config} onClose={closeModal} />
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -0.5rem;
`;

const ErrorMessage = styled.p<{ visible: boolean }>`
  color: #ff5a5a;
  font-size: 1.2rem;
  width: 100%;
  max-width: 28.375rem;
  text-align: right;
  margin: 0.3rem 0 0 0.5rem;
  min-height: 1.2rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
