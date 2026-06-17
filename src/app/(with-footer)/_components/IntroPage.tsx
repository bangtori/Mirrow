'use client';
import IntroHeader from './intro/IntroHeader'
import DescriptionSection from './intro/DescriptionSection';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import IndicatorSection from './IndicatorSection';
import CreatedMirrowSection from './intro/CreatedMirrowSection';
import BottomStickyLayout from '@/components/layout/BottomStickyLayout';
import { MirrowItem } from '@/types';
import { getStorage, STORAGE_KEYS } from '@/lib/storage';
import { useEffect, useState } from 'react';


type IntroPageProps = {
    currentStep: number;
    name: string;
    onChange: (value: string) => void;
    onNext: () => void;
    error: string | null;
}
export default function IntroPage({ currentStep, name, onChange, onNext, error }: IntroPageProps) {
    const [mirrowList, setMirrowList] = useState<MirrowItem[]>([]);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            const savedMirrowList = getStorage(STORAGE_KEYS.LIST) ?? [];
            const sliceList = savedMirrowList
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 1)
            setMirrowList(sliceList);
            setIsStorageLoaded(true);
        }, 0);

        return () => window.clearTimeout(timerId);
    }, []);

    return (
        <div className='flex w-full flex-col'>
            <IntroHeader />
            <IndicatorSection currentStep={currentStep} />
            <div className="px-6">
                {isStorageLoaded && mirrowList.length > 0 && <CreatedMirrowSection mirrowList={mirrowList} />}
                <div className='flex flex-col gap-2 py-5'>
                    <h2 className='text-heading-md md:text-heading-lg font-black text-text'>Mirrow 란?</h2>
                    <p className='text-body-md md:text-body-lg text-subtext'>친구들이 나를 어떤 단어로 표현하는지 알 수 있어요. 내가 고른 단어와 비교해 나를 새롭게 발견해 보세요.</p>
                </div>
                <Input placeholder='홍길동' title='이름을 입력해주세요.' error={error} value={name} onChange={(e) => onChange(e.target.value)} maxLength={10} />
                <DescriptionSection />
            </div>
            <BottomStickyLayout className="mt-8">
                <Button variant="primary" className="w-full" onClick={onNext}>다음: 단어 선택하기 </Button>
            </BottomStickyLayout>
        </div>
    )
}
