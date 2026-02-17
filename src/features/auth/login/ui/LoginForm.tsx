import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useLogin } from '../model/useLogin';
import { AuthInput } from '@shared/ui/input/AuthInput';
import { PasswordButton } from '@shared/ui/Button/index';

export const LoginForm = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const handleConfirm = () => {
    setErrorMessage('');

    if (currentPW.trim() === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    login(
      { password: currentPW },
      {
        onSuccess: () => {
          navigate('/log', { replace: true });
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message || '로그인 실패';
          setErrorMessage(message);
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
      <AuthInput
        label=""
        placeholder="비밀번호를 입력해주세요."
        type="password"
        value={currentPW}
        onChange={(e) => {
          setCurrentPW(e.target.value);
          setErrorMessage('');
        }}
        isError={!!errorMessage}
        onKeyDown={handleKeyDown}
      />
      <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
      <ButtonWrapper>
        <PasswordButton
          content={isPending ? '확인 중...' : '확인'}
          onClick={handleConfirm}
        />
      </ButtonWrapper>
      <LinkButton onClick={() => navigate('/admin/change')}>
        비밀번호 변경하기
      </LinkButton>
    </LoginContentGroup>
  );
};

const LoginContentGroup = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled.p<{ visible: boolean }>`
  color: #ff5a5a;
  font-size: 1rem;
  width: 100%;
  max-width: 28.375rem;
  text-align: right;
  margin: 0 0 10px 10px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const ButtonWrapper = styled.div`
  margin-top: 100px;
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
  text-decoration: underline;

  &:hover {
    color: #bee8ff;
  }
`;
