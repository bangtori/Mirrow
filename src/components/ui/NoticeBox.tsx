import { CircleAlert, CircleCheck, CircleX, Info } from "lucide-react";

type Variant = 'info' | 'warn' | 'danger' | 'success';

type NoticeBoxProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const colorStyles: Record<Variant, string> = {
  info: 'bg-accent-dim text-accent border-accent-border',
  warn: 'bg-mr-yellow-dim text-mr-yellow border-mr-yellow-border',
  danger: 'bg-mr-red-dim text-mr-red border-mr-red-border',
  success: 'bg-mr-green-dim text-mr-green border-mr-green-border',
};

export default function NoticeBox({
  variant = 'info',
  children,
  className,
}: NoticeBoxProps) {
    const icon = (() => {
        switch(variant) {
            case 'info':
                return <Info size={18} className="text-accent"/>
            case 'warn':
                return <CircleAlert size={18} className="text-mr-yellow"/>
            case 'danger':
                return <CircleX size={18} className="text-mr-red"/>
            case 'success':
                return <CircleCheck size={18} className="text-mr-green"/>
        }
    })()
  return (
    <div
      className={`flex items-center gap-2 border rounded-lg px-4 py-3 font-mono text-sm ${colorStyles[variant]} ${className ?? ''}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="min-w-0 break-all">{children}</span>
    </div>
  );
}