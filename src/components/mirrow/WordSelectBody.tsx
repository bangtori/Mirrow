'use client'

import Button from "@/components/ui/Button";
import TrayChip from "@/components/ui/TrayChip";
import { Word } from "@/types";
import WordSelectSection from "./WordSelectSection";

type WordSelectBodyProps = {
    words: Word[];
    selectedWords: Word[];
    onSelect: (word: Word) => void;
    onSubmit: () => void;
    isLoading: boolean;
    submitLabel?: string;
    loadingLabel?: string;
}

const MAX_COUNT = 6;

export default function WordSelectBody({
    words,
    selectedWords,
    onSelect,
    onSubmit,
    isLoading,
    submitLabel = '제출하기',
    loadingLabel = '제출 중...',
}: WordSelectBodyProps) {
    const canSubmit = selectedWords.length >= MAX_COUNT;
    const remainingCount = MAX_COUNT - selectedWords.length;

    return (
        <div className="flex w-full flex-col">
            <section className="sticky top-0 z-10 flex flex-wrap gap-2 border-b border-border bg-bg py-3 md:static md:z-auto md:py-8">
                {selectedWords.map((word) => (
                    <TrayChip
                        key={word.id}
                        label={word.korean}
                        onRemove={() => onSelect(word)}
                    />
                ))}
                {remainingCount > 0 && (
                    <div className="inline-flex items-center rounded-pill border border-dashed border-border px-3 py-1.5 text-body-md md:text-body-lg font-bold text-muted">
                        {remainingCount}개 더
                    </div>
                )}
            </section>
            <WordSelectSection
                words={words}
                selectedWords={selectedWords}
                onSelect={onSelect}
                isLoading={isLoading}
            />
            <div className="flex pb-10">
                <Button
                    className="w-full"
                    disabled={!canSubmit || isLoading}
                    onClick={onSubmit}
                >
                    {isLoading ? loadingLabel : submitLabel}
                </Button>
            </div>
        </div>
    )
}
