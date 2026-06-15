import styled from '@emotion/styled';
import { Logo } from '@shared/assets';
import { PasswordBackground } from '@shared/ui/Background';

const CheckInHome = () => {
  return (
    <Page>
      <PasswordBackground />
      <Content>
        <LogoImage src={Logo} alt="구즉 청소년문화의집" />
        <GuideText>시설을 이용하려면 아래 버튼을 눌러줘</GuideText>
        <StartButton type="button">시설 이용하기</StartButton>
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
  transition: background-color 0.2s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: #4aadeb;
    box-shadow: 0 0.55rem 1.5rem rgba(60, 154, 217, 0.42);
    transform: translateY(-0.125rem);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 0.25rem solid rgba(15, 80, 160, 0.28);
    outline-offset: 0.25rem;
  }
`;
