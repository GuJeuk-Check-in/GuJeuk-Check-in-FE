/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 전체 또는 선택한 월의 방문 기록을 스크롤에 따라 추가 조회하고, 방문 기록 삭제와 결과 안내를 처리한다.
*/
import { useRef, useEffect, useMemo, useState } from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import styled from "@emotion/styled";
import { UserVisitCard, type UserVisit } from "@entities/log";
import { Modal } from "@shared/ui";
import {
  useInfiniteUserVisitList,
  useDeleteVisitMutation,
} from "../model/userVisitList";
import { useMonthVisitDetailList } from "../model/useMonthVisitList";
import { useModal } from "@shared/hooks/useModal";
import { MonthVisitButton } from "@shared/ui/Button/MonthVisitButton";
import { MonthVisitModal } from "./MonthVisitModal";

export const UserVisitListFeature = () => {
  const deleteConfirmModal = useModal();
  const [monthModalOpen, setMonthModalOpen] = useState(false);
  const [monthFilter, setMonthFilter] = useState<{
    year: number;
    month: number;
  } | null>(null);

  //기능: 선택한 월이 없으면 전체 방문 목록을 조회한다
  const {
    data,
    fetchNextPage: fetchNextAll,
    hasNextPage: hasNextAll,
    isFetchingNextPage: isFetchingNextAll,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useInfiniteUserVisitList({ enabled: monthFilter === null });

  const monthDetail = useMonthVisitDetailList(
    monthFilter?.year ?? 0,
    monthFilter?.month ?? 1,
    { enabled: monthFilter !== null },
  );

  const isLoading = monthFilter ? monthDetail.isLoading : isLoadingAll;
  const error = monthFilter ? monthDetail.error : errorAll;

  //기능: 전체 또는 월별 조회 결과의 여러 페이지를 하나의 방문 목록으로 합친다.
  const visits = useMemo<UserVisit[]>(() => {
    if (monthFilter) {
      return (
        monthDetail.data?.pages.flatMap((page) => page.slice?.content ?? []) ??
        []
      );
    }
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => {
      return page?.content || [];
    });
  }, [monthFilter, data, monthDetail.data]);

  const fetchNextPage = monthFilter ? monthDetail.fetchNextPage : fetchNextAll;
  const hasNextPage = monthFilter ? monthDetail.hasNextPage : hasNextAll;
  const isFetchingNextPage = monthFilter
    ? monthDetail.isFetchingNextPage
    : isFetchingNextAll;

  const observerTarget = useRef<HTMLDivElement>(null);

  //기능: 목록 하단의 감지 영역이 화면에 보이면 다음 페이지를 불러오고, 종료 시 감지를 해제한다.
  useEffect(() => {
    if (isLoading || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
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

  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteVisitMutation();

  const handleDelete = (id: number, name: string | null) => {
    if (isDeleting) return;

    const displayName = name || "방문자";

    deleteConfirmModal.openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: `정말 ${displayName}님의 기록을 삭제하시겠나요?`,
      subtitle: "한 번 삭제한 기록은 복구할 수 없습니다",
      theme: "warning",
      buttons: [
        {
          label: "아니요",
          variant: "secondary",
          onClick: deleteConfirmModal.closeModal,
        },
        {
          label: "네, 삭제합니다",
          variant: "primary",
          bgColor: "#D88282",
          onClick: () => {
            deleteMutate(id, {
              onSuccess: () => {
                deleteConfirmModal.openModal({
                  icon: <FaCheckCircle size={48} color="#0F50A0" />,
                  title: "삭제되었습니다",
                  subtitle: "목록을 갱신합니다.",
                  theme: "info",
                  buttons: [
                    {
                      label: "확인",
                      onClick: deleteConfirmModal.closeModal,
                    },
                  ],
                });
              },
              onError: (error) => {
                //기능: 삭제 실패 시 서버 오류 메시지 또는 기본 안내 문구를 표시한다.
                deleteConfirmModal.openModal({
                  icon: <FaExclamationTriangle size={48} color="#D88282" />,
                  title: "삭제 실패",
                  subtitle:
                    error.response?.data?.message ||
                    error.message ||
                    "삭제 중 오류가 발생했습니다.",
                  theme: "warning",
                  buttons: [
                    {
                      label: "확인",
                      variant: "secondary",
                      onClick: deleteConfirmModal.closeModal,
                    },
                  ],
                });
              },
            });
          },
        },
      ],
    });
  };

  return (
    <>
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
      <MonthVisitButtonWrapper>
        <MonthVisitButton onClick={() => setMonthModalOpen(true)} />
      </MonthVisitButtonWrapper>
      <MonthVisitModal
        isOpen={monthModalOpen}
        onClose={() => setMonthModalOpen(false)}
        onSelectMonthForList={(y, m) => setMonthFilter({ year: y, month: m })}
      />
      {visits.map((visit) => {
        const displayName = visit.name || "방문자";
        return (
          <UserVisitCard
            key={visit.id}
            id={visit.id}
            name={displayName}
            male={visit.maleCount}
            female={visit.femaleCount}
            date={visit.visitDate}
            onDelete={() => handleDelete(visit.id, visit.name)}
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

      <Modal
        isOpen={deleteConfirmModal.isOpen}
        config={deleteConfirmModal.config}
        onClose={deleteConfirmModal.closeModal}
      />
    </>
  );
};

//기능: 로딩 화면, 안내 문구, 스크롤 감지 영역과 월 선택 버튼의 스타일 및 화면 크기별 배치를 설정한다.
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
  background: rgba(255, 255, 255, 0.3);
  padding: 30px 50px;
  border-radius: 10px;
  color: #fff;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
`;

const InfoMessage = styled.p`
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
`;

const ObserverTarget = styled.div`
  width: 100%;
  height: 1px;
`;

const MonthVisitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: min(100%, 80rem);
  margin: 0 auto;

  @media (max-width: 48rem) {
    justify-content: stretch;
  }
`;
