import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaClock } from 'react-icons/fa6';

interface VisitTimePickerProps {
  value: string; // "HH:mm"
  onChange: (time: string) => void;
  label?: string;
}

const AMPM = ['AM', 'PM'] as const;
const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const ITEM_HEIGHT = 44;
const VISIBLE_COUNT = 3;

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

  const ampmRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) return;
    const [h, m] = value.split(':').map(Number);
    const isPM = h >= 12;
    setAmpm(isPM ? 'PM' : 'AM');
    setHour(isPM ? h - 12 || 12 : h);
    setMinute(m);
  }, [value]);

  useEffect(() => {
    let h24 = hour % 12;
    if (ampm === 'PM') h24 += 12;
    onChange(`${pad(h24)}:${pad(minute)}`);
  }, [ampm, hour, minute]);

  const handleScroll = <T,>(
    e: React.UIEvent<HTMLDivElement>,
    list: readonly T[],
    setter: (v: T) => void
  ) => {
    const index = Math.round(e.currentTarget.scrollTop / ITEM_HEIGHT);
    if (list[index] !== undefined) setter(list[index]);
  };

  return (
    <Container>
      <Label>{label}</Label>

      <InputContainer onClick={() => setIsOpen(p => !p)}>
        <FaClock size={22} />
        <Input readOnly value={value || '시간을 선택해주세요'} />
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </InputContainer>

      {isOpen && (
        <PickerBox>
          <Wheel
            ref={ampmRef}
            onScroll={(e) => handleScroll(e, AMPM, setAmpm)}
          >
            {AMPM.map(v => (
              <WheelItem key={v} active={ampm === v}>
                {v === 'AM' ? '오전' : '오후'}
              </WheelItem>
            ))}
          </Wheel>

          <Wheel
            ref={hourRef}
            onScroll={(e) => handleScroll(e, HOURS, setHour)}
          >
            {HOURS.map(h => (
              <WheelItem key={h} active={hour === h}>
                {h}
              </WheelItem>
            ))}
          </Wheel>

          <Wheel
            ref={minuteRef}
            onScroll={(e) => handleScroll(e, MINUTES, setMinute)}
          >
            {MINUTES.map(m => (
              <WheelItem key={m} active={minute === m}>
                {pad(m)}
              </WheelItem>
            ))}
          </Wheel>

          <CenterHighlight />
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
  width: 100%;
  margin-top: 0.5rem;
  background: white;
  border-radius: 0.75rem;
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
  box-shadow: 0 0.25rem 0.75rem rgba(0,0,0,0.1);
  z-index: 20;
`;

const Wheel = styled.div`
  height: ${ITEM_HEIGHT * VISIBLE_COUNT}px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  text-align: center;
  width: 33%;
`;

const WheelItem = styled.div<{ active: boolean }>`
  height: ${ITEM_HEIGHT}px;
  line-height: ${ITEM_HEIGHT}px;
  scroll-snap-align: center;
  font-size: ${({ active }) => (active ? '1.25rem' : '1rem')};
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${({ active }) => (active ? '#000' : '#aaa')};
`;

const CenterHighlight = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: ${ITEM_HEIGHT}px;
  transform: translateY(-50%);
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  pointer-events: none;
`;