import { useNavigate } from 'react-router-dom';
import HeaderButton from '../Button/HeaderButton';
import Logo from '../../assets/Logo.png';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoImage
        src={Logo}
        alt="로고 이미지"
        onClick={() => navigate('/log')}
      />
      <ButtonWrapper>
        <HeaderButton onClick={() => navigate('/log')}>
          시설 이용 목록 조회
        </HeaderButton>
        <Diver />
        <HeaderButton onClick={() => navigate('/log/create')}>
          시설 이용 기록 추가
        </HeaderButton>
        <Diver />
        <HeaderButton onClick={() => navigate('/purpose/all')}>
          방문 목적 커스텀
        </HeaderButton>
        <Diver />
        <HeaderButton onClick={() => navigate('/admin/user/all')}>
          회원 목록 조회
        </HeaderButton>
      </ButtonWrapper>
      <RightGroup>
        {children}
        <Title>{title}</Title>
      </RightGroup>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  width: 100%;
  height: 8.125rem;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding-right: 1.25rem;
`;

const LogoImage = styled.img`
  width: 15rem;
  height: auto;
  object-fit: contain;
  margin-left: 1.875rem;
  margin-right: 1rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
  margin-right: 1rem;
  flex-wrap: wrap;
  overflow: hidden;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-size: 1.625rem;
  font-weight: 600;
  color: #393939;
  white-space: nowrap;
  margin-left: 0.5rem;
`;

const Diver = styled.div`
  width: 0.09375rem;
  height: 1.25rem;
  background-color: #aaa;
  flex-shrink: 0;
`;
