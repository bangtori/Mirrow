'use client';
import { VisitorComparison } from "@/types";
import Image from "next/image";
import Button from "@/components/ui/Button";
import NoticeBox from "@/components/ui/NoticeBox";
import { useRouter } from 'next/navigation';
import { trackEvent } from "@/actions/events";
import { EVENT_NAMES } from "@/types/events";
import VisitorComparisonCards from "./VisitorComparisonCards";
import { MessageCircle } from "lucide-react";

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
        <div className="flex flex-col px-6">
            <section className="-mx-6 flex flex-col items-center gap-2 py-10  border-b border-border">
                <Image
                    src="/icons/check.png"
                    alt="체크 아이콘"
                    width={60}
                    height={50}
                />
                <h1 className="font-black text-2xl">응답이 반영됐어요</h1>
                <p className="text-subtext text-sm text-center">{name}님의 Mirrow에 당신의 선택이 담겼어요.<br />익명으로 처리돼 누가 골랐는지는 알 수 없어요.</p>
            </section>
            <section className="pt-10 pb-5 flex flex-col gap-4">
                <VisitorComparisonCards name={name} visitorComparison={visitorComparison} />
            </section>

            <NoticeBox
                variant="info"
                icon={<MessageCircle size={16} />}
                className="text-center"
            >
                이 차이에 대해 {name}님과 이야기해보세요. 서로 다르게 본 단어가 좋은 대화의 시작점이 돼요.
            </NoticeBox>

            <section className="py-5">
                <Button className="w-full" onClick={handleCreateMirrowButtonClick}>나도 Mirrow 만들기</Button>
            </section>

        </div>
    )
}
