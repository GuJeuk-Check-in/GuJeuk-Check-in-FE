import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaClock } from 'react-icons/fa6';

interface VisitTimePickerProps {
  value: string;             
  onChange: (time: string) => void;
  label?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1); // 1~12
const MINUTES = Array.from({ length: 60 }, (_, i) => i);  // 0~59

const pad = (n: number) => String(n).padStart(2, '0');

const VisitTimePicker = ({
  value,
  onChange,
  label = '방문 시간',
}: VisitTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('PM');
  const [hour, setHour] = useState(5);
  const [minute, setMinute] = useState(25);

  useEffect(() => {
    if (!value) return;

    const [h, m] = value.split(':').map(Number);
    const isPM = h >= 12;

    setAmpm(isPM ? 'PM' : 'AM');
    setHour(isPM ? h - 12 || 12 : h);
    setMinute(m);
  }, [value]);

  const emitChange = (
    nextAmpm = ampm,
    nextHour = hour,
    nextMinute = minute
  ) => {
    let h24 = nextHour % 12;
    if (nextAmpm === 'PM') h24 += 12;

    onChange(`${pad(h24)}:${pad(nextMinute)}`);
  };

  return (
    <Container>
      <Label>{label}</Label>

      <InputContainer onClick={() => setIsOpen((p) => !p)}>
        <FaClock size={22} />
        <Input readOnly value={value || '시간을 선택해주세요'} />
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </InputContainer>

      {isOpen && (
        <PickerBox>
          <Column>
            <Header />
            {['AM', 'PM'].map((v) => (
              <Item
                key={v}
                active={ampm === v}
                onClick={() => {
                  setAmpm(v as 'AM' | 'PM');
                  emitChange(v as 'AM' | 'PM');
                }}
              >
                {v === 'AM' ? '오전' : '오후'}
              </Item>
            ))}
          </Column>

          <Column>
            <Header>시</Header>
            {HOURS.map((h) => (
              <Item
                key={h}
                active={hour === h}
                onClick={() => {
                  setHour(h);
                  emitChange(undefined, h);
                }}
              >
                {h}
              </Item>
            ))}
          </Column>

          <Column>
            <Header>분</Header>
            {MINUTES.map((m) => (
              <Item
                key={m}
                active={minute === m}
                onClick={() => {
                  setMinute(m);
                  emitChange(undefined, undefined, m);
                }}
              >
                {pad(m)}
              </Item>
            ))}
          </Column>
        </PickerBox>
      )}
    </Container>
  );
};

export default VisitTimePicker;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.25rem;
  font-weight: 500;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.5rem;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  background: transparent;
`;

const PickerBox = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 100%;
  background: white;
  border-radius: 0.75rem;
  display: flex;
  padding: 1.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  z-index: 20;
`;

const Column = styled.div`
  flex: 1;
  text-align: center;
`;

const Header = styled.div`
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const Item = styled.div<{ active: boolean }>`
  padding: 0.5rem 0;
  cursor: pointer;
  color: ${({ active }) => (active ? '#000' : '#888')};
  font-weight: ${({ active }) => (active ? 700 : 400)};
`;
