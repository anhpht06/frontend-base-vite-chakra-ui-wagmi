import request from "@/shared/config/request";
import { ENDPOINTS } from "@/shared/constants/api/apiEndpoints ";
import type {
  LoginRequest,
  LoginResponse,
} from "@/shared/types/auth/auth.interface";
import { AxiosError } from "axios";

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  return await request
    .post<LoginResponse>(ENDPOINTS.AUTH.LOGIN, loginRequest)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      throw error.response?.data || error;
    });
};
