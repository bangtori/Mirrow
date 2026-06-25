'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { getStorage, STORAGE_KEYS } from '@/lib/storage';
import { MirrowItem } from '@/types';
import MirrowListCell from './MirrowListCell';
import EmptyView from './EmptyView';
import { useRouter } from 'next/navigation';
import MyPageHeader from './MyPageHeader';

export default function MyPageClientPage() {
    const [mirrowList, setMirrowList] = useState<MirrowItem[]>([]);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            const savedMirrowList = getStorage(STORAGE_KEYS.LIST) ?? [];
            const sortedMirrowList = [...savedMirrowList].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );

            setMirrowList(sortedMirrowList);
            setIsStorageLoaded(true);
        }, 0);

        return () => window.clearTimeout(timerId);
    }, []);

    const handleNewButtonClick = () => {
        router.push('/');
    };

    if (!isStorageLoaded) {
        return (
            <div className="min-h-[70svh] px-6 py-10">
                <p className="text-body-md md:text-body-lg text-muted">Mirrow를 불러오는 중이에요.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-[70svh] flex-col px-6">
            <MyPageHeader count={mirrowList.length} />

            {mirrowList.length === 0 ? (
                <EmptyView />
            ) : (
                <>
                    <section>
                        <ul>
                            {mirrowList.map((mirrow) => (
                                <MirrowListCell key={mirrow.testId} mirrow={mirrow} />
                            ))}
                        </ul>
                    </section>

                    <section className="mt-auto w-full flex justify-center py-10">
                        <Button className="w-full" onClick={handleNewButtonClick}>
                            새 Mirrow 만들기
                        </Button>
                    </section>
                </>
            )}
        </div>
    );
}
