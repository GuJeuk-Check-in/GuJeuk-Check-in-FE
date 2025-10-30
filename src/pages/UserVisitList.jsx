import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserVisitCard from '../components/Form/UserVisitCard';
import styled from '@emotion/styled';
import ExcelButton from '../components/Button/ExcelButton';
import { useExportExcel } from '../hooks/useExportExcel';
import {
  useUserVisitList,
  useDeleteVisitMutation,
} from '../hooks/userVisitList';

const UserVisitList = () => {
  const { data, isLoading, error } = useUserVisitList(0);
  const { mutate: deleteMutate, isLoading: isDeleting } =
    useDeleteVisitMutation();

  const { mutate: excelMutate, isLoading: isExporting } = useExportExcel();

  const visits = data?.content || [];

  const handleDelete = (id, name) => {
    if (isDeleting) return;

    if (window.confirm(`${name}님의 기록을 삭제하시겠습니까?`)) {
      deleteMutate(id);
    }
  };

  const handleExcelExport = () => {
    excelMutate();
  };
  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 목록 조회" />

      <ExportButtonWrapper>
        <ExcelButton onClick={handleExcelExport} disabled={isExporting} />
        {isExporting && (
          <ExportLoadingMessage>
            엑셀 파일을 준비 중입니다...
          </ExportLoadingMessage>
        )}
      </ExportButtonWrapper>

      <ContentWrapper>
        {isLoading && (
          <LoadingOverlay>
            <LoadingBox>
              <p>데이터를 불러오는 중</p>
              <p>잠시만 기다려주세요...</p>
            </LoadingBox>
          </LoadingOverlay>
        )}

        {error && <p>오류 발생: {error.message}</p>}

        {!isLoading && !error && visits.length === 0 && (
          <EmptyMessage>이용 기록이 없습니다.</EmptyMessage>
        )}

        {visits.map((visit) => (
          <UserVisitCard
            key={visit.id}
            id={visit.id}
            name={visit.name}
            male={visit.maleCount}
            female={visit.femaleCount}
            date={visit.visitDate}
            onDelete={() => handleDelete(visit.id, visit.name)}
          />
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default UserVisitList;

const Container = styled.div`
  padding-top: 12.04vh;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 50px;
  margin-top: 0;
`;

const ExportButtonWrapper = styled.div`
  position: fixed;
  top: 3vh;
  right: 16%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ExportLoadingMessage = styled.p`
  margin-left: 10px;
  color: #3f51b5;
  white-space: nowrap;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  color: #666;
`;

const LoadingOverlay = styled.div`
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
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 30px 50px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
`;
