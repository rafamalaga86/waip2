import { users } from '@prisma/client';
import { create } from 'zustand';

type Auth = {
  authUser: users | null;
  setAuthUser: (user: users) => void;
  unsetAuthUser: () => void;
};

export const useAuth = create<Auth>()(set => ({
  authUser: null,
  setAuthUser: (user: users) => set(() => ({ authUser: user })),
  unsetAuthUser: () => set(() => ({ authUser: null })),
}));
