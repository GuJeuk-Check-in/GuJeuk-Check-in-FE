import { useNavigate } from 'react-router-dom';
import { ExcelButton, HeaderButton } from '@shared/ui/Button/index';
import { Logo } from '@shared/assets';
import styled from '@emotion/styled';
import { useState } from 'react';
import DateExportModal from '@features/visit/export-excel/ui/DateExportModal';
import { useVisitListExportExcel } from '@features/visit/export-excel/model/useVisitListExportExcel';
import { Modal } from '@shared/ui/modal/Modal';
import { useModal } from '@shared/hooks/useModal';
import { useUserListExportExcel } from '@features/user/export-excel';

export const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportingDate, setExportingDate] = useState('');
  const modal = useModal();

  const { mutate: visitExcelMutate, isPending: isVisitExporting } =
    useVisitListExportExcel();
  const { mutate: userExcelMutate, isPending: isUserExporting } =
    useUserListExportExcel();

  const handleVisitListExcelExportClick = () => {
    setIsModalOpen(true);
  };
  const handleUserListExcelExportClick = () => {
    userExcelMutate();
  };

  const handleExportConfirmedWithDate = (year, month) => {
    const dataString = `${year}-${month}`;
    setExportingDate(dataString);

    visitExcelMutate(
      { year, month },
      {
        onSettled: () => {
          setExportingDate('');
        },
      }
    );

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
          onClick={handleUserListExcelExportClick}
          disabled={isUserExporting}
          label="사용자 엑셀 추출하기"
        />
        {isVisitExporting && (
          <ExportLoadingMessage>
            엑셀 파일을 준비 중입니다... (
            {getExportingPeriodMessage(exportingDate)})
          </ExportLoadingMessage>
        )}
        {isUserExporting && (
          <ExportLoadingMessage>
            엑셀 파일을 준비 중입니다...
          </ExportLoadingMessage>
        )}
        <DateExportModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onExport={handleExportConfirmedWithDate}
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

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 20vw;
  height: 100vh;
  box-sizing: border-box;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  padding: 2rem 0;
`;

const ExportLoadingMessage = styled.p`
  margin-left: 0.625rem;
  color: #3f51b5;
  white-space: nowrap;
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

const ButtonWrapper = styled.div`
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
