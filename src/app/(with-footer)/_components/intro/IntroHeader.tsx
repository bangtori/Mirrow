'use client';

import Image from "next/image"
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function IntroHeader() {
    const router = useRouter();
    const handleMyMirrowClick = () => {
        router.push('/my');
    }

    return (
        <div className='relative flex w-full items-center justify-between px-5 pt-4 pb-0 md:flex-col md:justify-center md:gap-3 md:px-8 md:py-10 md:border-b md:border-border'>
            <div className="flex items-center gap-2 md:flex-col md:gap-3">
                <Image
                    src="/images/logo.png"
                    alt="로고 이미지"
                    width={54}
                    height={54}
                    className="h-[30px] w-[30px] md:h-[54px] md:w-[54px]"
                />
                <div className="md:flex md:flex-col md:items-center md:gap-1">
                    <h1 className='font-display text-xl font-bold text-text md:text-4xl'>Mirrow</h1>
                    <p className='hidden text-sm text-subtext md:block'>타인의 시선으로 발견하는 나</p>
                </div>
            </div>
            <button
                type="button"
                className="flex items-center gap-0.5 font-mono text-xs font-bold text-accent-text md:absolute md:right-8 md:top-7"
                onClick={handleMyMirrowClick}
            >
                내 Mirrow
                <ChevronRight size={14} strokeWidth={3} />
            </button>
        </div>
    )
}
