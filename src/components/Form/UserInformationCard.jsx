import styled from '@emotion/styled';

const UserInformationCard = ({
  name,
  location,
  gender,
  birthday,
  phonNumber,
  count,
}) => {
  const displayCount = count !== null && count !== undefined ? count : 0;

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
        <Diver />
        <Count title="누적 방문 횟수">{displayCount}회 방문</Count>
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
  width: 70%;
  height: 7.5rem;
  margin: 0.75rem auto;
  cursor: pointer;
`;
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-left: 1.25rem;
`;
const Location = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: #969698;
  margin: 0;
`;

const Name = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #2e2e32;
  margin: 0;
`;
const Diver = styled.div`
  width: 0.09375rem;
  height: 1.25rem;
  background-color: #aaa;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Gender = styled.span`
  font-size: 1.25rem;
  color: #2e2e32;
`;
const Birthday = styled.span`
  font-size: 1.25rem;
  color: #2e2e32;
`;

const PhoneNumber = styled.span`
  font-size: 1.25rem;
  color: #2e2e32;
`;

const Count = styled.div`
  font-size: 1.25rem;
  color: #2e2e32;
`;
