import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaClock } from 'react-icons/fa6';

interface VisitTimePickerProps {
  value: string; // "HH:mm"
  onChange: (time: string) => void;
  label?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const pad = (n: number) => String(n).padStart(2, '0');

const VisitTimePicker = ({
  value,
  onChange,
  label = '방문시간',
}: VisitTimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('PM');
  const [hour, setHour] = useState(5);
  const [minute, setMinute] = useState(25);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value) return;

    const [h, m] = value.split(':').map(Number);
    const isPM = h >= 12;

    setAmpm(isPM ? 'PM' : 'AM');
    setHour(h === 0 ? 12 : h > 12 ? h - 12 : h);
    setMinute(m);
  }, []);

  const get24Hour = () => {
    let h24 = hour % 12;
    if (ampm === 'PM') h24 += 12;
    if (ampm === 'AM' && hour === 12) h24 = 0;
    return h24;
  };

  useEffect(() => {
    const h24 = get24Hour();
    onChange(`${pad(h24)}:${pad(minute)}`);
  }, [ampm, hour, minute]);

  const handleHourScroll = () => {
    if (!hourRef.current) return;
    const scrollTop = hourRef.current.scrollTop;
    const index = Math.round(scrollTop / 48);
    if (HOURS[index] !== undefined) {
      setHour(HOURS[index]);
    }
  };

  const handleMinuteScroll = () => {
    if (!minuteRef.current) return;
    const scrollTop = minuteRef.current.scrollTop;
    const index = Math.round(scrollTop / 48);
    if (MINUTES[index] !== undefined) {
      setMinute(MINUTES[index]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        const hourIndex = HOURS.indexOf(hour);
        const minuteIndex = minute;

        if (hourRef.current && hourIndex >= 0) {
          hourRef.current.scrollTop = hourIndex * 48;
        }
        if (minuteRef.current) {
          minuteRef.current.scrollTop = minuteIndex * 48;
        }
      });
    }
  }, [isOpen]);

  const displayTime = `${pad(get24Hour())}:${pad(minute)}`;

  return (
    <Container>
      <Label>{label}</Label>

      <InputContainer onClick={() => setIsOpen(p => !p)}>
        <IconBox><FaClock size={20} color="#666" /></IconBox>
        <DisplayText>{displayTime}</DisplayText>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </InputContainer>


      {isOpen && (
        <PickerBox>
          <PickerContent>
            <PickerBody>
              {/* 오전/오후 */}
              <AmPmColumn>
                <AmPmItem
                  selected={ampm === 'AM'}
                  onClick={() => setAmpm('AM')}
                >
                  오전
                </AmPmItem>
                <AmPmItem
                  selected={ampm === 'PM'}
                  onClick={() => setAmpm('PM')}
                >
                  오후
                </AmPmItem>
              </AmPmColumn>

              {/* 시 */}
              <ColumnWithHeader>
                <HeaderCell>시</HeaderCell>
                <ScrollColumn
                  ref={hourRef}
                  onScroll={handleHourScroll}
                >
                  <ScrollPadding />
                  {HOURS.map((h) => (
                    <ScrollItem key={h} selected={hour === h}>
                      {h}
                    </ScrollItem>
                  ))}
                  <ScrollPadding />
                </ScrollColumn>
              </ColumnWithHeader>

              {/* 분 */}
              <ColumnWithHeader>
                <HeaderCell>분</HeaderCell>
                <ScrollColumn
                  ref={minuteRef}
                  onScroll={handleMinuteScroll}
                >
                  <ScrollPadding />
                  {MINUTES.map((m) => (
                    <ScrollItem key={m} selected={minute === m}>
                      {m}
                    </ScrollItem>
                  ))}
                  <ScrollPadding />
                </ScrollColumn>
              </ColumnWithHeader>
            </PickerBody>
          </PickerContent>
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
  color: #2e2e32;
  font-weight: 500;
`;

const InputContainer = styled.div`
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
  cursor: pointer;
`;

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const DisplayText = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: #2e2e32;
`;

const PickerBox = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  width: 880px;
  height: 380px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
`;

const PickerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
  box-sizing: border-box;
`;

const PickerBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 92px;
`;

const ColumnWithHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderCell = styled.div`
  width: 21px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: #666;
  margin-bottom: 10px;
`;

const AmPmColumn = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const AmPmItem = styled.div<{ selected: boolean }>`
  text-align: center;
  font-size: ${({ selected }) => (selected ? '1.5rem' : '1.25rem')};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  color: ${({ selected }) => (selected ? '#000' : '#bbb')};
  cursor: pointer;
  padding: 12px 24px;
  transition: all 0.15s;

  &:hover {
    color: #333;
  }
`;

const ScrollColumn = styled.div`
  width: 80px;
  height: 180px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
