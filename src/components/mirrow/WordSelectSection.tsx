import WordChip from "@/components/ui/WordChip";
import { Word } from "@/types";

interface WordSelectSectionProps {
    words: Word[];
    selectedWords: Word[];
    onSelect: (word: Word) => void;
    isLoading: boolean;
}

export default function WordSelectSection({ words, selectedWords, onSelect, isLoading }: WordSelectSectionProps) {
    return (
        <section className="flex flex-wrap gap-x-2 gap-y-3 py-5 md:justify-center md:py-8">
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
