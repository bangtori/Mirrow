'use client'

import { Word } from "@/types";
import IndicatorSection from "./IndicatorSection";
import TitleSection from "./wordSelect/TitleSection";
import WordSelectBody from "@/components/mirrow/WordSelectBody";

type WordSelectPageProps = {
    words: Word[];
    currentStep: number;
    selectedWords: Word[];
    isCreatingLinks: boolean;
    onSelect: (word: Word) => void;
    onNext: () => void;
    createLink: () => Promise<void>;
    name: string;
}

export default function WordSelectPage({ words, currentStep, selectedWords, isCreatingLinks, onSelect, onNext, createLink, name }: WordSelectPageProps) {

    const handleNext = async () => {
        try {
            await createLink();
            onNext();
        } catch {
            alert("링크 생성에 문제가 발생했습니다. 다시 시도해주세요.")
        }

    };

    return (
        <div className='flex w-full flex-col'>
            <IndicatorSection currentStep={currentStep} />
            <div className="flex w-full flex-col px-6">
                <TitleSection name={name} />
                <WordSelectBody
                    words={words}
                    selectedWords={selectedWords}
                    onSelect={onSelect}
                    onSubmit={handleNext}
                    isLoading={isCreatingLinks}
                    loadingLabel="링크 생성 중..."
                />
            </div>
        </div>
    )
}
