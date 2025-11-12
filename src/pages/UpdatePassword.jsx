import PasswordBackground from '../components/Background/PasswordBackground';
import LeftPage from '../components/Form/LeftPage';
import RightPage from '../components/Form/RightPage';
import { useState } from 'react';
import LabeledInput from '../components/Form/LabeledInput';
import styled from '@emotion/styled';
import useUpdatePassword from '../hooks/useUpdatePassoword';

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
          buttonBottom="60px"
          disableButton={isLoading}
        >
          {errorMessage && (
            <ServerErrorMessage>{errorMessage}</ServerErrorMessage>
          )}
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
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
  min-height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputGroupSpacer = styled.div`
  height: 3.875rem;
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
  font-size: 1.25rem;
  width: 100%;
  text-align: right;
  padding-right: 6.25rem;
  margin: 0;
  position: absolute;
  top: 6.5625rem;
  right: -3.125rem;
`;

const ServerErrorMessage = styled.p`
  color: #ff5a5a;
  font-size: 1.25rem;
  width: 100%;
  text-align: right;
  padding-right: 6.25rem;
`;
