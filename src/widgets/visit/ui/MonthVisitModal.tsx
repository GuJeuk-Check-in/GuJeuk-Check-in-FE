import styled from '@emotion/styled';
import closeButton from '@shared/assets/btn_left-arrow_default.png';
import { DetailMonthVisitButton } from '@shared/ui/Button/DetailMonthVisitButton';
import { MonthVisitCard } from '@shared/ui/Crad/MonthVisitCard';
import { useState } from 'react';
import { useMonthVisitList } from '@features/visit/month-visit-list';
import arrowRight from '@shared/assets/btn_right-arrow_default.png';

interface MonthVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMonthForList?: (year: number, month: number) => void;
}

export const MonthVisitModal = ({
  isOpen,
  onClose,
  onSelectMonthForList,
}: MonthVisitModalProps) => {
  const [year, setYear] = useState(new Date().getFullYear());

  const monthsInfo = useMonthVisitList(year, { enabled: isOpen });

  const handlePrevYear = () => setYear(year => year - 1);
  const handleNextYear = () => setYear(year => year + 1);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButtonBox onClick={onClose}>
          <img src={closeButton} style={{ width: '2rem', height: '2rem' }} />
        </CloseButtonBox>
        <DateHeader>
          <PrevYearButton onClick={handlePrevYear}>
            <img src={arrowRight} />
          </PrevYearButton>
          <DateHeaderTitle>
            {year}
          </DateHeaderTitle>
          <NextYearButton onClick={handleNextYear}>
            <img src={arrowRight} />
          </NextYearButton>
        </DateHeader>
        <MonthVisitCardList>
          {monthsInfo.monthVisitCounts.map((month) => (
            <MonthVisitCard key={month.month} month={month.month} visitors={month.visitorCount}>
              <DetailMonthVisitButton
                onClick={() => {
                  onSelectMonthForList?.(year, month.month);
                  onClose();
                }}
                pressable={new Date(year, month.month - 1, 1) <= new Date()}
              />
            </MonthVisitCard>
          ))}
        </MonthVisitCardList>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 70rem;
  height: 60rem;
  max-width: 90%;
  max-height: 90%;
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 1.25rem;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
`;

const CloseButtonBox = styled.div`
  position: absolute;
  cursor: pointer;
  padding: 1.75rem;
  left: 0;
  top: 0;
`

const MonthVisitCardList = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(4, 1fr);
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4rem;
`

const DateHeaderTitle = styled.span`
  font-size: 28px;
  font-weight: 500;
  color: #2E2E32;
`

const NextYearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background: none;
  border: none;
`

const PrevYearButton = styled(NextYearButton)`
  rotate: 180deg;
`