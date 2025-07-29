import { getMe } from "@/services/user.service";
import type { User } from "@/shared/types/user.interface";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useGetMe = () => {
  return useMutation<User, AxiosError>({
    mutationKey: ["useGetMe"],
    mutationFn: getMe,
    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {},
  });
};
