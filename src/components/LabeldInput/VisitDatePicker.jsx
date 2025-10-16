import { useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { FaCalendarDays } from 'react-icons/fa6';
import 'react-calendar/dist/Calendar.css';

const VisitDatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date) => {
    onChange(date.toISOString());
    setIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };
  return (
    <Container>
      <Label>방문 날짜</Label>
      <InputContainer onClick={() => setIsOpen((prev) => !prev)}>
        <FaCalendarDays size={24} color="#2e2e32" />
        <Input
          type="text"
          value={value ? formatDate(new Date(value)) : ''}
          placeholder="방문 날짜를 선택해주세요."
          readOnly
        />
      </InputContainer>
      {isOpen && (
        <CalendarWrapper>
          <StyledCalendar
            onChange={handleDateSelect}
            value={value ? new Date(value) : new Date()}
            calendarType="gregory"
            locale="ko-KR"
            nextLabel="›"
            prevLabel="‹"
            formatDay={(locale, date) => date.getDate()}
          />
        </CalendarWrapper>
      )}
    </Container>
  );
};

export default VisitDatePicker;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 20px;
  color: #2e2e32;
  font-weight: 500;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  height: 56px;
  border: 1px solid #404040;
  border-radius: 8px;
  font-size: 20px;
  color: #2e2e32;
  background-color: #ffffff;
  cursor: pointer;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 20px;
  color: #2e2e32;
  background: transparent;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  width: 100%;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  z-index: 10;
  padding: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  width: 100%;

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .react-calendar__navigation button {
    color: #000000;
    font-size: 18px;
    min-width: 44px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 500;
    margin-bottom: 6px;
  }

  .react-calendar__tile {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50%;
    font-size: 18px;
    background: none;
    border: none;
    margin-bottom: 4px;
    cursor: pointer;
  }

  .react-calendar__tile--active {
    width: 40px !important;
    height: 40px !important;
    display: block;
    background: #2762aa;
    color: white;
    border-radius: 50%;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d88282;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #6a6a6a;
  }
`;
