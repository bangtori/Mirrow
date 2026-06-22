'use client'
import ResultHeaderSection from "./ResultHeaderSection";
import { ResultModel } from "@/types";
import ResultBodySection from "./ResultBodySection";
import ResultDescriptionSection from "./ResultDescriptionSection";
import Button from "@/components/ui/Button";
import { useRouter } from 'next/navigation';
import { trackEvent } from "@/actions/events";
import { EVENT_NAMES } from "@/types/events";
import ResultPreviewNotice from "./ResultPreviewNotice";
import { Copy } from "lucide-react";

type ResultClientPageProps = {
    data: ResultModel;
    ownerName: string;
    testId: string;
}

export default function ResultClientPage({ data, ownerName, testId }: ResultClientPageProps) {
    const router = useRouter()
    const isPreview = data.responses_count < 3;

    const handleShareButton = async () => {
        try {
            const url = `${window.location.origin}/response/${testId}`;
            await navigator.clipboard.writeText(url);

            await trackEvent(EVENT_NAMES.RESPONSE_LINK_RESHARED, testId);
        } catch (error) {
            console.error(error)
            alert("링크 복사에 실패했습니다.")
        }

        // TODO: - 토스트 메시지로 복사 완료 안내 메시지 띄우기
    };
    return (
        <section className="flex flex-col px-6">
            <ResultHeaderSection name={ownerName} responseCount={data.responses_count} />
            {isPreview && <ResultPreviewNotice responseCount={data.responses_count} />}
            <ResultBodySection resultModel={data} responseCount={data.responses_count} />
            {!isPreview && <ResultDescriptionSection result={data.result} />}
            {isPreview ? (
                <div className="pb-10">
                    <p className="mb-2 flex flex-wrap justify-center gap-x-1 text-center text-body-md text-subtext md:text-body-lg">
                        <span className="whitespace-nowrap">응답이 쌓일수록 단어와 비율이 또렷해져요</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="whitespace-nowrap">해석은 3명부터 제공돼요</span>
                    </p>
                    <section className="flex flex-col gap-4 rounded-card border border-accent-border bg-card p-4">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-body-md font-black text-text md:text-body-lg">
                                응답 링크 공유하기
                            </h2>
                            <p className="text-body-md text-subtext md:text-body-lg">
                                친구들에게 공유하면 단어를 골라줄 수 있어요
                            </p>
                        </div>
                        <Button
                            className="w-full"
                            icon={<Copy size={16} />}
                            onClick={handleShareButton}
                        >
                            응답 링크 복사하기
                        </Button>
                    </section>
                    <Button
                        variant="ghost"
                        className="mt-2 w-full"
                        onClick={() => router.push("/")}
                    >
                        처음으로 돌아가기
                    </Button>
                </div>
            ) : (
                <div className="grid w-full grid-cols-1 gap-2 py-10 md:grid-cols-2">
                    <Button variant="secondary" className="w-full" onClick={handleShareButton}>
                        응답 링크 다시 공유하기
                    </Button>
                    <Button className="w-full" onClick={() => router.push("/")}>처음으로 돌아가기</Button>
                </div>
            )}
        </section>
    )
}
