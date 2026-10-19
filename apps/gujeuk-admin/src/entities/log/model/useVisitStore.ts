import { create } from 'zustand';
import { UserVisit } from './types';

interface VisitStore {
  visits: UserVisit[];
  page: number;
  size: number;
  totalElements: number;
  isLast: boolean;

  setVisitList: (response: {
    content: UserVisit[];
    number: number;
    size: number;
    totalElements: number;
    last: boolean;
  }) => void;

  addVisit: (visit: UserVisit) => void;
  removeVisit: (id: number) => void;
  getVisitById: (id: number | string) => UserVisit | undefined;
}

const useVisitStore = create<VisitStore>((set, get) => ({
  visits: [],
  page: 0,
  size: 10,
  totalElements: 0,
  isLast: false,

  setVisitList: ({ content, number, size, totalElements, last }) =>
    set({
      visits: content,
      page: number,
      size,
      totalElements,
      isLast: last,
    }),

  addVisit: (visit) =>
    set((state) => ({
      visits: [visit, ...state.visits],
      totalElements: state.totalElements + 1,
    })),

  removeVisit: (id) =>
    set((state) => ({
      visits: state.visits.filter((v) => v.id !== id),
      totalElements: Math.max(state.totalElements - 1, 0),
    })),

  getVisitById: (id) => {
    const targetId = Number(id);
    return get().visits.find((v) => v.id === targetId);
  },
}));

export default useVisitStore;
