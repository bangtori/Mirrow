import CompleteTitleSection from "./complete/CompleteTitleSection";
import IndicatorSection from "./IndicatorSection";
import LinkSection from "./complete/LinkSection";
import NoticeBox from "@/components/ui/NoticeBox";


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
        </div>
    )
}
