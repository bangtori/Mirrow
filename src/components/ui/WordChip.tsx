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
    const selectedStyle = "bg-accent border border-accent shadow-[0px_2px_8px_rgba(124,107,181,0.3)]";
    const unSelectedStyle = "bg-card text-text border border-border";

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-pill py-1.5 px-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isSelected ? selectedStyle : unSelectedStyle} ${className ?? ''}`}
        >
            <div className="inline-flex flex-row items-center gap-1.5">
                <p className={`font-mono text-caption-lg ${isSelected ? 'text-white/80' : 'text-muted'}`}>
                    {word.english}
                </p>
                <p className={`text-body-md font-bold ${isSelected ? 'text-white' : 'text-text'}`}>
                    {word.korean}
                </p>
            </div>
        </button>
    )
}
