import { useState } from 'react';
import styled from '@emotion/styled';
import { AuthInput } from '@shared/ui/input/AuthInput';
import { PasswordButton } from '@shared/ui/Button';

export const UpdatePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleConfirm = () => {
    const errors: Record<string, string> = {};

    if (!currentPassword.trim()) {
      errors.currentPassword = '기존 비밀번호를 입력해주세요.';
    }

    if (!newPassword.trim()) {
      errors.newPassword = '새 비밀번호를 입력해주세요.';
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = '비밀번호를 다시 입력해주세요.';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setFormErrors({
      confirmPassword: '법동 관리자 비밀번호 변경 API 연결이 아직 준비되지 않았습니다.',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleConfirm();
  };

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    field: string,
    value: string
  ) => {
    setter(value);
    setFormErrors((current) => ({ ...current, [field]: '' }));
  };

  return (
    <FormContainer>
      <InputGroup>
        <AuthInput
          label="기존 비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          value={currentPassword}
          onChange={(event) =>
            handleChange(setCurrentPassword, 'currentPassword', event.target.value)
          }
          isError={!!formErrors.currentPassword}
          onKeyDown={handleKeyDown}
        />
        <ErrorMessage visible={!!formErrors.currentPassword}>
          {formErrors.currentPassword}
        </ErrorMessage>
      </InputGroup>

      <InputGroup>
        <AuthInput
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          type="password"
          value={newPassword}
          onChange={(event) =>
            handleChange(setNewPassword, 'newPassword', event.target.value)
          }
          isError={!!formErrors.newPassword}
          onKeyDown={handleKeyDown}
        />
        <ErrorMessage visible={!!formErrors.newPassword}>
          {formErrors.newPassword}
        </ErrorMessage>
      </InputGroup>

      <InputGroup>
        <AuthInput
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요."
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            handleChange(setConfirmPassword, 'confirmPassword', event.target.value)
          }
          isError={!!formErrors.confirmPassword}
          onKeyDown={handleKeyDown}
        />
        <ErrorMessage visible={!!formErrors.confirmPassword}>
          {formErrors.confirmPassword}
        </ErrorMessage>
      </InputGroup>

      <ButtonWrapper>
        <PasswordButton content="확인" onClick={handleConfirm} />
      </ButtonWrapper>
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
  color: #fff2d8;
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
