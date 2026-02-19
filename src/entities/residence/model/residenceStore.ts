import { create } from 'zustand';
import { ResidenceStore } from './types';

export const useResidenceStore = create<ResidenceStore>((set) => ({
  residences: [],

  setResidences: (residences) => set({ residences }),

  updateResidence: (id, newResidenceName) =>
    set((state) => ({
      residences: state.residences.map((r) =>
        r.id === id ? { ...r, residenceName: newResidenceName } : r
      ),
    })),
}));
