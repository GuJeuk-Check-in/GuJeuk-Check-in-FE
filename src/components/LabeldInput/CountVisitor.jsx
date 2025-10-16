import styled from '@emotion/styled';
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';

const CountVisitor = ({ label, value, onChange }) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Counter>
        <Button onClick={handleDecrement} disabled={value === 0}>
          <FaMinus />
        </Button>
        <Value>{value}</Value>
        <Button onClick={handleIncrement}>
          <FaPlus />
        </Button>
      </Counter>
    </Container>
  );
};

export default CountVisitor;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 49%;
  height: auto;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 20px;
  color: #2e2e32;
  font-weight: 500;
`;

const Counter = styled.div`
  height: 56px;
  font-size: 20px;
  color: #2e2e32;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border: 1px solid #404040;
  border-radius: 8px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  background-color: white;
  font-size: 20px;
  color: #404040;
  cursor: pointer;
`;

const Value = styled.span`
  font-size: 20px;
  text-align: center;
`;
