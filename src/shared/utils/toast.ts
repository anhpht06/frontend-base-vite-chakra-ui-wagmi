import { toaster } from "@/components/ui/toaster";
import type { AxiosError } from "axios";

export const showErrorToast = (message: string, err?: AxiosError) => {
  if (err?.response && err?.response.status >= 500) return;
  toaster.create({
    duration: 5000,
    description: message,
    type: "error",
    meta: {
      closable: true,
      showProgress: true,
    },
  });
};

export const showSuccessToast = (message: string, duration?: number) => {
  toaster.create({
    duration: duration || 5000,
    description: message,
    type: "success",
    meta: {
      closable: true,
      showProgress: true,
    },
  });
};

export const showWarningToast = (message: string) => {
  toaster.create({
    duration: 5000,
    description: message,
    type: "warning",
    meta: {
      closable: true,
      showProgress: true,
    },
  });
};
