import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'danger';
type Appearance = 'filled' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const colorStyles: Record<Variant, Record<Appearance, string>> = {
  primary: {
    filled: 'bg-accent text-white hover:bg-accent-hover',
    outline: 'border border-accent text-accent hover:bg-accent-dim',
    ghost: 'text-accent hover:bg-accent-dim',
  },
  danger: {
    filled: 'bg-mr-red text-white hover:bg-mr-red-hover',
    outline: 'border border-mr-red text-mr-red hover:bg-mr-red-dim',
    ghost: 'text-mr-red hover:bg-mr-red-dim',
  },
};

const sizeStyles: Record<
  Size,
  { text: string; iconOnly: string; gap: string }
> = {
  sm: { text: 'text-xs px-3 py-2', iconOnly: 'p-1.5', gap: 'gap-1' },
  md: { text: 'text-sm px-5 py-3', iconOnly: 'p-2', gap: 'gap-2' },
  lg: { text: 'text-base px-7 py-4', iconOnly: 'p-3', gap: 'gap-2' },
};

export default function Button({
  variant = 'primary',
  appearance = 'filled',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = !!icon && !children;
  const { text, iconOnly, gap } = sizeStyles[size];
  const sizeClass = isIconOnly ? iconOnly : `${text} ${icon ? gap : ''}`;

  return (
    <button
      className={`inline-flex items-center justify-center font-body font-bold rounded-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] ${colorStyles[variant][appearance]} ${sizeClass} ${className ?? ''}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}
