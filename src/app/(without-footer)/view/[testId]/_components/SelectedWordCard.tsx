import Card from '@/components/ui/Card';
import { Word } from '@/types';

type SelectedWordCardProps = {
    notSharedWords: Word[];
    sharedWords: Word[];
    name?: string;
}
export default function SelectedWordCard({ notSharedWords, sharedWords, name }: SelectedWordCardProps) {
    const selectedWords = [...sharedWords, ...notSharedWords];
    return (
        <Card variant="default">
            <p className="text-xs font-bold text-muted mb-2">
                {name ? `${name}님이 선택한 단어` : "당신이 선택한 단어"}
            </p>
            <div className='flex gap-3 flex-wrap'>
                {selectedWords.map((word) => {
                    const isShared = sharedWords.some((s) => s.id === word.id);
                    const colorStyle = isShared ? 'bg-accent text-white border-accent' : 'bg-card2 text-accent border-border';
                    return (
                        <div key={word.id} className={`flex items-center gap-2 rounded-full px-3 py-1.5 border font-bold text-sm ${colorStyle}`}>
                            {word.korean}
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
