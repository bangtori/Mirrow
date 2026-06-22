export type ResultChipVariant =
    | "solid"
    | "soft"
    | "outline-accent"
    | "outline-muted";

interface ResultChipProps {
    text: string;
    percent?: number;
    variant?: ResultChipVariant;
    className?: string;
}

export default function ResultChip({
    text,
    percent,
    variant,
    className
}: ResultChipProps) {
    const resolvedVariant = ((): ResultChipVariant => {
        if (variant) return variant;
        if (percent !== undefined) {
            return percent > 60 ? "solid" : "soft";
        }
        return "outline-muted";
    })()

    const variantStyle: Record<ResultChipVariant, string> = {
        solid: "bg-accent text-white border-accent",
        soft: "bg-card2 text-accent border-border",
        "outline-accent": "bg-transparent text-accent border-accent",
        "outline-muted": "bg-transparent text-muted border-border"
    }

    return (
        <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 border font-mono ${variantStyle[resolvedVariant]} ${className ?? ''}`}>
            <span className="font-bold text-sm">{text}</span>
            {percent !== undefined && <span className="text-xs">{percent} %</span>}
        </div>
    )
}
