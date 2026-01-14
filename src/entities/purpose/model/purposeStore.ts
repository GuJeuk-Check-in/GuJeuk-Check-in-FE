import { create } from 'zustand';
import { PurposeStore } from './types';

export const usePurposeStore = create<PurposeStore>((set) => ({
  purposes: [],

  updatePurpose: (id, newPurpose) =>
    set((state) => ({
      purposes: state.purposes.map((p) =>
        p.id === id ? { ...p, purpose: newPurpose } : p
      ),
    })),
}));

export default usePurposeStore;
