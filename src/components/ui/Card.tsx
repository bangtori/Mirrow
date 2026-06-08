
type Variant = 'default' | 'accent' | 'accent-dim';
const colorStyles = {
    default: 'bg-card border-border',
    accent: 'bg-accent border-accent text-white',
    'accent-dim': 'bg-accent-dim border-border',
}

type CardProps = {
    children: React.ReactNode;
    className?: string;
    variant?: Variant;
}
export default function Card({ children, className, variant = 'default' }: CardProps) {

    return (
        <div className={`flex flex-col gap-1 rounded-lg p-4 border ${className ?? ''} ${colorStyles[variant]}`}>
            {children}
        </div>
    )
}
