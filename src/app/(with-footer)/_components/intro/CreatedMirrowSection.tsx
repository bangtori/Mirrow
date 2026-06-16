'use client';
import { MirrowItem } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CreatedMirrowCell from "./CreatedMirrowCell";

export default function CreatedMirrowSection({ mirrowList }: { mirrowList: MirrowItem[] }) {
    const router = useRouter();
    const handleMyMirrowClick = () => {
        router.push('/my');
    }
    return (
        <section className="py-10 px-8 border-b border-border bg-card">
            <p className="text-sm font-bold font-mono text-muted">최근 생성한 Mirrow</p>
            <section className="py-4">
                {mirrowList.length === 0 ? <Card variant="default">
                    <p className="text-base font-bold text-accent">아직 만들어진 Mirrow가 없어요.<br />아래에서 나만의 Mirrow를 만들어보세요.</p>
                </Card> : (
                    <ul className='flex flex-col gap-2'>
                        {mirrowList.map((mirrow) => (
                            <CreatedMirrowCell key={mirrow.testId} mirrow={mirrow} />
                        ))}
                    </ul>
                )}
            </section>
            <Button className="w-full" variant="ghost" iconPosition="right" icon={<ChevronRight />} onClick={handleMyMirrowClick}>My Mirrow</Button>
        </section>
    )
}
