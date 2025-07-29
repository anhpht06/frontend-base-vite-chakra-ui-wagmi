import { toaster } from "@/components/ui/toaster";

export const showErrorToast = (message: string) => {
  toaster.create({
    description: message,
    type: "error",
    meta: {
      closable: true,
      showProgress: true,
    },
  });
};

export const showSuccessToast = (message: string) => {
  toaster.create({
    description: message,
    type: "success",
    meta: {
      closable: true,
      showProgress: true,
    },
  });
};
