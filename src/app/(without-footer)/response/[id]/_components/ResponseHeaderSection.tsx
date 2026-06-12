type ResponseHeaderSectionProps = {
    name: string;
}
export default function ResponseHeaderSection({ name }: ResponseHeaderSectionProps) {
    return (
        <section className="flex flex-col gap-4 items-center py-10 px-8 border-b border-border">
            <p className="text-muted text-sm font-bold font-mono">MIRROW</p>
            <h1 className="text-text text-2xl text-center font-black">&quot;{name}&quot;님과<br />어울리는 단어를 골라주세요.</h1>
            <p className="text-subtext text-sm text-center">어울리는 단어를 솔직하게 골라주세요.<br />익명으로 처리되며 누가 무엇을 골랐는지 알 수 없어요.</p>
        </section>
    )
}
