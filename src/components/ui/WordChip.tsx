import { Word } from "@/types";

interface WordChipProps {
    word: Word;
    isSelected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function WordChip({
    word,
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
            className={`inline-flex items-center justify-center rounded-lg px-3 py-2 font-bold transition-all active:scale-95 disabled:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] ${isSelected ? selectedStyle : unSelectedStyle} ${className ?? ''}`}
        >
            <div className="flex flex-col items-center">
                <p className={`font-mono text-sm ${isSelected ? 'text-white' : 'text-muted'}`}>
                    {word.english}
                </p>
                <p className="">
                    {word.korean}
                </p>
            </div>
        </button>
    )
}