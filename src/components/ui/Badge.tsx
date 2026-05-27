type Variant = 'accent' | 'muted' | 'success' | 'warn' | 'danger';

type BadgeProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const colorStyles: Record<Variant, string> = {
  accent: 'bg-accent-dim text-accent border-accent-border',
  muted: 'bg-card2 text-muted border-border',
  success: 'bg-mr-green-dim text-mr-green border-mr-green-border',
  warn: 'bg-mr-yellow-dim text-mr-yellow border-mr-yellow-border',
  danger: 'bg-mr-red-dim text-mr-red border-mr-red-border',
};

export default function Badge({
  variant = 'accent',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center border rounded-full px-2.5 py-1 font-mono text-xs ${colorStyles[variant]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
