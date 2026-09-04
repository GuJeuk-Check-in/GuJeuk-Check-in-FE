import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

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
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <Container>
      <CardLink to={`/log/${id}`}>
        <LeftSection>
          <Name>대표자: {name}</Name>
          <Info>
            <span>남 : {male}</span>
            <Divider />
            <span>여 : {female}</span>
          </Info>
        </LeftSection>
        <Date>{date}</Date>
      </CardLink>
      <RightSection>
        <CloseButton type="button" onClick={handleDeleteClick} aria-label="방문 기록 삭제">
          <IoClose size="1.8rem" />
        </CloseButton>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  width: min(100%, 80rem);
  min-height: 8.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1.25rem, 3vw, 2rem);
  background-color: #ffffff;
  border: 1px solid #6f95c4;
  border-radius: clamp(1.5rem, 3vw, 2.25rem);
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 56rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CardLink = styled(Link)`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  color: inherit;
  text-decoration: none;

  @media (max-width: 56rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 4vw, 3.75rem);
  min-width: 0;

  @media (max-width: 40rem) {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Name = styled.h2`
  color: #2e2e32;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  overflow-wrap: anywhere;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2e2e32;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  white-space: nowrap;
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
  margin-left: auto;
  min-width: 0;

  @media (max-width: 56rem) {
    width: 100%;
    justify-content: flex-end;
    margin-left: 0;
  }
`;

const Date = styled.span`
  color: #969698;
  font-size: clamp(1rem, 2vw, 1.25rem);
  overflow-wrap: anywhere;
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
