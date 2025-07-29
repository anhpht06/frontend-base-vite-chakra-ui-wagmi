export interface User {
  id: string;
  email: string;
  walletAddress: string;
  role: "kol" | "brand" | "admin" | "superAdmin";
  isBanned: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
