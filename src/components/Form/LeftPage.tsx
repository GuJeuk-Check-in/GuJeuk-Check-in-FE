import styled from '@emotion/styled';
import Logo from '../../assets/Logo.png';
import React from 'react';

const LeftPage = () => {
  return (
    <Container>
      <LogoImage src={Logo} alt="로고 이미지" />
      <Title>
        나의 <HighTitle>미래</HighTitle>는<br /> 내가 만드는 거야
      </Title>
      <SubTitle>
        미래를 만들어가는 청소년, 구즉청소년문화의집이 함께 하겠습니다.
      </SubTitle>
      <List>
        <li>청소년이 호기심을 발견하는 창의 발전소</li>
        <li>청소년이 행복한 문화 다락방</li>
        <li>청소년이 재미 있는 놀이 아지트</li>
      </List>
    </Container>
  );
};

export default LeftPage;

const Container = styled.div`
  width: 35.89vw;
  min-width: 400px;
  height: 74.63vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  border-radius: 20px 0 0 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgb(187, 209, 236);
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 50%;
    height: auto;
    min-height: 50vh;
    padding: 30px;
    gap: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-radius: 20px 20px 0 0;
    padding: 25px 20px;
    gap: 10px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
    gap: 8px;
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    max-width: 120px;
  }

  @media (max-width: 768px) {
    max-width: 100px;
  }

  @media (max-width: 480px) {
    max-width: 80px;
  }
`;

const Title = styled.p`
  font-size: 3.5rem;
  color: #2f68c2;
  text-align: center;
  margin: 0;
  line-height: 1.2;
  font-family: 'Jua', sans-serif;
  font-weight: 400;
  word-break: keep-all;
  flex-shrink: 0;
  max-width: 100%;
  width: 100%;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const HighTitle = styled.span`
  font-size: 1.5em;
  color: #f86879;
`;

const SubTitle = styled.p`
  background-color: #5e97db;
  color: #ffffff;
  padding: 10px 15px;
  text-align: center;
  font-size: 1rem;
  margin: 0;
  line-height: 1.4;
  word-break: keep-all;
  font-family: 'Jua', sans-serif;
  border-radius: 10px;
  flex-shrink: 0;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 25px;
  font-size: 1rem;
  color: #333;
  width: 100%;
  text-align: left;
  margin: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  max-width: 100%;

  li {
    margin-bottom: 8px;
    word-break: keep-all;
    line-height: 1.3;
  }

  @media (max-width: 1024px) {
    font-size: 0.95rem;
    padding-left: 20px;

    li {
      margin-bottom: 6px;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding-left: 18px;

    li {
      margin-bottom: 5px;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding-left: 15px;

    li {
      margin-bottom: 4px;
    }
  }
`;
