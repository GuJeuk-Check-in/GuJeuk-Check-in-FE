import { create } from 'zustand';

const usePurposeStore = create((set) => ({
  purposes: [],

  addPurpose: (label) =>
    set((state) => ({
      purposes: [...state.purposes, { id: Date.now(), label: label }],
    })),

  removePurpose: (id) =>
    set((state) => ({
      purposes: state.purposes.filter((p) => p.id !== id),
    })),

  updatePurpose: (id, newLabel) =>
    set((state) => ({
      purposes: state.purposes.map((p) =>
        p.id === id ? { ...p, label: newLabel } : p
      ),
    })),
}));

export default usePurposeStore;
