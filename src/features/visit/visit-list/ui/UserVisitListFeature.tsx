import { useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Modal } from '@shared/ui';
import { useModal } from '@shared/hooks/useModal';
import { UserVisitCard } from '@entities/visit';
import {
  useDeleteVisitMutation,
  useInfiniteUserVisitList,
} from '@features/visit/index';

export const UserVisitListFeature = () => {
  const modal = useModal();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteUserVisitList();

  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteVisitMutation();

  const visits = useMemo(() => {
    if (!data?.pages) return [];

    return data.pages.flatMap((page: any) => page?.content || []);
  }, [data]);

  const observerTarget = useRef<HTMLDivElement>(null);

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

  const handleDelete = (id: number, name: string | null) => {
    if (isDeleting) return;

    const displayName = name || '방문자';

    modal.openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: `정말 ${displayName}님의 기록을 삭제하시겠나요?`,
      subtitle: '한 번 삭제한 기록은 복구할 수 없습니다',
      theme: 'warning',
      buttons: [
        {
          label: '아니요',
          variant: 'secondary',
          onClick: modal.closeModal,
        },
        {
          label: '네',
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
      {visits.map((visit: any) => {
        if (!visit) return null;

        return (
          <UserVisitCard
            key={visit.id}
            id={visit.id}
            name={visit.name}
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
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

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
  background: white;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  text-align: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  color: #111;
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
