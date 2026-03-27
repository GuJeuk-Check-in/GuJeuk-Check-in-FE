import styled from '@emotion/styled';

interface DetailMonthVisitButtonProps {
  onClick: () => void;
  pressable: boolean;
}

export const DetailMonthVisitButton = ({ onClick, pressable }: DetailMonthVisitButtonProps) => {
  return (
    <Button onClick={onClick} $pressable={pressable}>상세보기</Button>
  );
};

const Button = styled.button<{ $pressable: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 11rem;
  height: 3.5rem;
  background-color: #ffffff;
  border-radius: 1.25rem;
  cursor: pointer;
  color: ${({ $pressable }) => $pressable ? '#2ABFEC' : '#AAE5F7'};
  border: 1px solid ${({ $pressable }) => $pressable ? '#2ABFEC' : '#D4F2FB'};
  font-size: 24px;
  font-weight: 400;
`;