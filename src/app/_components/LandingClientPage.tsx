'use client'

import { useLanding } from "@/hooks/useLanding"
import IntroPage from "./IntroPage";
import WordSelectPage from "./WordSelectPage";
import CompletePage from "./CompletePage";

export default function LandingClientPage() {
    const { name, handleName, handleSeletedWords, seletedWords, currentStep, createLinks, isCreatingLinks, handleNextStep, links } = useLanding();

    const stepContent = {
        1: <IntroPage currentStep={currentStep} name={name} onChange={handleName} onNext={handleNextStep} />,
        2: <WordSelectPage currentStep={currentStep} selectedWords={seletedWords} onSelect={handleSeletedWords} onNext={handleNextStep} createLink={createLinks} isCreatingLinks={isCreatingLinks} name={name} />,
        3: <CompletePage currentStep={currentStep} name={name} testId={links?.testId} resultId={links?.resultId} />
    }[currentStep]

    return (
        <div className="w-full">
            {stepContent}
        </div>
    )
}
