"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import Toast from "@/components/ui/Toast";
import {
  ToastContext,
  type ToastContextValue,
  type ToastItem,
  type ToastOptions,
} from "@/contexts/ToastContext";

const DEFAULT_DURATION = 3200;
const MAX_TOAST_COUNT = 5;

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id),
    );
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = `toast-${Date.now()}-${nextId.current}`;
    nextId.current += 1;

    const newToast: ToastItem = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? "info",
      duration: options.duration ?? DEFAULT_DURATION,
      action: options.action,
    };

    setToasts((currentToasts) =>
      [newToast, ...currentToasts].slice(0, MAX_TOAST_COUNT),
    );

    return id;
  }, []);

  const contextValue = useMemo<ToastContextValue>(
    () => ({ showToast, dismissToast }),
    [dismissToast, showToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        aria-label="알림"
        className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%_-_2rem)] max-w-[384px] flex-col gap-3"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
