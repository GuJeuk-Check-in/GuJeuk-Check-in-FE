import styled from '@emotion/styled';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const UserVisitCard = ({ id, name, male, female, date, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/admin/list/${id}`);
  };

  const handleDeleteClick = (e) => {
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

export default UserVisitCard;

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 0.0625rem solid #6f95c4;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  width: 70%;
  height: 7.5rem;
  margin: 0.75rem auto;
  cursor: pointer;
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
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #c00;
`;
