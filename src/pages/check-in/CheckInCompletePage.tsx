import styled from '@emotion/styled';
import { PasswordBackground } from '@shared/ui/Background';
import { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AUTO_REDIRECT_MS = 3000;

const CheckInCompletePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/check-in', { replace: true });
    }, AUTO_REDIRECT_MS);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Page>
      <PasswordBackground />
      <Panel>
        <CheckIcon aria-hidden="true">
          <FiCheckCircle />
        </CheckIcon>
        <Title>시설 이용 신청이 끝났어</Title>
        <Subtitle>우리 시설을 바로 이용해도 좋아~!</Subtitle>
        <ReturnNotice>잠시 후 처음 화면으로 돌아갈게</ReturnNotice>
        <ProgressBar aria-hidden="true">
          <ProgressFill />
        </ProgressBar>
        <DoneButton type="button" onClick={() => navigate('/check-in', { replace: true })}>
          다 했어요! 🎉
        </DoneButton>
      </Panel>
      <Footer>made by Busurker</Footer>
    </Page>
  );
};

export default CheckInCompletePage;

const Page = styled.main`
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
`;

const Panel = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 64rem);
  box-sizing: border-box;
  padding: clamp(2.5rem, 5vw, 4.5rem) clamp(2rem, 4vw, 4rem);
  border: 0.125rem solid #e7eaf3;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 1.5rem 2.75rem rgba(24, 48, 88, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: panelEnter 0.58s cubic-bezier(0.22, 1, 0.36, 1) both;

  @keyframes panelEnter {
    from {
      opacity: 0;
      transform: translateY(1.25rem) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const CheckIcon = styled.span`
  display: inline-flex;
  color: #2f66ad;
  font-size: 2.6rem;
  animation: checkPop 0.72s cubic-bezier(0.2, 1.45, 0.45, 1) both,
    checkFloat 2.4s ease-in-out 0.72s infinite;

  @keyframes checkPop {
    0% {
      opacity: 0;
      transform: scale(0.35) rotate(-18deg);
    }
    64% {
      opacity: 1;
      transform: scale(1.14) rotate(6deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }

  @keyframes checkFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.28rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Title = styled.h1`
  margin: 1.4rem 0 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.6rem, 2.6vw, 2.3rem);
  font-weight: 400;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  margin: 0.7rem 0 0;
  color: #7f8793;
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
`;

const ReturnNotice = styled.p`
  margin: 1.2rem 0 0;
  color: #2f66ad;
  font-size: 0.95rem;
  font-weight: 700;
`;

const ProgressBar = styled.div`
  width: min(100%, 18rem);
  height: 0.42rem;
  margin-top: 0.9rem;
  overflow: hidden;
  border-radius: 999px;
  background: #edf4ff;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const ProgressFill = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #3ab9ff, #145cad);
  transform-origin: left center;
  animation: redirectProgress ${AUTO_REDIRECT_MS}ms linear forwards;

  @keyframes redirectProgress {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const DoneButton = styled.button`
  width: 100%;
  min-height: 4.6rem;
  margin-top: 2.5rem;
  border: 0;
  border-radius: 2.3rem;
  background-color: #145cad;
  box-shadow: 0 0.35rem 0 #c9d7e8;
  color: #ffffff;
  cursor: pointer;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
`;

const Footer = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: 4rem;
  color: #1f63b7;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
`;
