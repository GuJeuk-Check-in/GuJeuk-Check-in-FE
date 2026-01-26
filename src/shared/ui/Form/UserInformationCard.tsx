import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

interface UserInformationCardProps {
  id: number;
  name: string;
  location: string;
  gender: GenderType;
  birthday: string;
  phonNumber: string;
  count?: number | null;
}

type GenderType = 'MAN' | 'WOMAN';

const GENDER_MAP: Record<GenderType, string> = {
  MAN: '남성',
  WOMAN: '여성',
};

const spinAndFade = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(0);
    opacity: 0;
  }
`;

const SpinningImage = styled.img`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  object-fit: contain;
  z-index: 99999;
  pointer-events: none;
  animation: ${spinAndFade} 0.8s ease-out forwards;
`;

const UserInformationCard = ({
  id,
  name,
  location,
  gender,
  birthday,
  phonNumber,
  count,
}: UserInformationCardProps) => {
  const navigate = useNavigate();
  const displayCount = count !== null && count !== undefined ? count : 0;
  const [showSpinner, setShowSpinner] = useState(false);

  const handleCardClick = () => {
    setShowSpinner(true);
    setTimeout(() => setShowSpinner(false), 800);
  };

  return (
    <Container onClick={handleCardClick}>
      {showSpinner && (
        <SpinningImage
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfC-gXi_Ed2IW4yN7cjqHtDzDvEyd649snFA&s"
          alt="Spinning"
        />
      )}
      <LeftSection>
        <Location>{location}</Location>
        <Name>{name}</Name>
      </LeftSection>

      <RightSection>
        <RightWrapper>
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/user/${id}`);
            }}
          >
            수정
          </EditButton>{' '}
          <InfoWrapper>
            <Gender>{GENDER_MAP[gender] || gender}</Gender>
            <Diver />
            <Birthday>{birthday}</Birthday>
            <Diver />
            <PhoneNumber>{phonNumber}</PhoneNumber>
            <Diver />
            <Count title="누적 방문 횟수">{displayCount}회 방문</Count>
          </InfoWrapper>
        </RightWrapper>
      </RightSection>
    </Container>
  );
};

export default UserInformationCard;

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 0.0625rem solid #6f95c4;
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  width: 100%;
  box-sizing: border-box;
  height: 10rem;
  margin: 0;
  cursor: pointer;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-left: 1.25rem;
`;

const Location = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: #2e2e32;
  margin: 0;
`;

const Name = styled.h2`
  font-size: 2.1rem;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`;

const UserId = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: #2e2e32;
  margin: 0;
`;

const Diver = styled.div`
  width: 0.09375rem;
  height: 1.25rem;
  background-color: #aaa;
  padding: 0;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const EditButton = styled.button`
  font-size: 1.25rem;
  color: #828284;
  border: none;
  background: none;
  border-bottom: 1px solid #828284;
  cursor: pointer;
  padding: 0;
`;

const Gender = styled.span`
  font-size: 1.25rem;
  color: #828284;
`;

const Birthday = styled.span`
  font-size: 1.25rem;
  color: #828284;
`;

const PhoneNumber = styled.span`
  font-size: 1.25rem;
  color: #828284;
`;

const Count = styled.div`
  font-size: 1.25rem;
  color: #828284;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 0.9rem;
`;
