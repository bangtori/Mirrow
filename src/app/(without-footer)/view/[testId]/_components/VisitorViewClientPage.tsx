'use client';
import { VisitorComparison } from "@/types";
import Image from "next/image";
import SelectedWordCard from "./SelectedWordCard";
import DescriptionSection from "./DescriptionSection";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useRouter } from 'next/navigation';
import { trackEvent } from "@/actions/events";
import { EVENT_NAMES } from "@/types/events";

type VisitorViewClientPageProps = {
    name: string;
    visitorComparison: VisitorComparison;
}


export default function VisitorViewClientPage({ name, visitorComparison }: VisitorViewClientPageProps) {
    const router = useRouter();

    const handleCreateMirrowButtonClick = async () => {
        await trackEvent(EVENT_NAMES.VISITOR_CREATE_CLICKED);
        router.push("/");
    };
    return (
        <div className="flex flex-col">
            <section className="flex flex-col items-center gap-2 py-10 px-8 border-b border-border">
                <Image
                    src="/icons/check.png"
                    alt="체크 아이콘"
                    width={60}
                    height={50}
                />
                <h1 className="font-black text-2xl">응답이 반영됐어요</h1>
                <p className="text-muted text-sm">{name}님의 Mirrow에 당신의 선택이 담겼어요.</p>
            </section>
            <section className="py-10 px-8 flex flex-col gap-4">
                <SelectedWordCard notSharedWords={visitorComparison.onlyOwner} sharedWords={visitorComparison.shared} name={name} />
                <SelectedWordCard notSharedWords={visitorComparison.onlyVisitor} sharedWords={visitorComparison.shared} />
                <DescriptionSection name={name} visitorComparison={visitorComparison} />
            </section>
            <section className="px-8">
                <Card variant="accent-dim" className="text-center text-accent text-sm">
                    <p>이 차이에 대해 {name}님과 대화를 나눠보세요</p>
                    <p>서로 다르게 본 단어가 대화의 시작점이 될 수 있어요.</p>
                </Card>
            </section>
            <section className="py-10 px-8">
                <Button className="w-full" size="lg" onClick={handleCreateMirrowButtonClick}>나도 Mirrow 만들기</Button>
            </section>

        </div>
    )
}
