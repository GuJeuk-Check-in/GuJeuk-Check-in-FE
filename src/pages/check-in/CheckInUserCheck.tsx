import styled from '@emotion/styled';
import { checkUserExists, isRetryableCheckInError } from '@entities/visit';
import { useModal } from '@shared/hooks/useModal';
import { getApiErrorMessage } from '@shared/api';
import { Modal } from '@shared/ui';
import { PasswordBackground } from '@shared/ui/Background';
import { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FiArrowRight, FiPhone, FiUser } from 'react-icons/fi';
import { PiHandWavingBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { createHighAvailabilityRouteState } from './checkInRouteState';

const CheckInUserCheck = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const modal = useModal();

  const openWarningModal = (title: string, subtitle: string) => {
    modal.openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title,
      subtitle,
      theme: 'warning',
      buttons: [{ label: '확인', onClick: modal.closeModal }],
    });
  };

  const openFirstVisitModal = (checkedName: string, checkedPhone: string) => {
    modal.openModal({
      icon: <PiHandWavingBold size={52} color="#0F50A0" />,
      title: '시설에 혹시 처음 방문했니?',
      subtitle: '정보를 잘못 입력했다면 아니요를 눌러 다시 확인할 수 있어.',
      theme: 'info',
      buttons: [
        {
          label: '아니요',
          variant: 'secondary',
          onClick: modal.closeModal,
        },
        {
          label: '예',
          variant: 'primary',
          bgColor: '#145cad',
          onClick: () => {
            modal.closeModal();
            navigate('/check-in/signup-form', {
              state: {
                name: checkedName,
                phone: checkedPhone,
              },
            });
          },
        },
      ],
    });
  };

  const handleCheckUser = async () => {
    if (isChecking) return;

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      openWarningModal('입력 확인', '이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsChecking(true);
      const response = await checkUserExists({
        name: trimmedName,
        phone: trimmedPhone,
      });

      if (response.userExists) {
        if (typeof response.userId !== 'number') {
          openWarningModal(
            '회원 확인 실패',
            '회원 정보를 확인하지 못했습니다. 다시 시도해주세요.'
          );
          return;
        }

        navigate('/check-in/login-form', {
          state: {
            userId: response.userId,
            name: trimmedName,
            phone: trimmedPhone,
          },
        });
        return;
      }

      openFirstVisitModal(trimmedName, trimmedPhone);
    } catch (error) {
      if (isRetryableCheckInError(error)) {
        navigate('/check-in/signup-form', {
          state: createHighAvailabilityRouteState(trimmedName, trimmedPhone),
        });
        return;
      }

      openWarningModal(
        '회원 확인 실패',
        getApiErrorMessage(error, '회원 정보를 확인하지 못했습니다.')
      );
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Page>
      <PasswordBackground />
      <Panel>
        <Header>
          <Title>반가워! 청소년문화의집에 다시 와줘서 고마워</Title>
          <Subtitle>시설을 이용하려면 작성해줘</Subtitle>
        </Header>

        <FormBody aria-label="재방문 정보 입력">
          <FieldBlock>
            <FieldLabel>
              <FiUser aria-hidden="true" />
              이름이 뭐야?
            </FieldLabel>
            <TextInput
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="친구의 이름을 알려줘"
            />
          </FieldBlock>

          <FieldBlock>
            <FieldLabel>
              <FiPhone aria-hidden="true" />
              전화번호가 뭐야?
            </FieldLabel>
            <TextInput
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="010-0000-0000"
            />
          </FieldBlock>

          <NextButton
            type="button"
            onClick={handleCheckUser}
            disabled={isChecking}
          >
            {isChecking ? '확인 중...' : '넘어가기!'}
            <FiArrowRight aria-hidden="true" />
          </NextButton>
        </FormBody>
      </Panel>
      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
      <Footer>made by Busurker</Footer>
    </Page>
  );
};

export default CheckInUserCheck;

const Page = styled.main`
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem 6rem;
`;

const Panel = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 65rem);
  box-sizing: border-box;
  padding: clamp(2rem, 4vw, 3.5rem);
  border: 0.125rem solid #e7eaf3;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 1.5rem 2.75rem rgba(24, 48, 88, 0.15);
`;

const Header = styled.header`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  color: #3d72b3;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.4rem, 2.1vw, 2rem);
  font-weight: 400;
  line-height: 1.2;
  word-break: keep-all;
`;

const Subtitle = styled.p`
  margin: 0.75rem 0 0;
  color: #3d72b3;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.5rem);
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  margin-top: 2.5rem;
`;

const FieldBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FieldLabel = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0;
  color: #26364c;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;

  svg {
    color: #1f63b7;
  }
`;

const TextInput = styled.input`
  width: 100%;
  height: 4rem;
  box-sizing: border-box;
  border: 0;
  border-radius: 2rem;
  background-color: #fbfbff;
  box-shadow: 0 0.35rem 0 #d6e2ef;
  color: #26364c;
  font-size: 1rem;
  outline: none;
  padding: 0 1.8rem;

  &::placeholder {
    color: #747b86;
  }

  &:focus {
    box-shadow: 0 0.35rem 0 #9fc4e7;
  }
`;

const NextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 4.6rem;
  margin-top: clamp(2rem, 5vh, 3.5rem);
  border: 0;
  border-radius: 2.3rem;
  background-color: #145cad;
  box-shadow: 0 0.35rem 0 #c9d7e8;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  svg {
    font-size: 1.6rem;
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 2rem;
  left: 0;
  z-index: 1;
  width: 100%;
  color: #1f63b7;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
`;
