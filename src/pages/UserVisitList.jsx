import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserVisitCard from '../components/Form/UserVisitCard';
import ExcelButton from '../components/Button/ExcelButton';
import DateExportModal from '../components/Modal/DateExportModal';
import { Modal } from '../components/Modal/Modal';
import { useExportExcel } from '../api/hooks/useExportExcel';
import {
  useInfiniteUserVisitList,
  useDeleteVisitMutation,
} from '../api/hooks/userVisitList';
import { useModal } from '../hooks/useModal';

const UserVisitList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportingDate, setExportingDate] = useState('');
  const modal = useModal();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteUserVisitList();

  const { mutate: deleteMutate, isLoading: isDeleting } =
    useDeleteVisitMutation();

  const { mutate: excelMutate, isLoading: isExporting } = useExportExcel();

  const visits =
    data?.pages.flatMap((page) => page?.data?.content || page?.content || []) ||
    [];
  const observerTarget = useRef(null);

  useEffect(() => {
    if (isLoading || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleDelete = (id, name) => {
    if (isDeleting) return;

    modal.openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: `정말 ${name}님의 기록을 삭제하시겠나요?`,
      subtitle: '한 번 삭제한 기록은 복구할 수 없습니다',
      theme: 'warning',
      buttons: [
        {
          label: '아니요',
          variant: 'secondary',
          onClick: modal.closeModal,
        },
        {
          label: '네, 삭제합니다',
          variant: 'primary',
          bgColor: '#D88282',
          onClick: () => {
            deleteMutate(id, {
              onSuccess: () => {
                modal.openModal({
                  icon: <FaCheckCircle size={48} color="#0F50A0" />,
                  title: '삭제되었습니다',
                  subtitle: '목록을 갱신합니다.',
                  theme: 'info',
                  buttons: [
                    {
                      label: '확인',
                      onClick: modal.closeModal,
                    },
                  ],
                });
              },
              onError: () => {
                modal.closeModal();
                alert('삭제 중 오류가 발생했습니다.');
              },
            });
          },
        },
      ],
    });
  };

  const handleExcelExportClick = () => {
    setIsModalOpen(true);
  };

  const handleExportConfirmedWithDate = (year, month) => {
    const formattedMonth = String(month).padStart(2, '0');
    const dataString = `${year}-${formattedMonth}`;
    setExportingDate(dataString);
    excelMutate(
      { year, month: formattedMonth },
      {
        onSettled: () => {
          setExportingDate('');
        },
      }
    );
    setIsModalOpen(false);
  };

  const getExportingPeriodMessage = (dateString) => {
    if (!dateString) return '전체 기간';
    const parts = dateString.split('-');
    if (parts.length === 2) {
      return `기간: ${parts[0]}년 ${parts[1]}월`;
    }
    return dateString;
  };

  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 목록 조회" />

      <ExportButtonWrapper>
        <ExcelButton onClick={handleExcelExportClick} disabled={isExporting} />
        {isExporting && (
          <ExportLoadingMessage>
            엑셀 파일을 준비 중입니다... (
            {getExportingPeriodMessage(exportingDate)})
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

        {error && <ErrorMessage>오류 발생: {error.message}</ErrorMessage>}

        {!isLoading && !error && visits.length === 0 && (
          <EmptyMessage>이용 기록이 없습니다.</EmptyMessage>
        )}

        {visits.map((visit, index) => {
          if (!visit) return null;

          return (
            <UserVisitCard
              key={visit.id || index}
              id={visit?.id}
              name={visit?.name}
              male={visit?.maleCount}
              female={visit?.femaleCount}
              date={visit?.visitDate}
              onDelete={() => handleDelete(visit?.id, visit?.name)}
            />
          );
        })}

        {hasNextPage && <ObserverTarget ref={observerTarget} />}

        {isFetchingNextPage && (
          <InfoMessage>다음 페이지를 로딩 중...</InfoMessage>
        )}
        {!hasNextPage && visits.length > 0 && (
          <InfoMessage>모든 기록을 불러왔습니다.</InfoMessage>
        )}
      </ContentWrapper>

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
    </Container>
  );
};

export default UserVisitList;

const Container = styled.div`
  padding-top: 8.125rem;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 3.125rem;
  margin-top: 0;
`;

const ExportButtonWrapper = styled.div`
  position: fixed;
  top: 2rem;
  right: 16%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ExportLoadingMessage = styled.p`
  margin-left: 0.625rem;
  color: #3f51b5;
  white-space: nowrap;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 3.125rem;
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
  padding: 1.875rem 3.125rem;
  border-radius: 0.625rem;
  text-align: center;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.5rem);
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 2rem;
`;

const InfoMessage = styled.p`
  text-align: center;
  margin: 20px 0;
  color: #ffffff;
`;

const ObserverTarget = styled.div`
  height: 10px;
`;
