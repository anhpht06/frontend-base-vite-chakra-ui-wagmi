import { Storage } from "@/shared/constants";

const isBrowser = typeof window !== "undefined";

export const localStorageToken = {
  set(token: string): void {
    if (isBrowser) {
      localStorage.setItem(Storage.accessToken, token);
    }
  },

  get(tokenName: Storage): string | null {
    return isBrowser ? localStorage.getItem(tokenName) : null;
  },

  clear(): void {
    if (isBrowser) {
      localStorage.removeItem(Storage.accessToken);
    }
  },
};
