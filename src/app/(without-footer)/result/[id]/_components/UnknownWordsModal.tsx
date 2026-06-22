'use client';

import ResultChip from "@/components/ui/ResultChip";
import { X } from "lucide-react";
import { useEffect } from "react";

type UnknownWordsModalProps = {
    words: string[];
    isOpen: boolean;
    onClose: () => void;
};

export default function UnknownWordsModal({
    words,
    isOpen,
    onClose,
}: UnknownWordsModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end bg-text/45 md:items-center md:justify-center"
            role="presentation"
            onClick={onClose}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="unknown-words-title"
                className="max-h-[82vh] w-full overflow-y-auto rounded-t-card border border-border bg-bg md:max-w-[560px] md:rounded-card"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-border md:hidden" />
                <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-6 md:px-8">
                    <div className="flex flex-col gap-2">
                        <p className="font-mono text-caption-md font-bold text-muted md:text-caption-lg">
                            UNKNOWN · 미지의 창
                        </p>
                        <h2 id="unknown-words-title" className="text-heading-md font-black text-text md:text-heading-lg">
                            서로 모르는 나 · {words.length}개
                        </h2>
                        <p className="text-body-md text-subtext md:text-body-lg">
                            나도 친구도 고르지 않은 단어예요. 새로운 탐색으로 발견될 수 있어요.
                        </p>
                    </div>
                    <button
                        type="button"
                        aria-label="미지의 창 닫기"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-input border border-border bg-card2 text-muted"
                    >
                        <X size={20} />
                    </button>
                </header>
                <div className="flex flex-wrap gap-2 px-6 py-6 md:px-8">
                    {words.map((word) => (
                        <ResultChip key={word} text={word} variant="outline-muted" />
                    ))}
                </div>
            </section>
        </div>
    );
}
