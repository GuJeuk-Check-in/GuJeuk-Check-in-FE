import { create } from 'zustand';
import { PurposeStore } from './types';

export const usePurposeStore = create<PurposeStore>((set) => ({
  purposes: [],
  subPurposesByPurposeId: {},

  setSubPurposes: (id, items) =>
    set((state) => {
      if (!items.length && !state.subPurposesByPurposeId[id]) return state;

      const subPurposesByPurposeId = { ...state.subPurposesByPurposeId };
      if (items.length) {
        subPurposesByPurposeId[id] = items;
      } else {
        delete subPurposesByPurposeId[id];
      }

      return { subPurposesByPurposeId };
    }),

  updatePurpose: (id, newPurpose) =>
    set((state) => ({
      purposes: state.purposes.map((p) =>
        p.id === id ? { ...p, purpose: newPurpose } : p
      ),
    })),
}));
