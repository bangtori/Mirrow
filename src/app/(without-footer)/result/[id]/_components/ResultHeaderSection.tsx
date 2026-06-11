import Badge, { Variant } from "@/components/ui/Badge";
import Image from "next/image";
type ResultHeaderSectionProp = {
    name: string;
    responseCount: number;
};
type ResponseStatus = {
    message: string;
    variant: Variant;
};

function getResponseStatus(count: number): ResponseStatus {
    if (count <= 2) {
        return {
            message: '더 많은 응답이 필요해요',
            variant: 'muted',
        };
    }

    if (count <= 8) {
        return {
            message: '권장 응답 수 달성',
            variant: 'accent',
        };
    }

    return {
        message: '충분한 응답이 모였어요',
        variant: 'warn',
    };
}
export default function ResultHeaderSection({ name, responseCount }: ResultHeaderSectionProp) {
    const { message, variant } = getResponseStatus(responseCount);
    return (
        <section className="flex flex-col md:flex-row gap-4 items-center py-10 px-8 border-b border-border">
            <Image
                src="/images/logo.png"
                alt="로고 이미지"
                width={80}
                height={80}
            />
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-display">{name}님의 Mirrow</h1>
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <Badge variant={variant}>{responseCount}명 응답 · {message}</Badge>
                    <p className="text-muted text-sm">조하리 창 결과</p>
                </div>
            </div>
        </section>
    )
}
