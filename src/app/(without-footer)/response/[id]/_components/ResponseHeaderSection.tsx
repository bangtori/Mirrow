type ResponseHeaderSectionProps = {
    name: string;
}
export default function ResponseHeaderSection({ name }: ResponseHeaderSectionProps) {
    return (
        <section className="flex flex-col gap-4 items-center py-10 border-b border-border">
            <p className="text-caption-md md:text-caption-lg text-muted font-bold font-mono">MIRROW</p>
            <h1 className="text-heading-md md:text-display-md text-text text-center font-black">&quot;{name}&quot;님과<br />어울리는 단어를 골라주세요.</h1>
            <p className="text-body-md md:text-body-lg text-subtext text-center">어울리는 단어 6개를 솔직하게 골라주세요.<br />익명으로 처리되며 누가 무엇을 골랐는지 알 수 없어요.</p>
        </section>
    )
}
