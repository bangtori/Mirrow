import Card from "@/components/ui/Card";
import { VisitorComparison } from "@/types";
import { getObjectParticle } from "@/utils/korean";

type DescriptionSectionProps = {
    name: string;
    visitorComparison: VisitorComparison;
}
export default function DescriptionSection({ name, visitorComparison }: DescriptionSectionProps) {
    return (
        <Card>
            <p className="font-bold text-xs text-muted mb-2">관점 차이</p>
            <ul className='flex flex-col gap-2 text-sm list-disc pl-5 marker:text-muted'>
                {visitorComparison.shared.length > 0 && <li>당신과 {name}님 모두 <strong className="text-accent">{visitorComparison.shared.map((word) => word.korean).join(', ')}</strong>{getObjectParticle(visitorComparison.shared.at(-1)?.korean ?? '')} 선택했어요.</li>}
                {visitorComparison.onlyVisitor.length > 0 && <li>당신은 <strong className="text-accent">{visitorComparison.onlyVisitor.map((word) => word.korean).join(', ')}</strong>{getObjectParticle(visitorComparison.onlyVisitor.at(-1)?.korean ?? '')} 선택했지만 {name}님은 선택하지 않았어요.</li>}
                {visitorComparison.onlyOwner.length > 0 && <li>{name}님은 <strong className="text-accent">{visitorComparison.onlyOwner.map((word) => word.korean).join(', ')}</strong>{getObjectParticle(visitorComparison.onlyOwner.at(-1)?.korean ?? '')} 선택했지만, 당신은 선택하지 않았어요.</li>}
            </ul>
        </Card>
    )
}
