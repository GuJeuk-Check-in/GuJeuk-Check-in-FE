import { create } from 'zustand';

const useVisitStore = create((set, get) => ({
  visits: [],

  addVisit: (newVisit) =>
    set((state) => ({
      visits: [{ id: Date.now(), ...newVisit }, ...state.visits],
    })),

  removeVisit: (id) =>
    set((state) => ({
      visits: state.visits.filter((visit) => visit.id !== id),
    })),

  getVisitById: (id) => {
    const targetId = Number(id);
    return get().visits.find((v) => Number(v.id) === targetId);
  },
}));

export default useVisitStore;
