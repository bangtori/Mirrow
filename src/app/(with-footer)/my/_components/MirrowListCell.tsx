'use client';
import Button from "@/components/ui/Button";
import { MirrowItem } from "@/types";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/useToast";
type MirrowListCellProps = {
    mirrow: MirrowItem;
}
export default function MirrowListCell({ mirrow }: MirrowListCellProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [copied, setCopied] = useState(false);
    const handleResultClick = (resultUrl: string) => {
        router.push(resultUrl);
    };
    const handleResponseCopyClick = async (responseURL: string) => {
        try {
            const baseUrl = window.location.origin;
            await navigator.clipboard.writeText(`${baseUrl}${responseURL}`);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
            showToast({
                variant: "success",
                title: "클립보드에 복사되었습니다.",
            });
        } catch (error) {
            console.error(error);
            showToast({
                variant: "error",
                title: "복사에 실패했습니다. 잠시 후 다시 시도해주세요.",
            });
        }

    };
    return (
        <li className="flex flex-col gap-2 py-4 border-b border-border">
            <div className="flex flex-col">
                <h3 className="font-black text-body-lg md:text-heading-md">{mirrow.userName}</h3>
                <p className="text-caption-md md:text-caption-lg text-muted">{new Date(mirrow.createdAt).toLocaleDateString('ko-KR')} 생성</p>
            </div>
            <div className="flex gap-3">
                <Button onClick={() => handleResultClick(mirrow.resultUrl)}>결과 보기</Button>
                <Button variant="secondary" onClick={() => handleResponseCopyClick(mirrow.responseUrl)} icon={<Copy />}>{copied ? "복사 완료" : "응답 링크 복사"}</Button>
            </div>
        </li>
    )
}
