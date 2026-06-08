import Badge, { Variant } from "@/components/ui/Badge";

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
        <section className="flex flex-col gap-2 py-10 px-8 border-b border-border">
            <h1 className="text-2xl font-display">{name}님의 Mirrow</h1>
            <div className="flex items-center gap-2">
                <Badge variant={variant}>{responseCount}명 응답 · {message}</Badge>
                <p className="text-muted text-sm">조하리 창 결과</p>
            </div>
        </section>
    )
}
