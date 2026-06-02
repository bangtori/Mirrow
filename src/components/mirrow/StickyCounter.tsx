'use client'
import Button from "../ui/Button";

interface StickyCounterProps {
    count: number;
    onSubmit: () => void;
    isLoading: boolean
}

const MAX_COUNT = 6;

export default function StickyCounter({ count, onSubmit, isLoading }: StickyCounterProps) {
    const is_MAX = count >= MAX_COUNT;

    return (
        <div className={`sticky bottom-0 inset-x-0 w-full py-4 px-5 bg-white border-t border-border rounded-b-3xl`}>
            <div className="flex items-center justify-between">
                {/* 카운트 정보 */}
                <div className="flex gap-3">
                    <div className={`h-11 w-11 rounded-full flex items-center justify-center font-mono text-lg font-bold text-white ${is_MAX ? 'bg-accent' : 'bg-muted'}`}>
                        {count}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-muted text-sm">
                            <span className="text-accent font-bold">{count} / {MAX_COUNT} </span>
                            <span>선택됨</span>
                        </p>
                        <p className="text-muted text-sm">{is_MAX ? '제출할 준비가 됐어요.' : `${MAX_COUNT - count}개 더 선택하면 돼요.`}</p>
                    </div>
                </div>
                {/* submit */}
                <Button
                    variant="primary"
                    disabled={!is_MAX || isLoading}
                    onClick={onSubmit}
                >
                    {isLoading ? '링크 생성 중...' : '제출하기'}
                </Button>
            </div>
        </div>
    )
}
