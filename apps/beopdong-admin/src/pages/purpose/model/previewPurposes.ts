import type { Purpose } from '@entities/purpose';

export const previewPurposes: readonly Purpose[] = [
  { id: 1, purpose: '컴퓨터', isLocked: true },
  { id: 2, purpose: '노래방', isLocked: true },
  { id: 3, purpose: '당구대/탁구', isLocked: true },
  { id: 4, purpose: '보드게임', isLocked: false },
];
