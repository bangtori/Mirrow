"use client";

import { Check, Info, TriangleAlert, X } from "lucide-react";
import { useEffect, type CSSProperties } from "react";

import type { ToastItem, ToastVariant } from "@/contexts/ToastContext";

type ToastProps = {
  toast: ToastItem;
  onDismiss: (id: string) => void;
};

const variantStyles: Record<
  ToastVariant,
  {
    border: string;
    icon: string;
    iconBackground: string;
    progress: string;
  }
> = {
  success: {
    border: "border-l-accent",
    icon: "text-accent-text",
    iconBackground: "bg-accent-dim",
    progress: "bg-accent",
  },
  info: {
    border: "border-l-accent",
    icon: "text-accent-text",
    iconBackground: "bg-accent-dim",
    progress: "bg-accent",
  },
  error: {
    border: "border-l-mr-red",
    icon: "text-mr-red",
    iconBackground: "bg-mr-red-dim",
    progress: "bg-mr-red",
  },
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <Check aria-hidden="true" size={15} strokeWidth={2.5} />,
  info: <Info aria-hidden="true" size={15} strokeWidth={2.25} />,
  error: <TriangleAlert aria-hidden="true" size={15} strokeWidth={2.25} />,
};

export default function Toast({ toast, onDismiss }: ToastProps) {
  const styles = variantStyles[toast.variant];

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => window.clearTimeout(timerId);
  }, [onDismiss, toast.duration, toast.id]);

  const handleAction = () => {
    onDismiss(toast.id);
    toast.action?.onClick();
  };

  const animationStyle = {
    "--toast-duration": `${toast.duration}ms`,
  } as CSSProperties;

  return (
    <article
      role={toast.variant === "error" ? "alert" : "status"}
      aria-live={toast.variant === "error" ? "assertive" : "polite"}
      className={`toast-enter relative flex w-full items-center gap-3 overflow-hidden rounded-[13px] border-l-4 bg-white px-3 py-3 shadow-[0_10px_30px_rgb(61_47_107_/_0.10)] ${styles.border}`}
      style={animationStyle}
    >
      <span
        className={`flex size-[30px] shrink-0 items-center justify-center rounded-full ${styles.icon} ${styles.iconBackground}`}
      >
        {variantIcons[toast.variant]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-body-md font-black text-text md:text-body-lg">
          {toast.title}
        </p>
        {toast.description && (
          <p className="mt-0.5 text-caption-md text-subtext md:text-caption-lg">
            {toast.description}
          </p>
        )}
      </div>

      {toast.action && (
        <button
          type="button"
          onClick={handleAction}
          className="shrink-0 rounded-chip bg-accent-dim px-2.5 py-2 text-caption-md font-bold text-accent-text md:text-caption-lg"
        >
          {toast.action.label}
        </button>
      )}

      <button
        type="button"
        aria-label={`${toast.title} 알림 닫기`}
        onClick={() => onDismiss(toast.id)}
        className="flex size-8 shrink-0 items-center justify-center text-accent-text"
      >
        <X aria-hidden="true" size={16} />
      </button>

      <span
        aria-hidden="true"
        className={`toast-progress absolute inset-x-0 bottom-0 h-0.5 origin-left ${styles.progress}`}
      />
    </article>
  );
}
