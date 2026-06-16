'use client'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MirrowItem } from '@/types'
import { useRouter } from 'next/navigation';
export default function CreatedMirrowCell({ mirrow }: { mirrow: MirrowItem }) {
    const router = useRouter();
    const handleResultClick = (resultUrl: string) => {
        router.push(resultUrl);
    };
    return (
        <li className=''>
            <Card variant='default'>
                <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                    <div className='flex flex-col'>
                        <h3 className='font-black text-lg'>{mirrow.userName}</h3>
                        <p className='text-xs text-muted'>{new Date(mirrow.createdAt).toLocaleDateString('ko-KR')} 생성</p>
                    </div>
                    <div>
                        <Button onClick={() => handleResultClick(mirrow.resultUrl)}>결과 보기</Button>
                    </div>
                </div>
            </Card>
        </li>
    )
}
