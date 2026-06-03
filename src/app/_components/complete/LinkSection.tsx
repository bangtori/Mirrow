import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import NoticeBox from "@/components/ui/NoticeBox";
import { useState } from "react";

type LinkSectionProps = {
    testId: string;
    resultId: string;
}

export default function LinkSection({ testId, resultId }: LinkSectionProps) {
    const testUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/test/${testId}`
    const resultUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/result/${resultId}`

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
                    <p className="font-body font-bold text-md text-accent">응답 링크 - 친구들에게 공유</p>
                    <p className="font-body text-muted font-normal text-sm">친구들에게 공유하면 단어를 골라줄 수 있어요</p>
                    <p className="font-body text-muted font-normal text-sm">{testUrl}</p>
                </div>
                <Button variant="primary" size="lg" onClick={() => handleCopy(testUrl, setCopiedTestLink)}>{copiedTestLink ? "복사 완료" : "응답 링크 복사"}</Button>
            </Card>

            <Card className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1">
                    <p className="font-body font-bold text-md text-accent">결과 링크 - 본인 보관용</p>
                    <p className="font-body text-muted font-normal text-sm">친구들의 응답이 쌓이면 여기서 확인할 수 있어요</p>
                    <p className="font-body text-muted font-normal text-sm">{resultUrl}</p>
                </div>
                <Button variant="primary" appearance="outline" size="lg" onClick={() => handleCopy(resultUrl, setCopiedResultLink)}>{copiedResultLink ? "복사 완료" : "결과 링크 복사"}</Button>
            </Card>

            <NoticeBox variant="warn">결과 링크는 다시 발급받을 수 없어요. 반드시 저장해두세요.</NoticeBox>
        </section>
    )
}
