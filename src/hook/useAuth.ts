import { login } from "@/services/auth.service";
import type {
  LoginRequest,
  LoginResponse,
} from "@/shared/types/auth/auth.interface";
import { clearAllStores } from "@/stores/clearStores";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useDisconnect } from "wagmi";

export const useLogin = () => {
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationKey: ["useLogin"],
    mutationFn: login,
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {},
  });
};

export const useLogout = () => {
  const { disconnectAsync } = useDisconnect();
  return useMutation({
    mutationKey: ["useLogout"],
    mutationFn: async () => {
      await disconnectAsync();
      clearAllStores();
    },
  });
};
