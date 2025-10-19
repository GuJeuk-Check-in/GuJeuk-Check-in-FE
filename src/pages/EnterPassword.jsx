import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import LabeledInput from '../components/Form/LabeledInput';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterPassword } from '../api/authApi';

const EnterPasswordPage = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('버튼 눌림:', currentPW);
    if (currentPW.trim() === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await EnterPassword(currentPW);
      console.log('로그인 성공:', res);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('로그인 실패:', err);
      setErrorMessage('로그인 실패: 비밀번호를 확인하세요.');
    }
  };

  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <LeftPage />
        <RightPage
          title="관리자 비밀번호 입력"
          buttonContent="확인"
          onClick={handleLogin}
          buttonBottom="200px"
        >
          <EmptyInputSpace />
          <InputAndErrorWrapper>
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
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </InputAndErrorWrapper>
          <UpdatePasswordButtonFixer>
            <UpdatePasswordButton onClick={() => navigate('/update-password')}>
              비밀번호 변경하기
            </UpdatePasswordButton>
          </UpdatePasswordButtonFixer>
        </RightPage>
      </MainWrapper>
    </>
  );
};

export default EnterPasswordPage;

const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.p`
  color: #ff5a5a;
  font-size: 20px;
  width: 100%;
  text-align: right;
  padding-right: 100px;
`;

const EmptyInputSpace = styled.div`
  height: 80px;
`;

const InputAndErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdatePasswordButton = styled.button`
  border: none;
  background: none;
  color: #a4dfff;
  font-size: 18px;
  cursor: pointer;
`;

const UpdatePasswordButtonFixer = styled.div`
  position: absolute;
  bottom: 130px;
  left: 82%;
  transform: translateX(-50%);
  width: calc(100% - 80px);
  text-align: left;
`;
