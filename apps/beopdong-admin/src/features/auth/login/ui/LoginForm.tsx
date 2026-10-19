import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthInput } from '@shared/ui/input/AuthInput';
import { PasswordButton } from '@shared/ui/Button';
import { IdInput } from '@shared/assets';

export const LoginForm = () => {
  const [organName, setOrganName] = useState('');
  const [currentPW, setCurrentPW] = useState('');
  const [organNameError, setOrganNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleConfirm = () => {
    setOrganNameError('');
    setPasswordError('');

    if (organName.trim() === '') {
      setOrganNameError('기관 이름을 입력해주세요.');
      return;
    }

    if (currentPW.trim() === '') {
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    setPasswordError('법동 관리자 로그인 API 연결이 아직 준비되지 않았습니다.');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
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
        onChange={(event) => {
          setOrganName(event.target.value);
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
        onChange={(event) => {
          setCurrentPW(event.target.value);
          setPasswordError('');
        }}
        isError={!!passwordError}
        onKeyDown={handleKeyDown}
      />
      <ErrorMessage visible={!!errorMessage}>{errorMessage}</ErrorMessage>
      <BottomWrapper>
        <ButtonWrapper>
          <PasswordButton content="확인" onClick={handleConfirm} />
        </ButtonWrapper>
        <LinkButton type="button" onClick={() => navigate('/organ/change')}>
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
  color: #fff2d8;
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
  color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 5px;
  margin-top: 5px;
  text-decoration: underline;

  &:hover {
    color: #fff2d8;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
