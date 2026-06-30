import styled from '@emotion/styled';
import { Logo } from '@shared/assets';
import { PasswordBackground } from '@shared/ui/Background';
import { useNavigate } from 'react-router-dom';

const CheckInHome = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <PasswordBackground />
      <Content>
        <LogoImage src={Logo} alt="구즉 청소년문화의집" />
        <GuideText>시설을 이용하려면 아래 버튼을 눌러줘</GuideText>
        <StartButton
          type="button"
          onClick={() => navigate('/check-in/user-check')}
        >
          시설 이용하기
        </StartButton>
      </Content>
    </Page>
  );
};

export default CheckInHome;

const Page = styled.main`
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow: hidden;
`;

const Content = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100dvh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(2rem, 6vh, 4rem) 1.5rem 8vh;
`;

const LogoImage = styled.img`
  width: min(54vw, 50rem);
  min-width: 18rem;
  height: auto;
  margin-top: clamp(1rem, 4vh, 3rem);
`;

const GuideText = styled.p`
  margin: clamp(4rem, 10vh, 8rem) 0 0;
  color: #3ab9ff;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.6rem, 2.6vw, 3rem);
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  text-shadow: 0 0.25rem 0.5rem rgba(34, 127, 191, 0.28);
`;

const StartButton = styled.button`
  width: min(15rem, calc(100vw - 3rem));
  min-height: 5.5rem;
  margin-top: clamp(2.5rem, 5vh, 4rem);
  border: 0;
  border-radius: 2.75rem;
  background-color: #3ab9ff;
  box-shadow: 0 0.45rem 1.25rem rgba(60, 154, 217, 0.35);
  color: #ffffff;
  cursor: pointer;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1rem, 2vw, 2rem);
  font-weight: 400;
  line-height: 1;
  transform-origin: center bottom;
  animation: balloonWiggle 3.2s ease-in-out infinite;
  transition: background-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: #4aadeb;
    box-shadow: 0 0.55rem 1.5rem rgba(60, 154, 217, 0.42);
    animation-play-state: paused;
    transform: translateY(-0.18rem) scale(1.03);
  }

  &:active {
    transform: translateY(0.08rem) scale(0.98);
  }

  &:focus-visible {
    outline: 0.25rem solid rgba(15, 80, 160, 0.28);
    outline-offset: 0.25rem;
  }

  @keyframes balloonWiggle {
    0%,
    100% {
      transform: translateY(0) rotate(0deg) scale(1);
      box-shadow: 0 0.45rem 1.25rem rgba(60, 154, 217, 0.35);
    }
    18% {
      transform: translateY(-0.2rem) rotate(-1.5deg) scale(1.025);
      box-shadow: 0 0.6rem 1.45rem rgba(60, 154, 217, 0.38);
    }
    36% {
      transform: translateY(0.05rem) rotate(1.2deg) scale(0.995);
    }
    52% {
      transform: translateY(-0.12rem) rotate(-0.7deg) scale(1.012);
    }
    68% {
      transform: translateY(0) rotate(0.45deg) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
