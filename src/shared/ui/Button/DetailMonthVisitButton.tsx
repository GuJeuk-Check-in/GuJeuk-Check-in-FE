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
  width: 8.8rem;
  height: 2.8rem;
  background-color: #ffffff;
  border-radius: 1rem;
  cursor: ${({ $pressable }) => $pressable ? 'pointer' : 'not-allowed'};
  pointer-events: ${({ $pressable }) => $pressable ? 'auto' : 'none'};
  color: ${({ $pressable }) => $pressable ? '#2ABFEC' : '#AAE5F7'};
  border: 1px solid ${({ $pressable }) => $pressable ? '#2ABFEC' : '#D4F2FB'};
  font-size: 19.2px;
  font-weight: 400;
`;