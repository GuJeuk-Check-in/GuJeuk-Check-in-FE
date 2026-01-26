import { useNavigate } from 'react-router-dom';
import HeaderButton from '../../../shared/ui/Button/HeaderButton';
import Logo from '../../../assets/Logo.png';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import React, { ReactNode, useState, useRef } from 'react';
import { MiniGame } from '@shared/effects/MiniGame';
import { fireConfetti } from '@shared/effects';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  const navigate = useNavigate();
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const purposeClickRef = useRef(0);
  const purposeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);

    if (clickCountRef.current >= 10) {
      clickCountRef.current = 0;
      setShowMiniGame(true);
    } else {
      navigate('/log');
    }
  };

  const handlePurposeClick = () => {
    purposeClickRef.current += 1;

    if (purposeTimerRef.current) {
      clearTimeout(purposeTimerRef.current);
    }

    purposeTimerRef.current = setTimeout(() => {
      purposeClickRef.current = 0;
    }, 1500);

    if (purposeClickRef.current >= 3) {
      purposeClickRef.current = 0;
      setShowExplosion(true);
      setTimeout(() => {
        fireConfetti();
        setShowExplosion(false);
      }, 1500);
    } else {
      navigate('/purpose/all');
    }
  };

  return (
    <Container>
      {showMiniGame && <MiniGame onClose={() => setShowMiniGame(false)} />}
      {showExplosion && (
        <ExplosionOverlay>
          <ExplosionImage src="https://i.ytimg.com/vi/3oS1d9ZYU5c/maxresdefault.jpg" />
        </ExplosionOverlay>
      )}
      <LogoImage
        src={Logo}
        alt="로고 이미지"
        onClick={handleLogoClick}
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
        <HeaderButton onClick={handlePurposeClick}>
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

const growAndExplode = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 1;
  }
  90% {
    transform: translate(-50%, -50%) scale(1.8);
    filter: brightness(2);
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
    filter: brightness(5);
  }
`;

const ExplosionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExplosionImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 80%;
  max-height: 80%;
  border-radius: 20px;
  animation: ${growAndExplode} 1.5s ease-in-out forwards;
  box-shadow: 0 0 50px rgba(255, 150, 0, 0.8);
`;
