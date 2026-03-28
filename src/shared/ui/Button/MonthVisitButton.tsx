import styled from '@emotion/styled';
import monthVisit from '@shared/assets/icon_month-visit_default.png';

interface MonthVisitButtonProps {
  onClick: () => void;
}

export const MonthVisitButton = ({ onClick }: MonthVisitButtonProps) => {
  return (
    <Button onClick={onClick}>
      <img src={monthVisit} />
      <Text>월별 이용기록</Text>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.25rem 0.875rem 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  justify-self: flex-end;
  cursor: pointer;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 1.5rem;
  color: #2E2E32;
`;
