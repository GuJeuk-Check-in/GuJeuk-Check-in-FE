import { adminTokens } from '@center/tokens';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { PasswordButton } from './PasswordButton';
import { AuthInput } from './AuthInput';
import { Modal } from '../modal';
import type { UseModalReturn } from '../modal';
import { validatePassword } from './validation';
import type { PasswordErrors, PasswordValues, MutationCallbacks } from './validation';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface UpdatePasswordFormProps {
  readonly onUpdatePassword: (values: PasswordValues, callbacks: MutationCallbacks) => void;
  readonly isPending?: boolean;
  readonly onLogin: () => void;
  readonly modal: UseModalReturn;
  readonly failureDisplay?: 'modal' | 'inline';
}

export const UpdatePasswordForm = ({ onUpdatePassword: updatePassword, isPending = false, onLogin, modal, failureDisplay = 'modal' }: UpdatePasswordFormProps) => {
  const { isOpen, config, openModal, closeModal } = modal;
  const colors = adminTokens(useTheme()).colors;

  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [formErrors, setFormErrors] = useState<PasswordErrors>({});

  const handleConfirm = () => {
    if (isPending) return;

    const errors = validatePassword({ oldPassword: currentPW, newPassword: newPW, confirmNewPassword: confirmPW });

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
            icon: <FaCheckCircle color={colors.primary} />,
            title: '변경 완료',
            subtitle: '비밀번호가 변경되었습니다. 다시 로그인해주세요.',
            theme: 'info',
            buttons: [
              {
                label: '로그인 화면으로',
                variant: 'secondary',
                onClick: () => {
                  closeModal();
                  onLogin();
                },
              },
            ],
          });
        },

        onError: (message) => {
          if (failureDisplay === 'inline') {
            setFormErrors({ confirmPW: message });
            return;
          }
          openModal({
            icon: <FaExclamationTriangle color={colors.warning} />,
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
    field: keyof PasswordErrors,
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
        <PasswordButton
          content={isPending ? '확인 중...' : '확인'}
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
  width: 99%;
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
  color: ${({ theme }) => adminTokens(theme).colors.error};
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
