import NoticeBox from "@/components/ui/NoticeBox";
import { Info } from "lucide-react";

type ResultPreviewNoticeProps = {
    responseCount: number;
};

export default function ResultPreviewNotice({ responseCount }: ResultPreviewNoticeProps) {
    const remainingCount = Math.max(3 - responseCount, 0);

    return (
        <section className="flex flex-col gap-5 pt-10">
            <div className="flex justify-center gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-3 w-12 rounded-full ${index < responseCount ? 'bg-accent' : 'bg-card2'}`}
                    />
                ))}
            </div>
            <p className="text-center text-body-md font-bold text-text md:text-body-lg">
                {responseCount} / 3명 응답 · 권장 인원까지 {remainingCount}명 더
            </p>
            <NoticeBox variant="info" icon={<Info size={16} />}>
                지금은 미리보기예요. 응답 3명이 모이면 단어 선택 비율과 해석이 제공돼요.
            </NoticeBox>
        </section>
    );
}
