import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useLogin } from '../model/useLogin';
import LabeledInput from '@shared/ui/Form/LabeledInput';
import PasswordButton from '@shared/ui/Button/PasswordButton';

export const LoginForm = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failCount, setFailCount] = useState(0);
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
          setFailCount(0);
          navigate('/log', { replace: true });
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message || '로그인 실패';
          setErrorMessage(message);
          setFailCount(prev => Math.min(prev + 1, 5));
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
      {failCount > 0 && (
        <RedOverlay intensity={failCount}>
          {failCount >= 5 && <WarningText>🔥 경고: 너무 많이 틀렸습니다! 🔥</WarningText>}
        </RedOverlay>
      )}
      <LabeledInput
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
  width: 100%;
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

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const RedOverlay = styled.div<{ intensity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 0, 0, ${props => props.intensity * 0.15});
  pointer-events: none;
  z-index: 9999;
  animation: ${shake} 0.1s ease-in-out ${props => props.intensity};
  transition: background 0.3s ease;
`;

const WarningText = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  color: #fff;
  text-shadow: 0 0 20px red, 0 0 40px red;
  animation: ${shake} 0.2s infinite;
  white-space: nowrap;
`;
