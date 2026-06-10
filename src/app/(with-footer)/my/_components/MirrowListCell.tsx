'use client';
import Button from "@/components/ui/Button";
import { MirrowItem } from "@/types";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
type MirrowListCellProps = {
    mirrow: MirrowItem;
}
export default function MirrowListCell({ mirrow }: MirrowListCellProps) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const handleResultClick = (resultUrl: string) => {
        router.push(resultUrl);
    };
    const handleResponseCopyClick = async (responseURL: string) => {
        try {
            await navigator.clipboard.writeText(responseURL);
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
        <li className="flex flex-col gap-2 py-4 px-8 border-b border-border">
            <div className="flex flex-col">
                <h3 className="font-black text-lg">{mirrow.userName}</h3>
                <p className="text-xs text-muted">{new Date(mirrow.createdAt).toLocaleDateString('ko-KR')} 생성</p>
            </div>
            <div className="flex gap-3">
                <Button onClick={() => handleResultClick(mirrow.resultUrl)}>결과 보기</Button>
                <Button appearance="outline" onClick={() => handleResponseCopyClick(mirrow.responseUrl)} icon={<Copy />}>{copied ? "복사 완료" : "응답 링크 복사"}</Button>
            </div>
        </li>
    )
}
