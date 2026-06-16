import WordChip from "@/components/ui/WordChip";
import { words } from "@/data/words";
import { Word } from "@/types";

interface WordSelectSectionProps {
    selectedWords: Word[];
    onSelect: (word: Word) => void;
    isLoading: boolean;
}

export default function WordSelectSection({ selectedWords, onSelect, isLoading }: WordSelectSectionProps) {
    return (
        <section className="flex flex-wrap gap-x-2 gap-y-3 py-8 px-6">
            {words.map((word) => (
                <WordChip
                    key={word.id}
                    word={word}
                    isSelected={selectedWords.some((w) => w.id === word.id)}
                    onClick={() => onSelect(word)}
                    disabled={isLoading}
                />
            ))}
        </section>
    )
}
