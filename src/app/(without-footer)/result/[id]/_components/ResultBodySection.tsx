'use client';

import { ResultModel } from "@/types";
import { useState } from "react";
import JohariPanel from "./JohariPanel";
import UnknownWordsModal from "./UnknownWordsModal";

type ResultBodySectionProps = {
    resultModel: ResultModel;
    responseCount: number;
}

export default function ResultBodySection({ resultModel, responseCount }: ResultBodySectionProps) {
    const [isUnknownOpen, setIsUnknownOpen] = useState(false);
    const isPreview = responseCount < 3;
    const {
        open,
        blind,
        hidden,
        unknown
    } = resultModel.result;

    return (
        <>
            <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-2 md:gap-8">
                <JohariPanel
                    type="open"
                    words={open.map(({ word, percentage }) => ({ word: word.korean, percent: percentage }))}
                    isPreview={isPreview}
                />
                <JohariPanel
                    type="blind"
                    words={blind.map(({ word, percentage }) => ({ word: word.korean, percent: percentage }))}
                    isPreview={isPreview}
                />
                <JohariPanel type="hidden" words={hidden.map((word) => ({ word: word.korean, variant: "outline-muted" }))} />
                <JohariPanel
                    type="unknown"
                    words={unknown.map((word) => ({ word: word.korean, variant: "outline-muted" }))}
                    onUnknownOpen={() => setIsUnknownOpen(true)}
                />
            </div>
            <UnknownWordsModal
                words={unknown.map((word) => word.korean)}
                isOpen={isUnknownOpen}
                onClose={() => setIsUnknownOpen(false)}
            />
        </>
    )
}
