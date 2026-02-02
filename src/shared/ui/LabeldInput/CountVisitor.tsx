import styled from '@emotion/styled';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

interface CountVisitorProps {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
}

const CountVisitor = ({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
}: CountVisitorProps) => {
  const [inputValue, setInputValue] = useState<string>(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleIncrement = () => {
    const next = Math.min(value + 1, max);
    onChange(next);
  };

  const handleDecrement = () => {
    const next = Math.max(value - 1, min);
    onChange(next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (!/^\d*$/.test(raw)) return;

    setInputValue(raw);
  };

  const commitInput = () => {
    const num = Number(inputValue);

    if (Number.isNaN(num)) {
      setInputValue(String(value));
      return;
    }

    const clamped = Math.min(Math.max(num, min), max);
    onChange(clamped);
    setInputValue(String(clamped));
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Counter>
        <Button onClick={handleDecrement} disabled={value <= min}>
          <FaMinus />
        </Button>

        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={commitInput}
          onKeyDown={(e) => e.key === 'Enter' && commitInput()}
        />

        <Button onClick={handleIncrement} disabled={value >= max}>
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
  gap: 0.5rem;
  width: 49%;
  height: auto;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const Counter = styled.div`
  height: 3.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 1.25rem;
  color: #404040;
  cursor: pointer;
`;

const Input = styled.input`
  width: 3rem;
  text-align: center;
  font-size: 1.25rem;
  border: none;
  outline: none;
  background: transparent;
  color: #2e2e32;
`;
