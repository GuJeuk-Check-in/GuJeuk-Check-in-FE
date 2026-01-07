import { create } from 'zustand';

interface Purpose {
  id: number;
  purpose: string;
}

interface PurposeStore {
  purposes: Purpose[];
  updatePurpose: (id: number, newPurpose: string) => void;
}

const usePurposeStore = create<PurposeStore>((set) => ({
  purposes: [],

  updatePurpose: (id, newPurpose) =>
    set((state) => ({
      purposes: state.purposes.map((p) =>
        p.id === id ? { ...p, purpose: newPurpose } : p
      ),
    })),
}));

export default usePurposeStore;
