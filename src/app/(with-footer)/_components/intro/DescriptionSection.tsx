import Card from "@/components/ui/Card"

const panelDescriptions = [
    { type: "open", title: "열린 창", description: "나도 알고, 타인도 아는 나의 모습을 의미해요. 자기표현이 활발할수록 넓어져요." },
    { type: "blind", title: "눈먼 창", description: "타인은 알지만 나만 몰랐던 나의 모습을 의미해요. 타인의 피드백을 통해 줄일 수 있어요." },
    { type: "hidden", title: "숨겨진 창", description: "나는 알지만 타인은 몰랐던 나의 모습을 의미해요. 타인에게 나를 표현할수록 넓어질 수 있어요." },
    { type: "unknown", title: "미지의 창", description: "아직 발현되지 않은 잠재적 가능성이 숨어있을 수도 있는 미지의 창이에요. 탐색과 경험을 통해 발견해 나갈 수 있어요." }
]

export default function DescriptionSection() {
    return (
        <section className="flex flex-col gap-6 py-8 px-6">
            <div className='flex flex-col gap-2'>
                <h2 className='text-lg font-bold text-text'>Mirrow 란?</h2>
                <p className='text-subtext'>친구들이 나를 어떤 단어로 표현하는지 알 수 있어요. 내가 고른 단어와 비교해 나를 새롭게 발견해 보세요.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {panelDescriptions.map((panelDes) => (
                    <Card key={panelDes.type}>
                        <p className="text-xs font-bold font-mono text-muted">{panelDes.type}</p>
                        <h3 className="text-sm font-bold text-text">{panelDes.title}</h3>
                        <p className="text-sm font-light text-subtext">{panelDes.description}</p>
                    </Card>
                ))}
            </div>

            <Card variant="accent-dim">
                <ul className='flex flex-col gap-2 text-sm list-disc pl-5 marker:text-accent text-accent'>
                    <li>전문 심리 도구가 아니에요 — 참고용으로만 활용해주세요</li>
                    <li>나를 잘 아는 친한 친구들에게 공유하면 더 의미있어요</li>
                    <li>친한 친구 3~8명 정도의 응답을 받을 때 가장 의미있는 결과를 얻을 수 있어요</li>
                </ul>
            </Card>
        </section>
    )
}
