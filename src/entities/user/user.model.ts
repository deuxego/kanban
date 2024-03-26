import { create } from 'zustand';

interface StateSchema {
  id: null | string;
  setId: (id: string) => void;
}

export const useUserStore = create<StateSchema>((set) => ({
  id: null,
  setId: (id: string) => set({ id })
}));
