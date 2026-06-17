'use client'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MirrowItem } from '@/types'
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatedMirrowCell({ mirrow }: { mirrow: MirrowItem }) {
    const router = useRouter();
    const handleResultClick = (resultUrl: string) => {
        router.push(resultUrl);
    };
    return (
        <Card>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex min-w-0 items-center gap-3 md:gap-5'>
                    <p className='shrink-0 text-caption-lg font-bold text-muted'>이어서</p>
                    <div className='flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1'>
                        <h3 className='truncate text-body-lg md:text-heading-md font-black text-text'>{mirrow.userName}</h3>
                        <p className='font-mono text-caption-lg font-bold text-muted'>{new Date(mirrow.createdAt).toLocaleDateString('ko-KR')}</p>
                    </div>
                </div>
                <Button
                    variant='ghost'
                    icon={<ChevronRight />}
                    iconPosition='right'
                    className='shrink-0 px-0 text-body-md'
                    onClick={() => handleResultClick(mirrow.resultUrl)}
                >
                    결과 보기
                </Button>
            </div>
        </Card>
    )
}
