'use client'
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import NoticeBox from "@/components/ui/NoticeBox";
import { useState } from "react";

type LinkSectionProps = {
    testId: string;
    resultId: string;
}

export default function LinkSection({ testId, resultId }: LinkSectionProps) {
    const testUrl = `${window.location.origin}/response/${testId}`
    const resultUrl = `${window.location.origin}/result/${resultId}`

    const [copiedTestLink, setCopiedTestLink] = useState(false);
    const [copiedResultLink, setCopiedResultLink] = useState(false);

    const handleCopy = async (url: string, setCopied: (state: boolean) => void) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error(error);
            alert("링크 복사에 실패했습니다. 다시 시도해주세요.")
        }
    };

    return (
        <section className="flex flex-col gap-4 py-10 px-8">
            <Card className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <p className="font-body font-bold text-accent">응답 링크 - 친구들에게 공유</p>
                    <p className="font-body text-muted font-normal text-sm">친구들에게 공유하면 단어를 골라줄 수 있어요</p>
                    <p className="font-body text-muted font-normal text-sm">{testUrl}</p>
                </div>
                <Button variant="primary" size="lg" onClick={() => handleCopy(testUrl, setCopiedTestLink)}>{copiedTestLink ? "복사 완료" : "응답 링크 복사"}</Button>
            </Card>

            <Card className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <p className="font-body font-bold text-accent">결과 링크 - 본인 보관용</p>
                    <p className="font-body text-muted font-normal text-sm">친구들의 응답이 쌓이면 여기서 확인할 수 있어요</p>
                    <p className="font-body text-muted font-normal text-sm">{resultUrl}</p>
                </div>
                <Button variant="primary" appearance="outline" size="lg" onClick={() => handleCopy(resultUrl, setCopiedResultLink)}>{copiedResultLink ? "복사 완료" : "결과 링크 복사"}</Button>
            </Card>

            <NoticeBox variant="warn">결과 링크는 현재 기기에 자동 저장됩니다. 다만 브라우저 데이터를 삭제하거나 다른 기기에서 접속하면 사라질 수 있어요. 결과를 오래 보관하고 싶다면 링크를 복사해 저장해주세요.</NoticeBox>
        </section>
    )
}
