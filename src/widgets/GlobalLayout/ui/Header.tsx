import { useNavigate } from 'react-router-dom';
import { HeaderButton } from '@shared/ui/Button/index';
import Logo from '../../../assets/Logo.png';
import styled from '@emotion/styled';

export const Header = () => {
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
        <HeaderButton onClick={() => navigate('/log/create')}>
          시설 이용 기록 추가
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/purpose/all')}>
          방문 목적 커스텀
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/organ/user/all')}>
          회원 목록 조회
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/residence')}>
          거주지 커스텀
        </HeaderButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20vw;
  min-height: 100vh;
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  padding: 2rem 0;
`;

const LogoImage = styled.img`
  width: 15rem;
  height: auto;
  object-fit: contain;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 3rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
  overflow: hidden;
  font-size: 28px;
  margin-right: 1.25rem;
`;
