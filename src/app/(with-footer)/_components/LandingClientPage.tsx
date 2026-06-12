'use client'

import { useLanding } from "@/hooks/useLanding"
import IntroPage from "./IntroPage";
import WordSelectPage from "./WordSelectPage";
import CompletePage from "./CompletePage";

export default function LandingClientPage() {
    const { name, handleName, handleSelectedWords, selectedWords, currentStep, createLinks, isCreatingLinks, handleNextStep, links, handleIntroNext, nameError, resetLanding } = useLanding();

    const stepContent = {
        1: <IntroPage currentStep={currentStep} name={name} onChange={handleName} onNext={handleIntroNext} error={nameError} />,
        2: <WordSelectPage currentStep={currentStep} selectedWords={selectedWords} onSelect={handleSelectedWords} onNext={handleNextStep} createLink={createLinks} isCreatingLinks={isCreatingLinks} name={name} />,
        3: links ? <CompletePage currentStep={currentStep} name={name} testId={links.testId} resultId={links.resultId} onReset={resetLanding} /> : null
    }[currentStep]

    return (
        <div className="w-full">
            {stepContent}
        </div>
    )
}
