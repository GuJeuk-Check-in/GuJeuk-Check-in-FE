import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useVisitStore = create(
  persist(
    (set, get) => ({
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
    }),
    {
      name: 'visit-storage',
    }
  )
);

export default useVisitStore;
