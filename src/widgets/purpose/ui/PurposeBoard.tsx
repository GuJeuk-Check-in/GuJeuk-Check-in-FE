import React from 'react';
import styled from '@emotion/styled';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { usePurposeList } from '@entities/purpose/index';
import PurposeCard from '@entities/purpose/ui/PurposeCard';

import PurposeAddBox from '@features/purpose/create-purpose/ui/PurposeAddBox';
import {
  useUpdatePurposeHandler,
  useDeletePurposeHandler,
  useReorderPurpose,
} from '@features/purpose/index';

import { SortablePurposeItem } from '@shared/ui/Form/SortablePurposeItem';

export const PurposeBoard = () => {
  const {
    data: purposes,
    isLoading: isListLoading,
    isError,
    error,
  } = usePurposeList();

  const { items, sensors, handleDragEnd } = useReorderPurpose(purposes || []);

  const { handleUpdate, isLoading: isUpdating } = useUpdatePurposeHandler();
  const { handleDelete, isLoading: isDeleting } = useDeletePurposeHandler();

  if (isListLoading) {
    return (
      <LoadingOverlay>
        <LoadingBox>
          <p>데이터를 불러오는 중</p>
          <p>잠시만 기다려주세요...</p>
        </LoadingBox>
      </LoadingOverlay>
    );
  }

  if (isError) {
    return (
      <ErrorText>
        데이터 로드 실패: {error instanceof Error ? error.message : '오류 발생'}
      </ErrorText>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <PurposeListGrid>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((purpose) => (
            <SortablePurposeItem key={purpose.id} id={purpose.id}>
              <PurposeCard
                purpose={purpose}
                onDelete={handleDelete}
                onUpdate={({
                  id,
                  newPurpose,
                }: {
                  id: number;
                  newPurpose: string;
                }) => handleUpdate(id, newPurpose)}
                isDeleting={isUpdating || isDeleting}
              />
            </SortablePurposeItem>
          ))}
        </SortableContext>

        <PurposeAddBox />
      </PurposeListGrid>
    </DndContext>
  );
};

const PurposeListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  justify-items: center;
  width: 90%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 2.5rem 0;
`;

const ErrorText = styled.div`
  text-align: center;
  color: red;
  margin-top: 2rem;
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
