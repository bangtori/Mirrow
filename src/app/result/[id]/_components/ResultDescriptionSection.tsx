import Card from "@/components/ui/Card";
const JOHARI_INTERPRETATIONS = [
    "열린 창이 넓을수록 나를 있는 그대로 표현하고 있어요. 친구들과 서로를 잘 알고 있다는 신호예요.",
    "눈먼 창이 넓을수록 친구들이 발견한 나의 모습이 많아요. 스스로 인식하지 못했던 매력이 있을 수 있어요.",
    "숨겨진 창이 넓을수록 아직 꺼내지 않은 모습이 많아요. 조금씩 표현할수록 더 깊은 관계로 나아갈 수 있어요.",
]
export default function ResultDescriptionSection() {
    return (
        <section className="flex flex-col px-8">
            <Card variant="accent">
                <h3 className='text-md font-bold mb-2'>조하리 창 해석</h3>
                <ul className='flex flex-col gap-2 text-sm list-disc pl-5 marker:text-muted'>
                    {JOHARI_INTERPRETATIONS.map((interpretation, index) => (
                        <li key={index}>{interpretation}</li>
                    ))}
                </ul>
            </Card>
        </section>
    )
}
