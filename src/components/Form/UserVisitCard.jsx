import styled from '@emotion/styled';
import { IoClose } from 'react-icons/io5';

const UserVisitCard = ({ name, male, female, date }) => {
  return (
    <Container>
      <LeftSection>
        <Name>대표자: {name}</Name>
        <Info>
          <span>남 : {male}</span>
          <Divider />
          <span>여: {female}</span>
        </Info>
      </LeftSection>

      <RightSection>
        <Date>{date}</Date>
        <CloseButton>
          <IoClose size={24} />
        </CloseButton>
      </RightSection>
    </Container>
  );
};

export default UserVisitCard;

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 1px solid #6f95c4;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  width: 95%;
  height: 11vh;
  margin: 12px auto;
  cursor: pointer;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

const Name = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  color: #2e2e32;
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #aaa;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Date = styled.span`
  font-size: 20px;
  color: #969698;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #c00;
`;
