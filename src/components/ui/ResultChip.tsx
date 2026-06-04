interface ResultChipProps {
    text: string;
    percent: number | null;
    className?: string;
}

type Intensity = "high" | "mid" | "low"

export default function ResultChip({
    text,
    percent,
    className
}: ResultChipProps) {
    const intensity = ((): Intensity => {
        if (percent && percent > 60) return "high"
        if (percent && percent > 0) return "mid"
        return "low"
    })()

    const intensityStyle: Record<Intensity, string> = {
        high: "bg-accent text-white border-accent-border",
        mid: "bg-card2 text-accent border-border",
        low: "bg-white text-muted border-border"
    }

    return (
        <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 border font-mono ${intensityStyle[intensity]} ${className ?? ''}`}>
            <span className="font-bold text-sm">{text}</span>
            {percent && percent !== 0 && <span className="text-xs">{percent} %</span>}
        </div>
    )
}