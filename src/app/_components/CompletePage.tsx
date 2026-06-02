import CompleteTitleSection from "./complete/CompleteTitleSection";
import IndicatorSection from "./IndicatorSection";
import NoticeBox from "@/components/ui/NoticeBox";
import LinkSection from "./complete/LinkSection";
type CompletePageProps = {
    currentStep: number;
    name: string;
    testId?: string;
    resultId?: string;
}


export default function CompletePage({ currentStep, name, testId, resultId }: CompletePageProps) {


    return (
        <div className='flex w-full flex-col pb-8'>
            <IndicatorSection currentStep={currentStep} />
            <CompleteTitleSection name={name} />
            {(!testId || !resultId) ?
                <NoticeBox variant="danger">응답 링크 생성에 실패했어요. 다시 시도해주세요</NoticeBox>
                : <LinkSection testId={testId} resultId={resultId} />
            }
        </div>
    )
}
