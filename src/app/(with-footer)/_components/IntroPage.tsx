'use client';
import IntroHeader from './intro/IntroHeader'
import DescriptionSection from './intro/DescriptionSection';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import IndicatorSection from './IndicatorSection';
import CreatedMirrowSection from './intro/CreatedMirrowSection';
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
        <div className='flex w-full flex-col pb-8'>
            <IntroHeader />
            <IndicatorSection currentStep={currentStep} />
            {isStorageLoaded && mirrowList.length > 0 && <CreatedMirrowSection mirrowList={mirrowList} />}
            <DescriptionSection />
            <div className="px-6">
                <Input placeholder='홍길동' title='이름을 입력해주세요.' error={error} value={name} onChange={(e) => onChange(e.target.value)} maxLength={10} />
            </div>
            <div className="px-6 mt-8">
                <Button variant="primary" className="w-full" onClick={onNext}>다음: 단어 선택하기 </Button>
            </div>
        </div>
    )
}
