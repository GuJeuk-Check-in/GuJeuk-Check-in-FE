import { useNavigate } from 'react-router-dom';
import { ExcelButton, HeaderButton } from '@shared/ui/Button/index';
import { Logo } from '@shared/assets';
import styled from '@emotion/styled';
import { useState } from 'react';
import {
  DateExportModal,
  useVisitListExportExcel,
} from '@features/log/export-excel';
import { Modal } from '@shared/ui/modal/Modal';
import { useModal } from '@shared/hooks/useModal';
import { useUserListExportExcel } from '@features/user/export-excel';
import {
  OperationStatusPreviewModal,
  type OperationStatusPreviewData,
  useFacilityUsageReport,
  useVisitPerformanceReport,
} from '@features/log/performance-report';

type ReportPeriod = {
  readonly year: number;
  readonly month: number;
};

const createDefaultReportPeriod = (): ReportPeriod => { // 현재 날짜를 기준으로 기본 보고 기간을 생성하는 함수
  const currentDate = new Date();

  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  };
};

export const AdminHeader = () => { // 관리자 헤더 컴포넌트
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 기능을 제공
  const [isModalOpen, setIsModalOpen] = useState(false); // 엑셀 내보내기 모달의 열림 상태를 관리하는 상태 변수
  const [operationPreviewData, setOperationPreviewData] = // 한글 파일 미리보기 데이터를 관리하는 상태 변수
    useState<OperationStatusPreviewData | null>(null); // 초기값은 null로 설정
  const [selectedReportPeriod, setSelectedReportPeriod] = useState( // 보고 기간을 관리하는 상태 변수 
    createDefaultReportPeriod
  );
  const [performanceExportingDate, setPerformanceExportingDate] = useState(''); // 현재 보고 기간을 문자열로 관리하는 상태 변수
  const modal = useModal();

  const { mutate: visitExcelMutate, isPending: isVisitExporting } = // useVisitListExportExcel 훅을 사용하여 방문 엑셀 내보내기 기능을 구현
    useVisitListExportExcel(modal);
  const { mutate: userExcelMutate, isPending: isUserExporting } = // useUserListExportExcel 훅을 사용하여 사용자리스트 엑셀 내보내기 기능을 구현
    useUserListExportExcel(modal);
  const {
    mutateAsync: fetchPerformanceReport, // useVisitPerformanceReport 훅을 사용하여 월별 실적 데이터를 가져오는 기능을 구현
    isPending: isPerformanceLoading,
  } = useVisitPerformanceReport(modal);
  const {
    mutateAsync: fetchFacilityUsageReport, // useFacilityUsageReport 훅을 사용하여 시설 이용률 데이터를 가져오는 기능을 구현
    isPending: isFacilityUsageLoading,
  } = useFacilityUsageReport(modal);

  const isOperationPreviewInitialLoading =
    (isPerformanceLoading || isFacilityUsageLoading) && !operationPreviewData; // 한글 파일 미리보기 데이터를 불러오는 중인지 여부를 나타내는 상태 변수

  const handleVisitListExcelExportClick = () => { // 방문 엑셀 내보내기 버튼 클릭 시 호출되는 함수
    setIsModalOpen(true);
  };
  const handleUserListExcelExportClick = () => { // 사용자리스트 엑셀 내보내기 버튼 클릭 시 호출되는 함수
    userExcelMutate();
  };

  const ignoreHandledRequestError = (error: unknown) => { // 이미 처리된 요청 에러를 무시하는 함수
    if (error instanceof Error) {
      return;
    }

    throw error; // 처리되지 않은 에러는 다시 던져서 상위에서 처리하도록 함
  };

  const openOperationStatusPreview = async (month: number) => { // 한글 파일 미리보기 버튼 클릭 시 호출되는 함수
    const currentReportPeriod = createDefaultReportPeriod(); // 현재 날짜를 기준으로 보고 기간을 생성
    const dataString = `${currentReportPeriod.year}-${month}`; // 보고 기간을 문자열로 변환하여 상태 변수에 저장
    setPerformanceExportingDate(dataString);

    try { // Promise.all을 사용하여 월별 실적 데이터와 시설 이용률 데이터를 동시에 가져옴
      const [performance, facilityUsage] = await Promise.all([
        fetchPerformanceReport({ year: currentReportPeriod.year, month }),
        fetchFacilityUsageReport({ year: currentReportPeriod.year }),
      ]);

      setSelectedReportPeriod({ year: currentReportPeriod.year, month });
      setOperationPreviewData({ performance, facilityUsage });
    } catch (error) { // 에러 발생 시 이미 처리된 요청 에러인지 확인하고, 처리되지 않은 에러는 다시 던져서 상위에서 처리하도록 함
      ignoreHandledRequestError(error);
    } finally {
      setPerformanceExportingDate(''); // 요청이 완료되면 performanceExportingDate 상태 변수를 초기화
    }
  };

  const handleOperationStatusPreviewClick = () => {
    void openOperationStatusPreview(selectedReportPeriod.month); // 한글 파일 미리보기 버튼 클릭 시 현재 보고 기간의 월을 기준으로 openOperationStatusPreview 함수를 호출
  };

  const handleReportMonthChange = async (month: number) => {
    const dataString = `${selectedReportPeriod.year}-${month}`;
    setPerformanceExportingDate(dataString);

    try { // Promise.all을 사용하여 월별 실적 데이터를 가져옴
      const performance = await fetchPerformanceReport({
        year: selectedReportPeriod.year,
        month,
      });

      setSelectedReportPeriod((currentPeriod) => ({ // 현재 보고 기간의 연도와 선택된 월을 기준으로 selectedReportPeriod 상태 변수를 업데이트
        ...currentPeriod,
        month,
      }));
      setOperationPreviewData((currentData) => { // 현재 operationPreviewData 상태 변수를 업데이트하여 새로운 월별 실적 데이터를 반영 
        if (!currentData) {
          return currentData;
        }

        return { // 현재 operationPreviewData 상태 변수를 업데이트하여 새로운 월별 실적 데이터를 반영
          ...currentData,
          performance,
        };
      });
    } catch (error) { // 에러 발생 시 이미 처리된 요청 에러인지 확인하고, 처리되지 않은 에러는 다시 던져서 상위에서 처리하도록 함
      ignoreHandledRequestError(error);
    } finally { // 요청이 완료되면 performanceExportingDate 상태 변수를 초기화
      setPerformanceExportingDate('');
    }
  };

  const handleExportConfirmedWithDate = (year, month) => {// 엑셀 내보내기 모달에서 확인 버튼 클릭 시 호출되는 함수
    visitExcelMutate({ year, month });

    setIsModalOpen(false);
  };

  const getExportingPeriodMessage = (dateString: string) => { // 현재 보고 기간을 문자열로 변환하여 사용자에게 보여줄 메시지를 반환하는 함수
    if (!dateString) return '전체 기간';

    const parts = dateString.split('-'); // 문자열을 '-' 기준으로 분리하여 연도와 월을 추출
    if (parts.length === 2) {
      return `기간: ${parts[0]}년 ${parts[1]}월`;
    }

    return dateString;
  };

  return (
    <Container>
      <LogoImage
        src={Logo}
        alt="로고 이미지"
        onClick={() => navigate('/log')}
      />
      <ButtonWrapper>
        <HeaderButton onClick={() => navigate('/log')}>
          시설 이용 목록 조회
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/purpose/all')}>
          방문 목적 커스텀
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/organ/user/all')}>
          회원 목록 조회
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/log/create')}>
          시설 이용 기록 추가
        </HeaderButton>
        <HeaderButton onClick={() => navigate('/residence/all')}>
          거주지 커스텀
        </HeaderButton>
        <ExcelButton
          onClick={handleVisitListExcelExportClick}
          disabled={isVisitExporting}
          label="기록 엑셀 추출하기"
        />
        <ExcelButton
          onClick={handleOperationStatusPreviewClick}
          disabled={isOperationPreviewInitialLoading}
          label="한글 파일 미리보기"
        />
        <ExcelButton
          onClick={handleUserListExcelExportClick}
          disabled={isUserExporting}
          label="사용자 엑셀 추출하기"
        />
        {isVisitExporting && (
          <ExportLoadingMessage>
            <LoadingBox>
              <p>엑셀 파일을 준비 중</p>
              <p>잠시만 기다려주세요...</p>
            </LoadingBox>
          </ExportLoadingMessage>
        )}
        {isUserExporting && (
          <ExportLoadingMessage>
            <LoadingBox>
              <p>엑셀 파일을 준비 중</p>
              <p>잠시만 기다려주세요...</p>
            </LoadingBox>
          </ExportLoadingMessage>
        )}
        {isOperationPreviewInitialLoading && (
          <ExportLoadingMessage>
            <LoadingBox>
              <p>한글 파일 미리보기 데이터를 불러오는 중</p>
              <p>{getExportingPeriodMessage(performanceExportingDate)}</p>
              <p>잠시만 기다려주세요...</p>
            </LoadingBox>
          </ExportLoadingMessage>
        )}
        <DateExportModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onExport={handleExportConfirmedWithDate}
        />
        <OperationStatusPreviewModal
          isOpen={Boolean(operationPreviewData)}
          data={operationPreviewData}
          selectedMonth={selectedReportPeriod.month}
          isMonthLoading={isPerformanceLoading && Boolean(operationPreviewData)}
          onMonthChange={(month) => {
            void handleReportMonthChange(month);
          }}
          onClose={() => setOperationPreviewData(null)}
        />

        <Modal
          isOpen={modal.isOpen}
          config={modal.config}
          onClose={modal.closeModal}
        />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.header`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1000;
  width: var(--admin-sidebar-width, max(20vw, 17rem));
  min-width: var(--admin-sidebar-width, max(20vw, 17rem));
  height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2rem 0;
`;

const ExportLoadingMessage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingBox = styled.div`
  background: rgba(255, 255, 255, 0.3);
  padding: 30px 50px;
  border-radius: 10px;
  color: #fff;
`;

const LogoImage = styled.img`
  width: 15rem;
  height: auto;
  object-fit: contain;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 3rem;
  cursor: pointer;
  flex-shrink: 0;
`;

const ButtonWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  flex: 1;
  min-width: 0;
  flex-wrap: wrap;
  overflow: hidden;
  font-size: 28px;
  margin-right: 1.25rem;
`;
