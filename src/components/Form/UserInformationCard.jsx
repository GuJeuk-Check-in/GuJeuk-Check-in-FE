import styled from '@emotion/styled';

const UserInformationCard = ({
  name,
  location,
  gender,
  birthday,
  phonNumber,
}) => {
  return (
    <Container>
      <LeftSection>
        <Location>{location}</Location>
        <Name>{name}</Name>
      </LeftSection>

      <RightSection>
        <Gender>{gender}</Gender>
        <Diver />
        <Birthday>{birthday}</Birthday>
        <Diver />
        <PhoneNumber>{phonNumber}</PhoneNumber>
      </RightSection>
    </Container>
  );
};

export default UserInformationCard;

const Container = styled.div`
  position: relative;
  background-color: #ffffff;
  border: 1px solid #6f95c4;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  width: 70%;
  height: 11vh;
  margin: 12px auto;
  cursor: pointer;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-left: 20px;
`;
const Location = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: #969698;
  margin: 0;
`;

const Name = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`;

const Diver = styled.div`
  width: 1.5px;
  height: 20px;
  background-color: #aaa;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Gender = styled.span`
  font-size: 20px;
  color: #2e2e32;
`;

const Birthday = styled.span`
  font-size: 20px;
  color: #2e2e32;
`;

const PhoneNumber = styled.span`
  font-size: 20px;
  color: #2e2e32;
`;
