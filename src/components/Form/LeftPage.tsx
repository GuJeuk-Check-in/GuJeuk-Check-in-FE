import styled from '@emotion/styled';
import Logo from '../../assets/Logo.png';

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
  border-radius: 20px 0 0 20px;
  background-color: #ffffff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 50vh;
    border-radius: 20px 20px 0 0;
    padding: 30px 20px;
  }
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

const Title = styled.p`
  font-size: 4rem;
  color: #2f68c2;
  text-align: center;
  margin: 20px auto;
  line-height: 1.2;
  font-family: 'Jua', sans-serif;
  font-weight: 400;
  word-break: keep-all;

  @media (max-width: 1200px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 10px auto;
  }
`;

const HighTitle = styled.span`
  font-size: 1.2em;
  color: #f86879;
`;

const SubTitle = styled.p`
  background-color: #5e97db;
  color: #ffffff;
  padding: 10px 20px;
  text-align: center;
  font-size: 0.95rem;
  margin: 20px auto;
  line-height: 1.5;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 15px;
    width: 90%;
  }
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 20px;
  font-size: 1rem;
  color: #333;
  display: inline-block;
  text-align: left;

  li {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 10px 0;
  }
`;
