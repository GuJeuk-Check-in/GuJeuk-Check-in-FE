import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import UseBackground from '@shared/ui/Background/UseBackground';
import Header from '@shared/ui/Form/Header';
import PurposeBox from '@shared/ui/Form/PurposeBox';
import PurposeAddBox from '@shared/ui/Button/PurposeAddBox';
import { SortablePurposeItem } from '@shared/ui/Form/SortablePurposeItem';
import { usePurposeList } from '../api/purpose/hooks/usePurposeList';
import { useDeletePurposeList } from '../api/purpose/hooks/useDeletePurposeList';
import { useUpdatePurpose } from '../api/purpose/hooks/useUpdatePurpose';
import { useUpdatePurposeMovement } from '../api/purpose/hooks/useUpdatePurposeMovement';
import { useModal } from '@shared/hooks/useModal';
import { Modal } from '../components/Modal/Modal';
import { FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const PurposeCustom = () => {
  const { data: purposes, isLoading, isError, error } = usePurposeList();
  const { mutate: updateMovement } = useUpdatePurposeMovement();
  const { isOpen, config, openModal, closeModal } = useModal();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (purposes) {
      setItems(purposes);
    }
  }, [purposes]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateMutation = useUpdatePurpose();
  const deleteMutation = useDeletePurposeList();

  const handleDelete = (id) => {
    openModal({
      icon: <FaExclamationTriangle size={48} color="#D88282" />,
      title: '정말로 이 방문 목적을 삭제하시겠습니까?',
      subtitle: '삭제한 방문 목적은 복구할 수 없습니다.',
      theme: 'warning',
      buttons: [
        {
          label: '취소',
          variant: 'secondary',
          onClick: closeModal,
        },
        {
          label: '삭제',
          variant: 'primary',
          onClick: () => {
            deleteMutation.mutate(id, {
              onSuccess: () => {
                closeModal();

                setTimeout(() => {
                  openModal({
                    icon: <FaRegCheckCircle size={48} color="#0F50A0" />,
                    title: '삭제 완료',
                    subtitle: '방문 목적이 성공적으로 삭제되었습니다.',
                    theme: 'info',
                    buttons: [
                      {
                        label: '확인',
                        onClick: () => {
                          closeModal();
                        },
                      },
                    ],
                  });
                }, 1000);
              },

              onError: (error) => {
                const message =
                  error.response?.data?.message || '오류가 발생했습니다.';
                openModal({
                  title: '삭제 실패',
                  subtitle: message,
                  theme: 'warning',
                  buttons: [
                    {
                      label: '확인',
                      variant: 'primary',
                      onClick: closeModal,
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

  const handleUpdate = ({ id, newPurpose }) => {
    updateMutation.mutate({ id, purpose: newPurpose });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldItems = [...items];

    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      const newIndex = prevItems.findIndex((item) => item.id === over.id);
      return arrayMove(prevItems, oldIndex, newIndex);
    });

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    const newOrderedItems = arrayMove(items, oldIndex, newIndex);
    const idList = newOrderedItems.map((item) => item.id);

    updateMovement(
      { PurposeId: idList },
      {
        onSuccess: () => {
          console.log('순서 변경 저장 성공');
        },
        onError: (err) => {
          console.error('순서 변경 실패:', err);
          setItems(oldItems);

          openModal({
            icon: <FaExclamationTriangle size={48} color="#D88282" />,
            title: '순서 변경 실패',
            subtitle:
              '순서를 변경하는 도중 오류가 발생했습니다. 다시 시도해주세요.',
            theme: 'warning',
            buttons: [
              {
                label: '확인',
                variant: 'primary',
                onClick: closeModal,
              },
            ],
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="방문 목적 커스텀" />
        <LoadingOverlay>
          <LoadingBox>
            <p>데이터를 불러오는 중</p>
            <p>잠시만 기다려주세요...</p>
          </LoadingBox>
        </LoadingOverlay>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <UseBackground />
        <Header title="방문 목적 커스텀" />
        <ErrorText>데이터 로드 실패: {error.message}</ErrorText>
      </Container>
    );
  }

  const isInteracting = deleteMutation.isLoading || updateMutation.isLoading;

  return (
    <Container>
      <UseBackground />
      <Header title="방문 목적 커스텀" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <PurposeList>
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((purpose) => (
              <SortablePurposeItem key={purpose.id} id={purpose.id}>
                <PurposeBox
                  purpose={purpose}
                  onDelete={handleDelete}
                  isDeleting={isInteracting}
                  onUpdate={handleUpdate}
                />
              </SortablePurposeItem>
            ))}
          </SortableContext>

          <PurposeAddBox />
        </PurposeList>
      </DndContext>

      <Modal isOpen={isOpen} config={config} onClose={closeModal} />
    </Container>
  );
};

export default PurposeCustom;

const PurposeList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  width: 90%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 2.5rem 0;
`;

const Container = styled.div`
  padding-top: 8.125rem;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3.125rem;
`;

const ErrorText = styled(LoadingText)`
  color: red;
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
