export type Variant = 'accent';

type BadgeProps = {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
};

const colorStyles: Record<Variant, string> = {
  accent: 'bg-card2 text-accent-text border-border',
};

export default function Badge({
  variant = 'accent',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center border rounded-pill px-2.5 py-0.5 font-mono text-caption-lg ${colorStyles[variant]} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
