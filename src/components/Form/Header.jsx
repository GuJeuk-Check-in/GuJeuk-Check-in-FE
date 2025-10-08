import HeaderButton from '../Button/HeaderButton';
import Logo from '../../assets/Logo.png';
import styled from '@emotion/styled';

const Header = ({ title }) => {
  return (
    <Container>
      <img src={Logo} alt="로고 이미지" />
      <HeaderButton>시설 이용 목록 조회</HeaderButton>
      <HeaderButton>시설 이용 기록 추가</HeaderButton>
      <HeaderButton>방문 목적 커스텀</HeaderButton>
      <HeaderButton>회원 목록 조회</HeaderButton>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;

  gap: 20px;
  width: 100%;
  height: 12.04vh;

  img {
    width: 256px;
    height: 98px;
    object-fit: contain;
    margin-left: 30px;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  color: #393939;
  margin-left: auto;
  margin-right: 20px;
`;
