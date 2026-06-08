'use client'
import ResultHeaderSection from "./ResultHeaderSection";
import { ResultModel } from "@/types";
import ResultBodySection from "./ResultBodySection";
import ResultDescriptionSection from "./ResultDescriptionSection";
import Button from "@/components/ui/Button";

type ResultClientPageProps = {
    data: ResultModel;
    ownerName: string;
    testId: string;
}

export default function ResultClientPage({ data, ownerName, testId }: ResultClientPageProps) {
    const handleShareButton = async () => {
        const url = `${window.location.origin}/response/${testId}`;
        await navigator.clipboard.writeText(url);

        // TODO: - 토스트 메시지로 복사 완료 안내 메시지 띄우기
    };
    return (
        <section className="flex flex-col">
            <ResultHeaderSection name={ownerName} responseCount={data.responses_count} />
            <ResultBodySection resultModel={data} responseCount={data.responses_count} />
            <ResultDescriptionSection />
            <div className="py-10 px-8 w-full">
                <Button appearance='outline' size='lg' className="w-full" onClick={handleShareButton}>응답 링크 다시 공유하기</Button>
            </div>
        </section>
    )
}
