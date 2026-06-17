'use client'
import CompleteTitleSection from "./complete/CompleteTitleSection";
import IndicatorSection from "./IndicatorSection";
import LinkSection from "./complete/LinkSection";
import Button from "@/components/ui/Button";


type CompletePageProps = {
    currentStep: number;
    name: string;
    testId: string;
    resultId: string;
    onReset: () => void;
}

export default function CompletePage({ currentStep, name, testId, resultId, onReset }: CompletePageProps) {
    return (
        <div className='flex w-full flex-col pb-8'>
            <IndicatorSection currentStep={currentStep} />
            <CompleteTitleSection name={name} />
            <LinkSection testId={testId} resultId={resultId} />
            <div className="px-8">
                <Button className="w-full" onClick={onReset}>처음으로 돌아가기</Button>
            </div>
        </div>
    )
}
