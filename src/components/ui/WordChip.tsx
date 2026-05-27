interface WordChipProps {
    text: string;
    isSelected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function WordChip({
    text, 
    isSelected = false, 
    disabled = false, 
    onClick, 
    className
}: WordChipProps) {    
    const selectedStyle = "bg-accent text-white border border-accent-border";
    const unSelectedStyle = "bg-card text-text border border-border";
    
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-lg px-3 py-2 font-mono font-bold text-sm transition-all active:scale-95 disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed ${isSelected ? selectedStyle : unSelectedStyle} ${className ?? ''}`}
        >
            {text}
        </button>
    )
}