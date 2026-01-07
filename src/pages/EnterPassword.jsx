import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import LabeledInput from '../components/Form/LabeledInput';
import PasswordButton from '../components/Button/PasswordButton';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEnterPassword from '../api/auth/hooks/useEnterPassword';

const EnterPassword = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { mutate: checkPasswordMutate, isLoading } = useEnterPassword({
    setErrorMessage,
  });
  const handleConfirm = () => {
    if (currentPW.trim() === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }
    checkPasswordMutate({ password: currentPW });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <PageContainer>
          <LeftPage />

          <RightPage title="관리자 비밀번호 입력">
            <LoginContentGroup>
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
              <ErrorMessage visible={!!errorMessage}>
                {errorMessage}
              </ErrorMessage>
              <ButtonWrapper>
                <PasswordButton
                  content={isLoading ? '확인 중...' : '확인'}
                  onClick={handleConfirm}
                />
              </ButtonWrapper>
              <LinkButton onClick={() => navigate('/admin/change')}>
                비밀번호 변경하기
              </LinkButton>
            </LoginContentGroup>
          </RightPage>
        </PageContainer>
      </MainWrapper>
    </>
  );
};

export default EnterPassword;

const MainWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const LoginContentGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = styled.p`
  color: #ff5a5a;
  font-size: 1rem;
  width: 100%;
  max-width: 28.375rem;
  text-align: left;
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
