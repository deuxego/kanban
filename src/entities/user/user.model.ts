import { create } from 'zustand';
import { User, getUser } from '.';

interface StateSchema {
  user: null | User;
  setUser: (id: string) => void;
  setAllUserData: (p: User) => void;
}

export const useUserStore = create<StateSchema>((set) => ({
  user: null,
  setUser: async (id) => {
    set({ user: await getUser(id) });
  },
  setAllUserData: (p: User) => {
    set({ user: p });
  }
}));
