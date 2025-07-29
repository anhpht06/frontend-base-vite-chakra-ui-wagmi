import { persist, type PersistStorage } from "zustand/middleware";
import { create } from "zustand";
import Cookies from "js-cookie";
import { StorageKey } from "@/shared/types/storage.interface";

const cookieStorage: PersistStorage<any> = {
  getItem: (name) => {
    const cookie = Cookies.get(name);
    return cookie ? JSON.parse(cookie) : null;
  },
  setItem: (name, value) => {
    Cookies.set(name, JSON.stringify(value), {
      secure: false,
      sameSite: "Lax",
    });
  },
  removeItem: (name) => {
    Cookies.remove(name);
  },
};
type AuthState = {
  accessToken: string;
};
type AuthAction = {
  saveAccessToken: (accessToken: string) => void;
  clearAuthStore: () => void;
};
const initialAuth: AuthState = {
  accessToken: "",
};

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      ...initialAuth,

      saveAccessToken: (accessToken: string) => {
        set({ accessToken });
      },

      clearAuthStore: () => {
        set({ ...initialAuth });
        cookieStorage.removeItem(StorageKey.accessToken);
      },
    }),
    {
      name: StorageKey.accessToken,
      storage: cookieStorage,
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);
