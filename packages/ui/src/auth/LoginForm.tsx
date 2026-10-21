import { adminTokens } from '@center/tokens';
import { useState } from 'react';
import styled from '@emotion/styled';
import { AuthInput } from './AuthInput';
import { PasswordButton } from './PasswordButton';
import IdInput from './assets/idInput.png';
import { validateLogin, loginFailure } from './validation';
import type { LoginValues, MutationCallbacks } from './validation';

interface LoginFormProps {
  readonly onLogin: (values: LoginValues, callbacks: MutationCallbacks) => void;
  readonly isPending?: boolean;
  readonly onSuccess: () => void;
  readonly onChangePassword: () => void;
}

export const LoginForm = ({ onLogin: login, isPending = false, onSuccess, onChangePassword }: LoginFormProps) => {
  const [organName, setOrganName] = useState('');
  const [currentPW, setCurrentPW] = useState('');
  const [organNameError, setOrganNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleConfirm = () => {
    const errors = validateLogin({ organName, password: currentPW });
    setOrganNameError(errors.organName ?? '');
    setPasswordError(errors.password ?? '');
    if (Object.keys(errors).length > 0) return;

    login(
      { organName, password: currentPW },
      {
        onSuccess,
        onError: (message) => {
          const errors = loginFailure(message);
          if (errors.organName) setOrganNameError(errors.organName);
          else setPasswordError(errors.password ?? '');
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  const errorMessage = organNameError || passwordError;

  return (
    <LoginContentGroup>
      <AuthInput
        label=""
        placeholder="기관 이름을 입력해주세요."
        type="text"
        value={organName}
        onChange={(e) => {
          setOrganName(e.target.value);
          setOrganNameError('');
        }}
        isError={!!organNameError}
        onKeyDown={handleKeyDown}
        icon={<img src={IdInput} alt="" />}
      />
      <AuthInput
        label=""
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={currentPW}
        onChange={(e) => {
          setCurrentPW(e.target.value);
          setPasswordError('');
        }}
        isError={!!passwordError}
        onKeyDown={handleKeyDown}
      />
      <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
      <BottomWrapper>
        <ButtonWrapper>
          <PasswordButton
            content={isPending ? '확인 중...' : '확인'}
            onClick={handleConfirm}
          />
        </ButtonWrapper>
        <LinkButton onClick={onChangePassword}>
          비밀번호 변경하기
        </LinkButton>
      </BottomWrapper>
    </LoginContentGroup>
  );
};

const LoginContentGroup = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const ErrorMessage = styled.p<{ visible: boolean }>`
  color: ${({ theme }) => adminTokens(theme).colors.error};
  font-size: 1rem;
  width: 100%;
  max-width: 28.375rem;
  text-align: right;
  margin: 0 0 10px 10px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const ButtonWrapper = styled.div``;

const LinkButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => adminTokens(theme).colors.authLink};
  font-size: 0.95rem;
  cursor: pointer;
  padding: 5px;
  margin-top: 5px;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => adminTokens(theme).colors.authLinkHover};
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
