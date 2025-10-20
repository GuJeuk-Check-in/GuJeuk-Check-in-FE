import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import LabeledInput from '../components/Form/LabeledInput';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEnterPassword from '../hooks/useEnterPassword';

const EnterPassword = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { mutate: checkPasswordMutate, isLoading } =
    useEnterPassword(setErrorMessage);

  const handleConfirm = () => {
    if (currentPW.trim() === '') {
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }
    checkPasswordMutate(currentPW);
  };

  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <LeftPage />
        <RightPage
          title="관리자 비밀번호 입력"
          buttonContent={isLoading ? '확인 중...' : '확인'}
          onClick={handleConfirm}
          buttonBottom="200px"
          disableButton={isLoading}
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
            <UpdatePasswordButton onClick={() => navigate('/admin/change')}>
              비밀번호 변경하기
            </UpdatePasswordButton>
          </UpdatePasswordButtonFixer>
        </RightPage>
      </MainWrapper>
    </>
  );
};

export default EnterPassword;

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
