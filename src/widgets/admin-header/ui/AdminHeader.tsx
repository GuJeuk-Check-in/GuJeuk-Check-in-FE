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

const createDefaultReportPeriod = (): ReportPeriod => {
  const currentDate = new Date();

  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  };
};

export const AdminHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationPreviewData, setOperationPreviewData] =
    useState<OperationStatusPreviewData | null>(null);
  const [selectedReportPeriod, setSelectedReportPeriod] = useState(
    createDefaultReportPeriod
  );
  const [performanceExportingDate, setPerformanceExportingDate] = useState('');
  const modal = useModal();

  const { mutate: visitExcelMutate, isPending: isVisitExporting } =
    useVisitListExportExcel(modal);
  const { mutate: userExcelMutate, isPending: isUserExporting } =
    useUserListExportExcel(modal);
  const {
    mutateAsync: fetchPerformanceReport,
    isPending: isPerformanceLoading,
  } = useVisitPerformanceReport(modal);
  const {
    mutateAsync: fetchFacilityUsageReport,
    isPending: isFacilityUsageLoading,
  } = useFacilityUsageReport(modal);

  const isOperationPreviewInitialLoading =
    (isPerformanceLoading || isFacilityUsageLoading) && !operationPreviewData;

  const handleVisitListExcelExportClick = () => {
    setIsModalOpen(true);
  };
  const handleUserListExcelExportClick = () => {
    userExcelMutate();
  };

  const ignoreHandledRequestError = (error: unknown) => {
    if (error instanceof Error) {
      return;
    }

    throw error;
  };

  const openOperationStatusPreview = async (month: number) => {
    const currentReportPeriod = createDefaultReportPeriod();
    const dataString = `${currentReportPeriod.year}-${month}`;
    setPerformanceExportingDate(dataString);

    try {
      const [performance, facilityUsage] = await Promise.all([
        fetchPerformanceReport({ year: currentReportPeriod.year, month }),
        fetchFacilityUsageReport({ year: currentReportPeriod.year }),
      ]);

      setSelectedReportPeriod({ year: currentReportPeriod.year, month });
      setOperationPreviewData({ performance, facilityUsage });
    } catch (error) {
      ignoreHandledRequestError(error);
    } finally {
      setPerformanceExportingDate('');
    }
  };

  const handleOperationStatusPreviewClick = () => {
    void openOperationStatusPreview(selectedReportPeriod.month);
  };

  const handleReportMonthChange = async (month: number) => {
    const dataString = `${selectedReportPeriod.year}-${month}`;
    setPerformanceExportingDate(dataString);

    try {
      const performance = await fetchPerformanceReport({
        year: selectedReportPeriod.year,
        month,
      });

      setSelectedReportPeriod((currentPeriod) => ({
        ...currentPeriod,
        month,
      }));
      setOperationPreviewData((currentData) => {
        if (!currentData) {
          return currentData;
        }

        return {
          ...currentData,
          performance,
        };
      });
    } catch (error) {
      ignoreHandledRequestError(error);
    } finally {
      setPerformanceExportingDate('');
    }
  };

  const handleExportConfirmedWithDate = (year, month) => {
    visitExcelMutate({ year, month });

    setIsModalOpen(false);
  };

  const getExportingPeriodMessage = (dateString: string) => {
    if (!dateString) return '전체 기간';

    const parts = dateString.split('-');
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
