import { ENDPOINTS_ADMIN } from "./adminApi";
import { ENDPOINTS_BRAND } from "./brandApi";
import { ENDPOINTS_KOL } from "./kolApi";

const BASE_PATHS = {
  Auth: "/auth",
};

const ENDPOINTS_AUTH = {
  LOGIN: `${BASE_PATHS.Auth}/login`,
};

export const ENDPOINTS = {
  ADMIN: ENDPOINTS_ADMIN,
  BRAND: ENDPOINTS_BRAND,
  KOL: ENDPOINTS_KOL,
  AUTH: ENDPOINTS_AUTH,
};
