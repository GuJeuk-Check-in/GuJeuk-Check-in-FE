import { useState, type ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { FaClock } from 'react-icons/fa6';

interface VisitTimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
}

<<<<<<< HEAD
const VisitTimePicker = ({
=======
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const pad = (n: number) => String(n).padStart(2, '0');

export const VisitTimePicker = ({
>>>>>>> 4da692d (chore :: import 경로 변경)
  value,
  onChange,
  label = '방문시간',
}: VisitTimePickerProps) => {
  const [error, setError] = useState<string>('');

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        <IconBox>
          <FaClock size={20} color="#2E2E32" />
        </IconBox>
        <Input
          type="text"
          value={value}
          onChange={handleTimeChange}
          placeholder="방문 시간을 입력해주세요 ex) 14:30"
        />
      </InputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.25rem;
  color: #2e2e32;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.5rem;
  border: 0.0625rem solid #404040;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  color: #2e2e32;
  background-color: #ffffff;
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  color: #2e2e32;
  background-color: transparent;

  &::placeholder {
    color: #999;
  }
`;

const ErrorText = styled.span`
  font-size: 0.875rem;
  color: #d32f2f;
`;
<<<<<<< HEAD
=======

const ScrollPadding = styled.div`
  height: 66px;
`;

const ScrollItem = styled.div<{ selected: boolean }>`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  font-size: ${({ selected }) => (selected ? '1.5rem' : '1.25rem')};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  color: ${({ selected }) => (selected ? '#000' : '#bbb')};
  cursor: pointer;
  transition: all 0.15s;
`;
>>>>>>> 4da692d (chore :: import 경로 변경)
