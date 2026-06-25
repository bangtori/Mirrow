'use client'
import { trackEvent } from "@/actions/events";
import NoticeBox from "@/components/ui/NoticeBox";
import { EVENT_NAMES, EventName } from "@/types/events";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import CopyLinkCard from "./CopyLinkCard";

type LinkSectionProps = {
    testId: string;
    resultId: string;
}

export default function LinkSection({ testId, resultId }: LinkSectionProps) {
    const { showToast } = useToast();
    const [origin, setOrigin] = useState('');
    useEffect(() => {
        const timerId = window.setTimeout(() => {
            setOrigin(window.location.origin);
        }, 0);

        return () => window.clearTimeout(timerId);
    }, []);

    const testUrl = `${origin}/response/${testId}`;
    const resultUrl = `${origin}/result/${resultId}`;

    const [copiedTestLink, setCopiedTestLink] = useState(false);
    const [copiedResultLink, setCopiedResultLink] = useState(false);

    const handleCopy = async (url: string, setCopied: (state: boolean) => void, eventName?: EventName,) => {
        try {
            await navigator.clipboard.writeText(url);
            showToast({
                variant: "success",
                title: "클립보드에 복사되었습니다.",
            });

            if (eventName) {
                await trackEvent(eventName, testId);
            }

            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error(error);
            showToast({
                variant: "error",
                title: "복사에 실패했습니다. 잠시 후 다시 시도해주세요.",
            });
        }
    };

    return (
        <section className="flex flex-col gap-4 py-10 px-8">
            <CopyLinkCard
                title="응답 링크 · 친구에게 공유"
                description="친구들에게 공유하면 나에 대한 단어를 골라줄 수 있어요"
                url={testUrl}
                buttonVariant="primary"
                desktopButtonLabel="복사"
                mobileButtonLabel="응답 링크 복사하기"
                copied={copiedTestLink}
                onCopy={() => handleCopy(testUrl, setCopiedTestLink, EVENT_NAMES.RESPONSE_LINK_COPIED)}
            />

            <CopyLinkCard
                title="결과 링크 · 본인 보관용"
                description="친구들의 응답이 쌓이면 여기서 결과를 확인할 수 있어요"
                url={resultUrl}
                buttonVariant="secondary"
                desktopButtonLabel="복사"
                mobileButtonLabel="결과 링크 복사하기"
                copied={copiedResultLink}
                onCopy={() => handleCopy(resultUrl, setCopiedResultLink, EVENT_NAMES.RESULT_LINK_COPIED)}
            />

            <NoticeBox variant="warn">결과 링크는 현재 기기에 자동 저장됩니다. 다만 브라우저 데이터를 삭제하거나 다른 기기에서 접속하면 사라질 수 있어요. 결과를 오래 보관하고 싶다면 링크를 복사해 저장해주세요.</NoticeBox>
        </section>
    )
}
