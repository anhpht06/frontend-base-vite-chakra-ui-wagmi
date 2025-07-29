import type { User } from "@/shared/types/user.interface";
import { create } from "zustand";

type userState = {
  user: User | null;
};

type AuthAction = {
  setUser: (user: User) => void;
  clearUserStore: () => void;
};

const initialUser: userState = {
  user: null,
};

export const useUserStore = create<userState & AuthAction>()((set) => ({
  ...initialUser,
  setUser: (user) => set(() => ({ user })),
  clearUserStore: () => set({ ...initialUser }),
}));
