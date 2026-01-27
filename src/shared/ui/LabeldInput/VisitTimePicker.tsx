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

  // 24시간 형식으로 변환
  const get24Hour = () => {
    let h24 = hour % 12;
    if (ampm === 'PM') h24 += 12;
    if (ampm === 'AM' && hour === 12) h24 = 0;
    return h24;
  };

  // 상태가 변경되면 value 업데이트
  useEffect(() => {
    const h24 = get24Hour();
    onChange(`${pad(h24)}:${pad(minute)}`);
  }, [ampm, hour, minute]);

  // 스크롤 시 선택 업데이트
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

  // 열릴 때 스크롤 위치 설정
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

  // 24시간 형식으로 표시 (예: 17:20)
  const displayTime = `${pad(get24Hour())}:${pad(minute)}`;

  return (
    <Container>
      <Label>{label}</Label>

      <InputContainer onClick={() => setIsOpen((p) => !p)}>
        <FaClock size={18} color="#666" />
        <DisplayText>{displayTime}</DisplayText>
        {isOpen ? <IoIosArrowUp color="#666" /> : <IoIosArrowDown color="#666" />}
      </InputContainer>

      {isOpen && (
        <PickerBox>
          <PickerContent>
            {/* 헤더 */}
            <PickerHeader>
              <HeaderSpacer />
              <HeaderCell>시</HeaderCell>
              <HeaderCell>분</HeaderCell>
            </PickerHeader>

            <Divider />

            {/* 선택 영역 */}
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

              {/* 분 */}
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
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: 3.25rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  cursor: pointer;
  background: #fff;

  &:hover {
    border-color: #aaa;
  }
`;

const DisplayText = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #333;
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
  padding: 2rem 3rem;
  box-sizing: border-box;
`;

const PickerHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
`;

const HeaderSpacer = styled.div`
  width: 120px;
  margin-right: 92px;
`;

const HeaderCell = styled.div`
  width: 80px;
  text-align: center;
  font-size: 1rem;
  color: #666;
  margin: 0 46px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
  margin-bottom: 1.5rem;
`;

const PickerBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 92px;
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
