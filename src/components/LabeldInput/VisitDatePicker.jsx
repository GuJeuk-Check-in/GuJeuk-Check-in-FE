import { useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { FaCalendarDays } from 'react-icons/fa6';
import 'react-calendar/dist/Calendar.css';

const formatDateToISOString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년${month}월${day}일`;
};

const safeDateConvert = (dateString) => {
  if (!dateString) return null;

  if (dateString instanceof Date) return dateString;

  let standardDateString = dateString;

  if (typeof dateString === 'string') {
    const numbersOnly = dateString.replace(/[^\d]/g, '');

    if (numbersOnly.length === 8) {
      standardDateString = numbersOnly.replace(
        /(\d{4})(\d{2})(\d{2})/,
        '$1-$2-$3'
      );
    } else {
      standardDateString = dateString
        .replace('년', '-')
        .replace('월', '-')
        .replace('일', '')
        .replace(/\s/g, '');
    }
  }

  const date = new Date(standardDateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date string provided:', dateString);
    return null;
  }
  return date;
};

const VisitDatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date) => {
    const formattedDate = formatDateToISOString(date);
    onChange(formattedDate);
    setIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const dateObject = safeDateConvert(value);

  return (
    <Container>
      <Label>방문 날짜</Label>
      <InputContainer onClick={() => setIsOpen((prev) => !prev)}>
        <FaCalendarDays size={24} color="#2e2e32" />
        <Input
          type="text"
          value={dateObject ? formatDate(dateObject) : ''}
          placeholder="방문 날짜를 선택해주세요."
          readOnly
        />
      </InputContainer>
      {isOpen && (
        <CalendarWrapper>
          <StyledCalendar
            onChange={handleDateSelect}
            value={dateObject || new Date()}
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

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1.25rem;
  color: #2e2e32;
  background: transparent;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 100%;
  background: white;
  border: 0.0625rem solid #dcdcdc;
  border-radius: 0.75rem;
  z-index: 10;
  padding: 1.25rem;
  box-shadow: 0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
`;
const StyledCalendar = styled(Calendar)`
  border: none;
  width: 100%;

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .react-calendar__navigation button {
    color: #000000;
    font-size: 1.125rem;
    min-width: 2.75rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.375rem;
  }

  .react-calendar__tile {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50%;
    font-size: 1.125rem;
    background: none;
    border: none;
    margin-bottom: 0.25rem;
    cursor: pointer;
  }

  .react-calendar__tile--active {
    width: 2.5rem !important;
    height: 2.5rem !important;
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
