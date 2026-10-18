import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useLogin } from '../model/useLogin';
import { AuthInput } from '@shared/ui/input/AuthInput';
import { PasswordButton } from '@shared/ui/Button/index';
import { IdInput } from '@shared/assets';

export const LoginForm = () => {
  const [organName, setOrganName] = useState('');
  const [currentPW, setCurrentPW] = useState('');
  const [organNameError, setOrganNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  const handleConfirm = () => {
    setOrganNameError('');
    setPasswordError('');

    if (organName.trim() === '') { // 기관 이름이 비어있으면 오류 메시지 설정
      setOrganNameError('기관 이름을 입력해주세요.');
      return;
    }

    if (currentPW.trim() === '') { // 비밀번호가 비어있으면 오류 메시지 설정
      setPasswordError('비밀번호를 입력해주세요.');
      return;
    }

    login(
      { organName, password: currentPW },
      {
        onSuccess: () => {
          navigate('/log', { replace: true }); // 로그인 성공 시 로그 기록 페이지로 이동
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || error.message || '로그인 실패'; // 오류 메시지 설정
          if (message.includes('기관') || message.includes('organName')) { // 기관 이름 관련 오류 메시지 설정
            setOrganNameError(message);
          } else if (
            message.includes('비밀번호') ||
            message.includes('password')
          ) {
            setPasswordError(message); // 비밀번호 오류 메시지 설정
          } else {
            setPasswordError(message); // 기타 오류 메시지 설정
          } 
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { // 엔터 키 입력 시 로그인 처리
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
        icon={<img src={IdInput} />}
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
        <LinkButton onClick={() => navigate('/organ/change')}>
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
  color: #ff5a5a;
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

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
