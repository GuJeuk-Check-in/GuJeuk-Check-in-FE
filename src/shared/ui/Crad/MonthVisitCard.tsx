import styled from '@emotion/styled';
import { MonthVisitButton } from '../Button/MonthVisitButton';

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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.75rem;
  border-radius: 1.25rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
`;

const Title = styled.span`
  font-size: 28px;
  font-weight: 500;
  color: #2E2E32;
`

const Visitors = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #2E2E32;
  padding: 2rem 0 1.25rem;
`;