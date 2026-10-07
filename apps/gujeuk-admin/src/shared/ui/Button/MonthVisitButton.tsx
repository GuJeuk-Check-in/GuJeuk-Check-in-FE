import styled from '@emotion/styled';
import monthVisit from '@shared/assets/icon_month-visit_default.png';

interface MonthVisitButtonProps {
  onClick: () => void;
}

export const MonthVisitButton = ({ onClick }: MonthVisitButtonProps) => {
  return (
    <Button onClick={onClick}>
      <Icon src={monthVisit} alt="" aria-hidden="true" />
      <Text>월별 이용기록</Text>
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 100%;
  padding: 0.875rem 1.25rem 0.875rem 2rem;
  background-color: #ffffff;
  border-radius: 1rem;
  justify-self: flex-end;
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 48rem) {
    width: 100%;
  }
`;

const Icon = styled.img`
  flex-shrink: 0;
`;

const Text = styled.span`
  color: #2e2e32;
  font-size: clamp(1.125rem, 2.2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.2;
  white-space: nowrap;
`;
