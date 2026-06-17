
type Variant = 'default' | 'accent' | 'accent-dim';
const colorStyles = {
    default: 'bg-card border-border',
    accent: 'bg-accent border-accent text-white',
    'accent-dim': 'bg-accent-dim border-accent-border text-subtext',
}

const paddingStyles: Record<Variant, string> = {
    default: 'p-4',
    accent: 'px-[22px] py-5',
    'accent-dim': 'p-4',
}

type CardProps = {
    children: React.ReactNode;
    className?: string;
    variant?: Variant;
}
export default function Card({ children, className, variant = 'default' }: CardProps) {

    return (
        <div className={`flex flex-col gap-1 rounded-card border ${paddingStyles[variant]} ${className ?? ''} ${colorStyles[variant]}`}>
            {children}
        </div>
    )
}
