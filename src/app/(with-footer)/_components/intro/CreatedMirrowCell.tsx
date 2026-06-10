import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { MirrowItem } from '@/types'

export default function CreatedMirrowCell({ mirrow }: { mirrow: MirrowItem }) {
    return (
        <li className=''>
            <Card variant='border'>
                <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
                    <div className='flex flex-col'>
                        <h3 className='font-black text-lg'>{mirrow.userName}</h3>
                        <p className='text-xs text-muted'>{new Date(mirrow.createdAt).toLocaleDateString('ko-KR')} 생성</p>
                    </div>
                    <div>
                        <Button>결과 보기</Button>
                    </div>
                </div>
            </Card>
        </li>
    )
}
