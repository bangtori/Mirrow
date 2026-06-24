"use client";

import { createContext } from "react";

export type ToastVariant = "success" | "info" | "error";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
};

export type ToastItem = Required<Pick<ToastOptions, "title" | "variant" | "duration">> &
  Pick<ToastOptions, "description" | "action"> & {
    id: string;
  };

export type ToastContextValue = {
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
