import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface UserVisitCardProps {
  id: number;
  name: string;
  male: number;
  female: number;
  date: string;
  onDelete?: () => void;
}

export const UserVisitCard = ({
  id,
  name,
  male,
  female,
  date,
  onDelete,
}: UserVisitCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/log/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <Container onClick={handleCardClick}>
      <LeftSection>
        <Name>대표자: {name}</Name>
        <Info>
          <span>남 : {male}</span>
          <Divider />
          <span>여 : {female}</span>
        </Info>
      </LeftSection>

      <RightSection>
        <Date>{date}</Date>
        <CloseButton onClick={handleDeleteClick}>
          <IoClose size="1.8rem" />
        </CloseButton>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 80rem;
  min-height: 8.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background-color: #ffffff;
  border: 1px solid #6f95c4;
  border-radius: 2.25rem;
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 3.75rem;
`;

const Name = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #2e2e32;
`;
const Divider = styled.div`
  width: 0.0625rem;
  height: 1.25rem;
  background-color: #aaa;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Date = styled.span`
  font-size: 1.25rem;
  color: #969698;
`;

const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #969696;
  cursor: pointer;
`;
