'use client'

import { trackEvent } from "@/actions/events";
import { useLanding } from "@/hooks/useLanding"
import { EVENT_NAMES } from "@/types/events";
import { useEffect } from "react";
import IntroPage from "./IntroPage";
import WordSelectPage from "./WordSelectPage";
import CompletePage from "./CompletePage";
import { Word } from "@/types";

type LandingClientPageProps = {
    words: Word[];
}

export default function LandingClientPage({ words }: LandingClientPageProps) {
    const { name, handleName, handleSelectedWords, selectedWords, currentStep, createLinks, isCreatingLinks, handleNextStep, links, handleIntroNext, nameError, resetLanding } = useLanding();

    useEffect(() => {
        void trackEvent(EVENT_NAMES.LANDING_VIEWED);
    }, []);

    const stepContent = {
        1: <IntroPage currentStep={currentStep} name={name} onChange={handleName} onNext={handleIntroNext} error={nameError} />,
        2: <WordSelectPage words={words} currentStep={currentStep} selectedWords={selectedWords} onSelect={handleSelectedWords} onNext={handleNextStep} createLink={createLinks} isCreatingLinks={isCreatingLinks} name={name} />,
        3: links ? <CompletePage currentStep={currentStep} name={name} testId={links.testId} resultId={links.resultId} onReset={resetLanding} /> : null
    }[currentStep]

    return (
        <div className="w-full">
            {stepContent}
        </div>
    )
}
