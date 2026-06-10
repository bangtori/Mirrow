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
}

export default function CompletePage({ currentStep, name, testId, resultId }: CompletePageProps) {
    return (
        <div className='flex w-full flex-col pb-8'>
            <IndicatorSection currentStep={currentStep} />
            <CompleteTitleSection name={name} />
            <LinkSection testId={testId} resultId={resultId} />
            <div className="px-8">
                <Button size='lg' className="w-full" onClick={() => window.location.href = '/'}>처음으로 돌아가기</Button>
            </div>
        </div>
    )
}
