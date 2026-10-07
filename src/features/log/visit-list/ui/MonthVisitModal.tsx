/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 연도별 월간 방문자 수를 모달로 표시하고, 선택한 연도와 월을 상세 목록 조회에 전달한다.
*/

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import closeButton from '@shared/assets/btn_left-arrow_default.png';
import arrowRight from '@shared/assets/btn_right-arrow_default.png';
import { DetailMonthVisitButton } from '@shared/ui/Button/DetailMonthVisitButton';
import { MonthVisitCard } from '@shared/ui/Crad/MonthVisitCard';
import { useMonthVisitList } from '../model/useMonthVisitList';
import { useDialogFocusTrap } from '@shared/hooks/useDialogFocusTrap';

interface MonthVisitModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectMonthForList?: (year: number, month: number) => void;
}

export const MonthVisitModal = ({
  isOpen,
  onClose,
  onSelectMonthForList,
}: MonthVisitModalProps) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const dialogRef = useDialogFocusTrap(isOpen);

  const monthsInfo = useMonthVisitList(year, { enabled: isOpen });

  const handlePrevYear = () => setYear((currentYear) => currentYear - 1);
  const handleNextYear = () => setYear((currentYear) => currentYear + 1);
  //기능: 모달이 열려 있을 때 Escape 키로 닫을 수 있도록 하고, 종료 시 이벤트를 정리한다.

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  //기능: 배경을 클릭하면 모달을 닫고, 모달 내부 클릭은 배경으로 전달되지 않게 한다.

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="month-visit-title"
      onClick={onClose}
    >
      <Container ref={dialogRef} tabIndex={-1} onClick={(event) => event.stopPropagation()}>
        <CloseButtonBox type="button" onClick={onClose} aria-label="닫기">
          <img src={closeButton} alt="" style={{ width: '2rem', height: '2rem' }} />
        </CloseButtonBox>
        <DateHeader>
          <PrevYearButton type="button" onClick={handlePrevYear} aria-label="이전 연도">
            <img src={arrowRight} alt="" />
          </PrevYearButton>
          <DateHeaderTitle id="month-visit-title">{year}</DateHeaderTitle>
          <NextYearButton type="button" onClick={handleNextYear} aria-label="다음 연도">
            <img src={arrowRight} alt="" />
          </NextYearButton>
        </DateHeader>
        <MonthVisitCardList>
          {monthsInfo.monthVisitCounts.map((month) => (
            <MonthVisitCard
              key={month.month}
              month={month.month}
              visitors={month.visitorCount}
            >
              <DetailMonthVisitButton
                onClick={() => {
                  onSelectMonthForList?.(year, month.month);
                  onClose();
                //기능: 현재 달과 과거 달만 상세 조회 버튼을 누를 수 있도록 설정한다.
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
//기능: 모달 배경, 창, 버튼, 연도의 스타일을 설정하고, 화면 크기에 따라 모달 크기와 월별 카드 배치를 조정한다.

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

  @media (max-width: 48rem) {
    width: calc(100% - 2rem);
    height: auto;
    padding: 3.5rem 1rem 1.5rem;
  }
`;

const CloseButtonBox = styled.button`
  position: absolute;
  cursor: pointer;
  padding: 1.75rem;
  left: 0;
  top: 0;
  border: none;
  background: transparent;
`;

const MonthVisitCardList = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 48rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  @media (max-width: 30rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const DateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4rem;

  @media (max-width: 48rem) {
    gap: 1rem;
  }
`;

const DateHeaderTitle = styled.span`
  font-size: 28px;
  font-weight: 500;
  color: #2e2e32;
`;

const NextYearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background: none;
  border: none;

  @media (max-width: 30rem) {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const PrevYearButton = styled(NextYearButton)`
  rotate: 180deg;
`;
