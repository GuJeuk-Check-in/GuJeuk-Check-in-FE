import styled from '@emotion/styled';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import type { ComponentProps, ReactNode } from 'react';
import type { DndContextProps, Modifier, Modifiers } from '@dnd-kit/core';

type SortableItems = ComponentProps<typeof SortableContext>['items'];

type SortableBoardLayout = 'default' | 'scrollable-padded';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const restrictToBoardBounds: Modifier = ({
  transform,
  draggingNodeRect,
  containerNodeRect,
}) => {
  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  return {
    ...transform,
    x: clamp(
      transform.x,
      containerNodeRect.left - draggingNodeRect.left,
      containerNodeRect.right - draggingNodeRect.right
    ),
    y: clamp(
      transform.y,
      containerNodeRect.top - draggingNodeRect.top,
      containerNodeRect.bottom - draggingNodeRect.bottom
    ),
  };
};

const boardModifiers: Modifiers = [restrictToBoardBounds];

type SortableBoardShellProps = {
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly error: unknown;
  readonly items: SortableItems;
  readonly sensors: DndContextProps['sensors'];
  readonly onDragEnd: NonNullable<DndContextProps['onDragEnd']>;
  readonly children: ReactNode;
  readonly trailingSlot?: ReactNode;
  readonly afterGridSlot?: ReactNode;
  readonly layout?: SortableBoardLayout;
};

export const SortableBoardShell = ({
  isLoading,
  isError,
  error,
  items,
  sensors,
  onDragEnd,
  children,
  trailingSlot,
  afterGridSlot,
  layout = 'default',
}: SortableBoardShellProps) => {
  if (isLoading) {
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

  const content = (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={boardModifiers}
      onDragEnd={onDragEnd}
    >
      <BoardGrid $layout={layout}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {children}
        </SortableContext>
        {trailingSlot}
      </BoardGrid>
      {afterGridSlot}
    </DndContext>
  );

  if (layout === 'scrollable-padded') {
    return <ScrollContainer>{content}</ScrollContainer>;
  }

  return content;
};

const ScrollContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`;

const BoardGrid = styled.div<{ readonly $layout: SortableBoardLayout }>`
  width: 100%;
  ${({ $layout }) => ($layout === 'scrollable-padded' ? 'height: 100%;' : '')}
  max-width: 75rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(min(14rem, 100%), 1fr));
  grid-auto-rows: 9rem;
  gap: 1.5rem;
  justify-items: center;
  overflow: hidden;
  touch-action: ${({ $layout }) =>
    $layout === 'scrollable-padded' ? 'pan-y' : 'none'};
  ${({ $layout }) =>
    $layout === 'scrollable-padded' ? 'padding: 2.5rem 7.5rem;' : ''}

  @media (max-width: 70rem) {
    ${({ $layout }) =>
      $layout === 'scrollable-padded' ? 'padding-inline: 2rem;' : ''}
  }

  @media (max-width: 62rem) {
    grid-template-columns: repeat(2, minmax(min(16rem, 100%), 1fr));
  }

  @media (max-width: 40rem) {
    grid-template-columns: minmax(min(14rem, 100%), 1fr);
    ${({ $layout }) =>
      $layout === 'scrollable-padded' ? 'padding-inline: 1rem;' : ''}
  }
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
