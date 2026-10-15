import styled from '@emotion/styled';

interface MonthVisitCardProps {
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  visitors: number;
  children: React.ReactNode;
}

export const MonthVisitCard = ({ month, visitors, children }: MonthVisitCardProps) => {
  return (
    <Container>
      <Title>{month}월</Title>
      <Visitors>이용횟수: {visitors}명</Visitors>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 10rem;
  @media (min-height: 1090px) {
    height: 12rem;
  }
  padding: 1.4rem;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 500;
  color: #2E2E32;
`

const Visitors = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #2E2E32;
  padding: 1.6rem 0 1rem;
`;