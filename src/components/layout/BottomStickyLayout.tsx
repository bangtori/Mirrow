type BottomStickyLayoutProps = {
    children: React.ReactNode;
    className?: string;
}

export default function BottomStickyLayout({ children, className = '' }: BottomStickyLayoutProps) {
    return (
        <div className={`sticky bottom-0 z-10 w-full bg-white px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:static md:z-auto md:bg-transparent ${className}`}>
            {children}
        </div>
    )
}
