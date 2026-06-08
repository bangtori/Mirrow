import ResultChip from "../ui/ResultChip";

type JohariType = 'open' | 'blind' | 'hidden' | 'unknown'
interface JohariPanelProps {
    type: JohariType;
    words: Array<{ word: string, percent: number | null }>;
    locked?: boolean;
}

const typeTitle: Record<JohariType, string> = {
    open: "Open · 열린 창",
    blind: "Blind · 눈먼 창",
    hidden: "Hidden · 숨겨진 창",
    unknown: "Unknown · 미지의 창"
}

const typeDescription: Record<JohariType, string> = {
    open: "나도 알고, 타인도 아는 나",
    blind: "타인은 알지만 나만 몰랐던 나",
    hidden: "나는 알지만 타인은 몰랐던 나",
    unknown: "서로 모르는 나"
}

export default function JohariPanel({ type, words, locked = false }: JohariPanelProps) {
    return (
        <div className="flex flex-col gap-1 bg-card rounded-lg p-4 border border-border">
            <h2 className="text-xs font-bold font-mono text-muted">{typeTitle[type]}</h2>
            <p className="text-sm font-bold">{typeDescription[type]}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {locked ? (
                    <p className="mt-2 text-sm text-muted">응답자가 5명 이상일 때 이 영역에 단어가 표시됩니다.</p>
                ) : (
                    words.map((word, index) => (
                        <ResultChip key={index} text={word.word} percent={word.percent} />
                    ))
                )}
            </div>
        </div>
    )
}