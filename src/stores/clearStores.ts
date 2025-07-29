import { useUserStore } from "./useUser";

export const clearAllStores = () => {
  useUserStore.getState().clearUserStore();
};
