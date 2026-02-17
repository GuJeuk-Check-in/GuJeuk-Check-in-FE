import styled from '@emotion/styled';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import { useResidenceList } from '@entities/residence/index';
import PurposeCard from '@entities/purpose/ui/PurposeCard';
import PurposeAddBox from '@features/purpose/create-purpose/ui/PurposeAddBox';
import { SortablePurposeItem } from '@shared/ui/Form/SortablePurposeItem';
import { Modal } from '@shared/ui/modal/Modal';

export const ResidenceBoard = () => {};
