import { Storage } from "@/shared/constants";
import { localStorageToken } from "./localStorage";

export function setToken(token: string) {
  localStorageToken.set(token);
}
export function getToken(type: Storage) {
  return localStorageToken.get(type);
}
export function clearAccessToken() {
  localStorageToken.clear();
}
