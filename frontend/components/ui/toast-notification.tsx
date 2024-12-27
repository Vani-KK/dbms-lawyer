"use client";

import { toast } from "sonner";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export const showToast = ({ message, type = "info" }: ToastProps) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};
