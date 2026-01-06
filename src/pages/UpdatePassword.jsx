import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import { useState } from 'react';
import LabeledInput from '../components/Form/LabeledInput';
import styled from '@emotion/styled';
import useUpdatePassword from '../api/hooks/useUpdatePassoword';

const UpdatePassword = () => {
  const [currentPW, setCurrentPW] = useState('');
  const [newPW, setNewPW] = useState('');
  const [confirmPW, setConfirmPW] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isLoading } = useUpdatePassword(setErrorMessage);

  const handleConfirm = () => {
    const errors = {};
    setErrorMessage('');

    if (currentPW.trim() === '') {
      errors.currentPW = '기존 비밀번호를 입력해주세요.';
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
      mutate({
        currentPassword: currentPW,
        newPassword: newPW,
        checkNewPassword: confirmPW,
      });
    }
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
        <LeftPage />
        <RightPage
          title="관리자 비밀번호 변경"
          buttonContent={isLoading ? '변경 중...' : '변경'}
          onClick={handleConfirm}
          buttonBottom="3rem"
          disableButton={isLoading}
        >
          <FormContainer>
            <InputGroup>
              <LabeledInput
                label="기존 비밀번호"
                placeholder="비밀번호를 입력해주세요."
                type="password"
                value={currentPW}
                onChange={(e) => {
                  setCurrentPW(e.target.value);
                  setFormErrors({});
                }}
                isError={!!formErrors.currentPW}
                onKeyDown={handleKeyDown}
              />
              <ErrorMessage visible={!!formErrors.currentPW}>
                {formErrors.currentPW}
              </ErrorMessage>
            </InputGroup>

            <InputGroup>
              <LabeledInput
                label="새 비밀번호"
                placeholder="새 비밀번호를 입력해주세요."
                type="password"
                value={newPW}
                onChange={(e) => {
                  setNewPW(e.target.value);
                  setFormErrors({});
                }}
                isError={!!formErrors.newPW}
                onKeyDown={handleKeyDown}
              />
              <ErrorMessage visible={!!formErrors.newPW}>
                {formErrors.newPW}
              </ErrorMessage>
            </InputGroup>

            <InputGroup>
              <LabeledInput
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해주세요."
                type="password"
                value={confirmPW}
                onChange={(e) => {
                  setConfirmPW(e.target.value);
                  setFormErrors({});
                }}
                isError={!!formErrors.confirmPW}
                onKeyDown={handleKeyDown}
              />
              <ErrorMessage visible={!!formErrors.confirmPW}>
                {formErrors.confirmPW}
              </ErrorMessage>
            </InputGroup>
          </FormContainer>
        </RightPage>
      </MainWrapper>
    </>
  );
};

export default UpdatePassword;

const MainWrapper = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0;

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

const ErrorMessage = styled.p`
  color: #ff5a5a;
  font-size: 1.2rem;
  width: 100%;
  max-width: 28.375rem;
  text-align: right;
  margin: 0.3rem 0 0 0.5rem;
  min-height: 1.2rem;
  position: static;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;
