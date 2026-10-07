/*
  코드 주석 작성일: 2026/10/4
  작성자: 박민건
  이 파일의 전체적인 기능: zustand를 이용하여 global store를 만든 후 방문 기록 데이터들을 추가, 삭제, 수정 등을 한다.
*/

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
//global store를 만들고 store에서 방문 기록을 추가, 삭제, 반환하는 기능이다.

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
  //기능: 방문 기록 데이터를 추가하는 기능이다.

  addVisit: (visit) =>
    set((state) => ({
      visits: [visit, ...state.visits],
      totalElements: state.totalElements + 1,
    })),
  //기능: UserVisit안에 id값과 맞지 않다면 그 id들은 삭제하는 기능이다.

  removeVisit: (id) =>
    set((state) => ({
      visits: state.visits.filter((v) => v.id !== id),
      totalElements: Math.max(state.totalElements - 1, 0),
    })),
  //기능: targetId와 UserVisit의 id와 맞으면 그 값들을 반환한다.

  getVisitById: (id) => {
    const targetId = Number(id);
    return get().visits.find((v) => v.id === targetId);
  },
}));

export default useVisitStore;
