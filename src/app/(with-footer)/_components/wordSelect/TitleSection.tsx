
export default function TitleSection({ name }: { name: string }) {
    return (
        <section className="flex flex-col gap-1 border-b border-border w-full py-5 md:py-8">
            <h1 className="text-heading-md md:text-display-md font-black text-text">
                {name}님,<br />자신을 나타내는 단어를 골라주세요.
            </h1>
            <p className="text-body-md md:text-body-lg text-subtext">6개를 선택해야 다음 단계로 넘어갈 수 있어요.</p>
        </section>
    )
}
