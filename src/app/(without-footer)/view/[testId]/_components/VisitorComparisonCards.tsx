import ResultChip from "@/components/ui/ResultChip";
import { VisitorComparison } from "@/types";

type VisitorComparisonCardsProps = {
    name: string;
    visitorComparison: VisitorComparison;
};

export default function VisitorComparisonCards({
    name,
    visitorComparison,
}: VisitorComparisonCardsProps) {
    return (
        <div className="flex flex-col gap-4">
            <section className="rounded-card border border-accent-border bg-card p-4">
                <div className="mb-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="h-[11px] w-[11px] shrink-0 rounded-full bg-accent" />
                    <h2 className="text-body-md font-bold text-text md:text-body-lg">함께 본 모습</h2>
                    <p className="text-body-md text-subtext md:text-body-lg">
                        당신과 {name}님이 똑같이 골랐어요
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {visitorComparison.shared.map((word) => (
                        <ResultChip key={word.id} text={word.korean} variant="solid" />
                    ))}
                </div>
            </section>
            <section className="rounded-card border border-accent-border bg-card p-4">
                <h2 className="mb-4 text-body-md font-bold text-text md:text-body-lg">
                    서로 다르게 본 모습
                </h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
                        <div className="inline-flex items-center gap-2">
                            <span className="h-[9px] w-[9px] shrink-0 rounded-full border-2 border-accent" />
                            <h3 className="text-body-md font-bold text-accent md:text-body-lg">
                                당신만 골랐어요
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {visitorComparison.onlyVisitor.map((word) => (
                                <ResultChip
                                    key={word.id}
                                    text={word.korean}
                                    variant="outline-accent"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="inline-flex items-center gap-2">
                            <span className="h-[9px] w-[9px] shrink-0 rounded-full border-2 border-muted" />
                            <h3 className="text-body-md font-bold text-muted md:text-body-lg">
                                {name}님만 골랐어요
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {visitorComparison.onlyOwner.map((word) => (
                                <ResultChip
                                    key={word.id}
                                    text={word.korean}
                                    variant="outline-muted"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
