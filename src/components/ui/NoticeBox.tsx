import { CircleAlert, Info } from "lucide-react";
import type { ReactNode } from "react";

type Variant = 'info' | 'warn';

type NoticeBoxProps = {
  variant?: Variant;
  icon?: ReactNode;
  children: React.ReactNode;
  className?: string;
};

const colorStyles: Record<Variant, string> = {
  info: 'bg-accent-dim text-subtext border-accent-border',
  warn: 'bg-mr-yellow-dim text-mr-yellow border-mr-yellow-border',
};

const iconStyles: Record<Variant, string> = {
  info: 'text-accent-text',
  warn: 'text-mr-yellow',
};

export default function NoticeBox({
  variant = 'info',
  icon,
  children,
  className,
}: NoticeBoxProps) {
  const defaultIcon = (() => {
    switch (variant) {
      case 'info':
        return <Info size={16} />
      case 'warn':
        return <CircleAlert size={16} />
    }
  })()

  return (
    <div
      className={`flex items-center gap-2 border rounded-input px-3.5 py-3 text-caption-lg ${colorStyles[variant]} ${className ?? ''}`}
    >
      <span className={`shrink-0 ${iconStyles[variant]}`}>{icon ?? defaultIcon}</span>
      <span className="min-w-0 break-all">{children}</span>
    </div>
  );
}
