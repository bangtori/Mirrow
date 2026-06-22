import ResultChip, { ResultChipVariant } from "@/components/ui/ResultChip";

export type JohariType = 'open' | 'blind' | 'hidden' | 'unknown';

export type JohariWord = {
    word: string;
    percent?: number;
    variant?: ResultChipVariant;
};

type JohariPanelProps = {
    type: JohariType;
    words: JohariWord[];
    isPreview?: boolean;
    onUnknownOpen?: () => void;
};

const typeEyebrow: Record<JohariType, string> = {
    open: "OPEN · 열린 창",
    blind: "BLIND · 눈먼 창",
    hidden: "HIDDEN · 숨겨진 창",
    unknown: "UNKNOWN · 미지의 창",
};

const typeTitle: Record<JohariType, string> = {
    open: "나도 알고 타인도 아는 나",
    blind: "타인은 알지만 나만 몰랐던 나",
    hidden: "나는 알지만 타인은 모르는 나",
    unknown: "서로 모르는 나",
};

export default function JohariPanel({
    type,
    words,
    isPreview = false,
    onUnknownOpen,
}: JohariPanelProps) {
    const isUnknown = type === 'unknown';

    return (
        <section className="flex flex-col gap-3 rounded-card border border-accent-border bg-card p-4">
            <div className="flex flex-col gap-1">
                <p className="font-mono text-caption-md font-bold text-muted md:text-caption-lg">
                    {typeEyebrow[type]}
                </p>
                <h2 className="text-body-md font-black text-text md:text-body-lg">
                    {typeTitle[type]}
                </h2>
            </div>

            {isUnknown ? (
                <div className="flex flex-col gap-5">
                    <p className="text-body-md text-subtext md:text-body-lg">
                        아직 {words.length}개 단어가 미지의 창에 있어요. 나도 친구도 고르지 않은 모습이에요.
                    </p>
                    <button
                        type="button"
                        onClick={onUnknownOpen}
                        className="self-center text-body-md font-bold text-accent-text md:text-body-lg"
                    >
                        미지의 창 전체 보기 →
                    </button>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {words.map((word) => (
                        <ResultChip
                            key={word.word}
                            text={word.word}
                            percent={isPreview ? undefined : word.percent}
                            variant={isPreview ? "outline-muted" : word.variant}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
