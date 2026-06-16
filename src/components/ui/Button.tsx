import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'default' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-white enabled:hover:bg-accent-hover enabled:hover:-translate-y-px enabled:active:translate-y-0 focus-visible:ring-2 focus-visible:ring-accent-border focus-visible:outline-none',
  secondary:
    'bg-transparent text-accent-text border-[1.5px] border-accent enabled:hover:bg-accent/8 enabled:hover:-translate-y-px enabled:active:translate-y-0 focus-visible:ring-2 focus-visible:ring-accent-border focus-visible:outline-none',
  ghost:
    'bg-transparent text-accent-text enabled:hover:bg-accent/10 enabled:hover:-translate-y-px enabled:active:translate-y-0 focus-visible:ring-2 focus-visible:ring-accent-border focus-visible:outline-none',
};

const sizeStyles: Record<
  Size,
  { text: string; iconOnly: string; gap: string; loadingIcon: number; radius: string }
> = {
  default: { text: 'text-body-lg p-3.5', iconOnly: 'p-3.5', gap: 'gap-2', loadingIcon: 16, radius: 'rounded-input' },
  sm: { text: 'text-body-md px-4 py-2', iconOnly: 'p-2', gap: 'gap-1', loadingIcon: 14, radius: 'rounded-input' },
};

export default function Button({
  variant = 'primary',
  size = 'default',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = !!icon && !children && !isLoading;
  const { text, iconOnly, gap, loadingIcon, radius } = sizeStyles[size];
  const hasLeadingIcon = isLoading || (icon && iconPosition === 'left');
  const hasTrailingIcon = icon && iconPosition === 'right';
  const ghostTextSizeClass = size === 'default' ? 'text-body-lg' : 'text-body-md';
  const textSizeClass = variant === 'ghost' ? `${ghostTextSizeClass} px-3.5 py-3` : text;
  const sizeClass = isIconOnly ? iconOnly : `${textSizeClass} ${hasLeadingIcon || hasTrailingIcon ? gap : ''}`;

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-body font-bold ${radius} transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 min-h-[44px] ${variantStyles[variant]} ${sizeClass} ${className ?? ''}`}
    >
      {isLoading && (
        <Loader2 size={loadingIcon} className="shrink-0 animate-spin" />
      )}
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
