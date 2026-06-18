'use client'
import CompleteTitleSection from "./complete/CompleteTitleSection";
import IndicatorSection from "./IndicatorSection";
import LinkSection from "./complete/LinkSection";
import Button from "@/components/ui/Button";
import BottomStickyLayout from "@/components/layout/BottomStickyLayout";


type CompletePageProps = {
    currentStep: number;
    name: string;
    testId: string;
    resultId: string;
    onReset: () => void;
}

export default function CompletePage({ currentStep, name, testId, resultId, onReset }: CompletePageProps) {
    return (
        <div className='flex w-full flex-col md:pb-8'>
            <IndicatorSection currentStep={currentStep} />
            <CompleteTitleSection name={name} />
            <LinkSection testId={testId} resultId={resultId} />
            <BottomStickyLayout className="mt-4 md:px-8 md:pt-0 md:pb-0">
                <Button className="w-full" onClick={onReset}>처음으로 돌아가기</Button>
            </BottomStickyLayout>
        </div>
    )
}
