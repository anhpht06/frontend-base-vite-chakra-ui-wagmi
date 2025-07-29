export interface LoginRequest {
  walletAddress: string;
  signature: string;
}

export interface LoginResponse {
  accessToken: string;
}
