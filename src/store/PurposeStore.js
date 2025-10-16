import { create } from 'zustand';

const usePurposeStore = create((set) => ({
  purposes: [
    { id: 1, label: '게임' },
    { id: 2, label: '독서' },
    { id: 3, label: '동아리' },
    { id: 4, label: '댄스' },
    { id: 5, label: '노래방' },
    { id: 6, label: '미디어' },
    { id: 7, label: '기타' },
  ],

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
