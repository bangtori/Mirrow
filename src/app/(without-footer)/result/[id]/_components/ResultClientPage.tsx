'use client'
import ResultHeaderSection from "./ResultHeaderSection";
import { AnalysisPromptData, ResultModel } from "@/types";
import ResultBodySection from "./ResultBodySection";
import ResultDescriptionSection from "./ResultDescriptionSection";
import Button from "@/components/ui/Button";
import { useRouter } from 'next/navigation';
import { trackEvent } from "@/actions/events";
import { EVENT_NAMES } from "@/types/events";
import ResultPreviewNotice from "./ResultPreviewNotice";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { createAnalysisPromptText } from "@/utils/analysisPrompt";

type ResultClientPageProps = {
    data: ResultModel;
    ownerName: string;
    testId: string;
    analysisPromptData: AnalysisPromptData;
}

export default function ResultClientPage({ data, ownerName, testId, analysisPromptData }: ResultClientPageProps) {
    const router = useRouter()
    const { showToast } = useToast();
    const isPreview = data.responses_count < 3;
    const analysisPromptText = createAnalysisPromptText(analysisPromptData);

    const handleShareButton = async () => {
        try {
            const url = `${window.location.origin}/response/${testId}`;
            await navigator.clipboard.writeText(url);
            showToast({
                variant: "success",
                title: "클립보드에 복사되었습니다.",
            });

            await trackEvent(EVENT_NAMES.RESPONSE_LINK_RESHARED, testId);
        } catch (error) {
            console.error(error)
            showToast({
                variant: "error",
                title: "복사에 실패했습니다. 잠시 후 다시 시도해주세요.",
            });
        }
    };

    const handleAnalysisPromptCopy = async () => {
        try {
            await navigator.clipboard.writeText(analysisPromptText);
            showToast({
                variant: "success",
                title: "클립보드에 복사되었습니다.",
            });
            await trackEvent(
                EVENT_NAMES.ANALYSIS_PROMPT_COPIED,
                testId,
                { respondent_count: data.responses_count },
            );
        } catch (error) {
            console.error(error);
            showToast({
                variant: "error",
                title: "복사에 실패했습니다. 잠시 후 다시 시도해주세요.",
            });
        }
    };

    return (
        <section className="flex flex-col px-6">
            <ResultHeaderSection name={ownerName} responseCount={data.responses_count} />
            {isPreview && <ResultPreviewNotice responseCount={data.responses_count} />}
            <ResultBodySection resultModel={data} responseCount={data.responses_count} />
            {!isPreview && (
                <div className="flex flex-col">
                    <ResultDescriptionSection result={data.result} />
                    <Button
                        variant="ghost"
                        className="mt-2 self-center"
                        icon={<Copy size={16} />}
                        onClick={handleAnalysisPromptCopy}
                    >
                        GPT 심층 분석 프롬프트 복사
                    </Button>
                </div>
            )}
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
