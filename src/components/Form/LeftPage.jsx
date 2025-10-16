import styled from '@emotion/styled';
import Logo from '../../assets/Logo.png';

const LeftPage = () => {
  return (
    <Container>
      <img src={Logo} alt="로고 이미지" />
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
  height: 74.63vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px 0 0 20px;
  background-color: #ffffff;
`;

const Title = styled.p`
  font-size: 68px;
  color: #2f68c2;
  text-align: center;
  margin: 20px auto 20px auto;
  line-height: 1.2;
  font-family: 'Jua', sans-serif;
  font-weight: 400;
`;

const HighTitle = styled.span`
  font-size: 80px;
  color: #f86879;
`;

const SubTitle = styled.p`
  background-color: #5e97db;
  color: #ffffff;
  padding: 10px 20px;
  text-align: center;
  margin-bottom: 30px;
  font-size: 0.95rem;
  margin: 20px auto 20px auto;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 20px;
  font-size: 1rem;
  color: #333;
  margin: 20px 0 20px 50px;

  li {
    margin-bottom: 10px;
  }
`;
