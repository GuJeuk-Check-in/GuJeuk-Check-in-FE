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
`;

const CheckIcon = styled.span`
  display: inline-flex;
  color: #2f66ad;
  font-size: 2.6rem;
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
