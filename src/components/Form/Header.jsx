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
        onClick={() => navigate('/admin/list/all')}
      />{' '}
      <ButtonWrapper>
        <HeaderButton onClick={() => navigate('/admin/list/all')}>
          시설 이용 목록 조회
        </HeaderButton>
        <Diver />
        <HeaderButton onClick={() => navigate('/admin/list/create')}>
          시설 이용 기록 추가
        </HeaderButton>
        <Diver />
        <HeaderButton onClick={() => navigate('/purpose/all')}>
          방문 목적 커스텀
        </HeaderButton>
        <Diver />
        <HeaderButton onClick={() => navigate('/user-information')}>
          회원 목록 조회
        </HeaderButton>
      </ButtonWrapper>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  height: 8.125rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  img {
    width: 16rem;
    height: 6.125rem;
    object-fit: contain;
    margin-left: 1.875rem;
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  /* 기존: gap: 8px; -> rem */
  gap: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  color: #393939;
  margin-left: auto;
  margin-right: 1.25rem;
`;

const Diver = styled.div`
  width: 0.09375rem;
  height: 1.25rem;
  background-color: #aaa;
`;
