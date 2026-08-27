import styled from '@emotion/styled';
import { PasswordBackground } from '@shared/ui/Background';
import type { ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

type CheckInLoginPageLayoutProps = {
  readonly children: ReactNode;
  readonly onBack: () => void;
};

export const CheckInLoginPageLayout = ({
  children,
  onBack,
}: CheckInLoginPageLayoutProps) => (
  <Page>
    <PasswordBackground />
    <Panel>
      <Header>
        <TitleRow>
          <BackButton type="button" onClick={onBack} aria-label="뒤로 가기">
            <FiArrowLeft />
          </BackButton>
          <Title>반가워! 청소년문화의집에 다시 와줘서 고마워</Title>
        </TitleRow>
        <Subtitle>시설을 이용하려면 작성해줘</Subtitle>
      </Header>
      <FormBody aria-label="시설 이용 정보 입력">{children}</FormBody>
    </Panel>
    <Footer>made by Busurker</Footer>
  </Page>
);

const Page = styled.main`
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 6.5rem 1.5rem 4rem;

  @media (max-width: 560px) {
    padding-right: 1rem;
    padding-left: 1rem;
  }
`;

const Panel = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 64rem);
  margin: 0 auto;
  box-sizing: border-box;
  padding: clamp(2rem, 4vw, 4rem);
  border: 0.125rem solid #e7eaf3;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 1.5rem 2.75rem rgba(24, 48, 88, 0.15);

  @media (max-width: 560px) {
    padding: 1.5rem;
  }
`;

const Header = styled.header`
  text-align: center;
`;

const TitleRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;

  @media (max-width: 560px) {
    align-items: flex-start;
    padding-top: 3rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 400;
  line-height: 1.2;
  word-break: keep-all;

  @media (max-width: 560px) {
    font-size: 1.7rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.75rem 0 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  margin-top: 2rem;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #2f66ad;
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background: #f0f4fb;
  }

  @media (max-width: 560px) {
    top: 0;
    transform: none;
  }
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
