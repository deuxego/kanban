import { create } from 'zustand';

interface StateSchema {
  id: number | null;
  setId: (id: number) => void;
}

export const useWorkspaceStore = create<StateSchema>((set) => ({
  id: null,
  setId: (id: number) => {
    set({ id });
  }
}));
