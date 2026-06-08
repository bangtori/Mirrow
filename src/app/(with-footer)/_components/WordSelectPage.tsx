'use client'

import { Word } from "@/types";
import IndicatorSection from "./IndicatorSection";
import TitleSection from "./wordSelect/TitleSection";

import WordSelectSection from "../../../components/mirrow/WordSelectSection";
import StickyCounter from "@/components/mirrow/StickyCounter";

type WordSelectPageProps = {
    currentStep: number;
    selectedWords: Word[];
    isCreatingLinks: boolean;
    onSelect: (word: Word) => void;
    onNext: () => void;
    createLink: () => Promise<void>;
    name: string;
}

export default function WordSelectPage({ currentStep, selectedWords, isCreatingLinks, onSelect, onNext, createLink, name }: WordSelectPageProps) {

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
            <TitleSection name={name} />
            <WordSelectSection selectedWords={selectedWords} onSelect={onSelect} isLoading={isCreatingLinks} />
            <StickyCounter count={selectedWords.length} onSubmit={handleNext} isLoading={isCreatingLinks} />
        </div>
    )
}
