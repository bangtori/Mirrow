import Image from "next/image"
type CompleteTitleSectionProps = {
    name: string;

}
export default function CompleteTitleSection({ name }: CompleteTitleSectionProps) {
    return (
        <div className="flex flex-col gap-4 items-center py-10 px-8 border-b border-border">
            <Image
                src="/icons/window.png"
                alt="창문 아이콘"
                width={100}
                height={100}
            />
            <p className="font-body font-bold text-2xl text-text text-center">
                &quot;{name}&quot;님의<br /><span className="text-accent">Mirrow</span>가 만들어졌어요.
            </p>
            <p className="font-body text-muted font-normal text-base">
                친구들에게 응답 링크를 공유해보세요.
            </p>
        </div>
    )
}
