'use client';

import { useEffect, useState } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getStorage, STORAGE_KEYS } from '@/lib/storage';
import { MirrowItem } from '@/types';
import MirrowListCell from './MirrowListCell';
import EmptyView from './EmptyView';
import { useRouter } from 'next/navigation';

export default function MyPageClientPage() {
    const [mirrowList, setMirrowList] = useState<MirrowItem[]>([]);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const savedMirrowList = getStorage(STORAGE_KEYS.LIST) ?? [];

        setMirrowList(savedMirrowList);
        setIsStorageLoaded(true);
    }, []);

    const handleNewButtonClick = () => {
        router.push('/');
    };

    if (mirrowList.length === 0) {
        return <EmptyView />;
    }

    if (!isStorageLoaded) {
        return (
            <div className="px-8 py-10">
                <p className="text-sm text-muted">Mirrow를 불러오는 중이에요.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <section className="flex justify-between px-8 py-10 border-b border-border">
                <h1 className="font-black text-xl">내 Mirrow</h1>
                <Badge variant="accent">{mirrowList.length}개</Badge>
            </section>

            <section>
                <ul>
                    {mirrowList.map((mirrow) => (
                        <MirrowListCell key={mirrow.testId} mirrow={mirrow} />
                    ))}
                </ul>
            </section>

            <section className="w-full flex justify-center py-10 px-8">
                <Button size="lg" className="w-full" onClick={handleNewButtonClick}>
                    새 Mirrow 만들기
                </Button>
            </section>
        </div>
    );
}