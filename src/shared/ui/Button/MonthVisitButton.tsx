import styled from '@emotion/styled';
import monthVisit from '@shared/assets/icon_month-visit_default.png';

interface MonthVisitButtonProps {
  onClick: () => void;
}

export const MonthVisitButton = ({ onClick }: MonthVisitButtonProps) => {
  return (
    <Button onClick={onClick}>
      <img src={monthVisit} />
      <Text>월간 이용기록</Text>
    </Button>
  );
};

const Button = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 14px 20px 14px 32px;
  background-color: #ffffff;
  border-radius: 16px;
  justify-self: flex-end;
`

const Text = styled.span`
  font-weight: 400;
  font-size: 24px;
  color: #2E2E32;
`