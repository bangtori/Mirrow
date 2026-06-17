'use client'
import Button from "@/components/ui/Button"
import Image from "next/image"
import { useRouter } from 'next/navigation';

export default function EmptyView() {
    const router = useRouter();
    const handleClick = () => {
        router.push("/")
    };
    return (
        <div className="flex flex-1 flex-col gap-3 items-center justify-center py-10">
            <div className="flex flex-col gap-1 items-center">
                <Image
                    src="/icons/window.png"
                    alt="창문 아이콘"
                    width={100}
                    height={100}
                />
                <h3 className="text-heading-md md:text-heading-lg font-bold">아직 만든 Mirrow가 없어요</h3>
            </div>
            <p className="text-body-md md:text-body-lg text-subtext text-center">
                Mirrow를 만들면 여기서 <br />
                언제든 다시 확인할 수 있어요
            </p>
            <Button onClick={handleClick}>첫 Mirrow 만들기</Button>
        </div>
    )
}
