import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import { useState } from 'react';
import LabeledInput from '../components/Form/LabeledInput';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const CORRECT_PASSWORD = '1234';

  const handleConfirm = () => {
    const errors = {};

    if (currentPW.trim() === '') {
      errors.currentPW = '기존 비밀번호를 입력해주세요.';
    } else if (currentPW !== CORRECT_PASSWORD) {
      errors.currentPW = '일치하지 않습니다.';
    }

    if (newPW.trim() === '') {
      errors.newPW = '새 비밀번호를 입력해주세요.';
    }

    if (confirmPW.trim() === '') {
      errors.confirmPW = '비밀번호를 다시 입력해주세요.';
    } else if (newPW && newPW !== confirmPW) {
      errors.confirmPW = '일치하지 않습니다.';
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // API 호출 등의 로직을 여기에 추가
      alert('비밀번호가 성공적으로 변경되었습니다!');
      navigate('/user-visit-list');
    }
  };

  return (
    <>
      <PasswordBackground />
      <MainWrapper>
        <LeftPage />
        <RightPage
          title="관리자 비밀번호 변경"
          buttonContent="변경"
          onClick={handleConfirm}
          buttonBottom="60px"
        >
          <InputGroupWrapper>
            <LabeledInput
              label="기존 비밀번호"
              placeholder="비밀번호를 입력해주세요."
              value={currentPW}
              onChange={(e) => {
                setCurrentPW(e.target.value);
                setFormErrors({});
              }}
              isError={!!formErrors.currentPW}
            />
            <ErrorSpace>
              {formErrors.currentPW && (
                <ErrorMessage>{formErrors.currentPW}</ErrorMessage>
              )}
            </ErrorSpace>
          </InputGroupWrapper>

          <InputGroupSpacer />

          <InputGroupWrapper>
            <LabeledInput
              label="새 비밀번호"
              placeholder="새 비밀번호를 입력해주세요."
              value={newPW}
              onChange={(e) => {
                setNewPW(e.target.value);
                setFormErrors({});
              }}
              isError={!!formErrors.newPW}
            />
            <ErrorSpace>
              {formErrors.newPW && (
                <ErrorMessage>{formErrors.newPW}</ErrorMessage>
              )}
            </ErrorSpace>
          </InputGroupWrapper>

          <InputGroupSpacer />

          <InputGroupWrapper>
            <LabeledInput
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              value={confirmPW}
              onChange={(e) => {
                setConfirmPW(e.target.value);
                setFormErrors({});
              }}
              isError={!!formErrors.confirmPW}
            />
            <ErrorSpace>
              {formErrors.confirmPW && (
                <ErrorMessage>{formErrors.confirmPW}</ErrorMessage>
              )}
            </ErrorSpace>
          </InputGroupWrapper>
        </RightPage>
      </MainWrapper>
    </>
  );
};

export default UpdatePassword;

const MainWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputGroupSpacer = styled.div`
  height: 62px;
  width: 100%;
`;

const InputGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ErrorSpace = styled.div`
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: #ff5a5a;
  font-size: 20px;
  width: 100%;
  text-align: right;
  padding-right: 100px;
  margin: 0;
  position: absolute;
  top: 105px;
  right: -50px;
`;
