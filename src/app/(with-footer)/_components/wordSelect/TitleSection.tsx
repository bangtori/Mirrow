
export default function TitleSection({ name }: { name: string }) {
    return (
        <section className="flex flex-col gap-1 border-b border-border w-full py-8 px-6">
            <h1 className="font-bold text-lg">
                {name}님 자신을 나타내는 단어를 골라주세요.
            </h1>
            <p className="text-muted">6개를 선택해야 다음 단계로 넘어갈 수 있어요.</p>
        </section>
    )
}
