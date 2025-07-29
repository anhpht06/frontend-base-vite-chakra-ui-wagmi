import request from "@/shared/config/request";
import type { User } from "@/shared/types/user.interface";

export const getMe = async (): Promise<User> => {
  return await request.get("/user/me").then((response) => response.data);
};
