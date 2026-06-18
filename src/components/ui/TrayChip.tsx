interface TrayChipProps {
    label: string;
    onRemove: () => void;
    className?: string;
}

export default function TrayChip({ label, onRemove, className }: TrayChipProps) {
    return (
        <div className={`inline-flex items-center gap-1.5 bg-accent text-white rounded-pill py-1.5 pr-2 pl-3 text-body-md md:text-body-lg font-bold ${className ?? ''}`}>
            <span>{label}</span>
            <span
                onClick={onRemove}
                className="w-4 h-4 rounded-full inline-flex items-center justify-center bg-white/30 hover:bg-white/40 text-xs leading-none cursor-pointer"
                style={{ transition: '0.12s' }}
            >
                ×
            </span>
        </div>
    );
}
