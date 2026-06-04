import Badge from "@/components/ui/Badge";

type ResultHeaderSectionProp = {
    name: string;
    responseCount: number;
};
export default function ResultHeaderSection({ name, responseCount }: ResultHeaderSectionProp) {
    return (
        <section className="flex flex-col gap-2 py-10 px-8 border-b border-border">
            <h1 className="text-2xl font-display">{name}님의 Mirrow</h1>
            <div className="flex items-center gap-2">
                <Badge>{responseCount}명 응답</Badge>
                <p className="text-muted text-sm">조하리 창 결과</p>
            </div>
        </section>
    )
}
