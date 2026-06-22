import Card from "@/components/ui/Card";
import { JohariResult } from "@/types";

type InterpretationType = "open" | "hidden" | "mixed";

type MainInterpretation = {
    title: string;
    description: string[];
};

type ResultDescriptionSectionProps = {
    result: JohariResult;
};

const MAIN_INTERPRETATIONS: Record<InterpretationType, MainInterpretation> = {
    open: {
        title: "나와 주변의 인식이 잘 맞닿아 있어요",
        description: [
            "이번 결과에서는 내가 생각하는 나와 주변 사람들이 바라본 나의 모습이 많이 겹쳐요.",
            "평소 자신의 생각이나 성향이 자연스럽게 드러나는 편일 수 있습니다. 주변 사람들도 당신을 비슷하게 인식하고 있어, 관계 안에서 서로를 이해하는 접점이 잘 형성되어 있는 상태로 볼 수 있어요.",
            "열린 창에 있는 단어들은 지금의 인간관계 속에서 가장 잘 공유되고 있는 당신의 모습입니다.",
        ],
    },
    hidden: {
        title: "아직 충분히 보여주지 않은 모습이 있어요",
        description: [
            "이번 결과에서는 내가 중요하게 생각하는 모습 중 주변 사람들이 아직 알아차리지 못한 단어들이 많이 보입니다.",
            "스스로는 분명 알고 있지만 관계 안에서는 충분히 드러나지 않았을 수 있어요.",
            "숨겨진 창이 크다는 것은 자신만의 생각과 영역을 소중하게 다루고 있다는 의미이기도 합니다. 가까운 사람들에게 조금씩 보여줄수록 새로운 모습을 발견하게 될지도 몰라요.",
        ],
    },
    mixed: {
        title: "보여줄 때와 감출 때의 균형을 잘 잡고 있어요",
        description: [
            "이번 결과에서는 열린 창과 숨겨진 창이 균형 있게 나타났어요.",
            "어떤 모습은 자연스럽게 드러내고, 어떤 모습은 스스로 간직하며 상황에 맞게 관계를 만들어가고 있습니다.",
            "한쪽으로 크게 치우치기보다 자신만의 선을 지키며 다양한 관계를 형성하는 모습이 보입니다.",
        ],
    },
};

function getMainInterpretationType(openCount: number, hiddenCount: number): InterpretationType {
    if (openCount >= 4) return "open";
    if (hiddenCount >= 4) return "hidden";
    return "mixed";
}

export default function ResultDescriptionSection({ result }: ResultDescriptionSectionProps) {
    const interpretationType = getMainInterpretationType(
        result.open.length,
        result.hidden.length,
    );
    const mainInterpretation = MAIN_INTERPRETATIONS[interpretationType];
    const strongBlindWords = result.blind.filter((word) => word.percentage >= 50);
    const strongBlindWordText = strongBlindWords
        .map(({ word }) => word.korean)
        .join(", ");

    return (
        <section className="flex flex-col">
            <Card variant="accent">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-mono text-caption-md font-bold text-white/70 md:text-caption-lg">
                            조하리 창 해석
                        </p>
                        <h3 className="text-body-md font-black md:text-body-lg">
                            {mainInterpretation.title}
                        </h3>
                        <div className="flex flex-col gap-3 text-body-md md:text-body-lg">
                            {mainInterpretation.description.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                    {strongBlindWords.length > 0 && (
                        <div className="flex flex-col gap-2 border-t border-white/30 pt-4">
                            <h4 className="text-body-md font-black md:text-body-lg">
                                주변이 공통적으로 발견한 나의 모습
                            </h4>
                            <div className="flex flex-col gap-3 text-body-md md:text-body-lg">
                                <p>
                                    추가로, 당신은 스스로 선택하지 않았지만 주변 사람들이 공통적으로 떠올린 모습들이 있습니다.
                                </p>
                                <p>{strongBlindWordText} 같은 단어들이네요.</p>
                                <p>
                                    이 단어들은 내가 의식하지 못했지만 관계 속에서 자연스럽게 드러나는 특징일 수 있습니다. 사람들이 왜 이런 단어를 선택했을지 떠올려보면 새로운 자기 이해의 단서가 될 수 있어요.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </section>
    )
}
