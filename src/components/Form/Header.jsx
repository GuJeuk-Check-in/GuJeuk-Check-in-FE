import { useNavigate } from 'react-router-dom';
import HeaderButton from '../Button/HeaderButton';
import Logo from '../../assets/Logo.png';
import styled from '@emotion/styled';

const Header = ({ title }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {' '}
      <img
        src={Logo}
        alt="로고 이미지"
        onClick={() => navigate('/user-visit-list')}
      />{' '}
      <HeaderButton onClick={() => navigate('/user-visit-list')}>
        시설 이용 목록 조회
      </HeaderButton>
      <Diver />
      <HeaderButton onClick={() => navigate('/user-detail')}>
        시설 이용 기록 추가
      </HeaderButton>
      <Diver />
      <HeaderButton onClick={() => navigate('/purpose-custom')}>
        방문 목적 커스텀
      </HeaderButton>
      <Diver />
      <HeaderButton onClick={() => navigate('/user-information')}>
        회원 목록 조회
      </HeaderButton>
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
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

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
  font-weight: 600;
  color: #393939;
  margin-left: auto;
  margin-right: 20px;
`;

const Diver = styled.div`
  width: 1.5px;
  height: 20px;
  background-color: #aaa;
`;
