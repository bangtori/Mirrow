import Badge from "@/components/ui/Badge";

type ResultHeaderSectionProp = {
    name: string;
    responseCount: number;
};
export default function ResultHeaderSection({ name, responseCount }: ResultHeaderSectionProp) {
    const responseStatusMessage = (() => {
        if (responseCount <= 2) {
            return '더 많은 응답이 필요해요';
        }
        if (responseCount <= 8) {
            return '권장 응답 수 달성';
        }
        return '충분한 응답이 모였어요';
    })();
    return (
        <section className="flex flex-col gap-2 py-10 px-8 border-b border-border">
            <h1 className="text-2xl font-display">{name}님의 Mirrow</h1>
            <div className="flex items-center gap-2">
                <Badge>{responseCount}명 응답 · {responseStatusMessage}</Badge>
                <p className="text-muted text-sm">조하리 창 결과</p>
            </div>
        </section>
    )
}
