import type { AnalysisPromptData, TestResult, Word } from "@/types";

const WORDS_PER_RESPONSE = 6;

type WordCount = {
  word: Word;
  count: number;
};

export function createAnalysisPromptData(
  result: TestResult,
): AnalysisPromptData {
  if (result.responses.length % WORDS_PER_RESPONSE !== 0) {
    throw new Error("응답한 단어의 개수가 올바르지 않습니다.");
  }

  const respondentCount = result.responses.length / WORDS_PER_RESPONSE;
  const wordCounts = new Map<number, WordCount>();

  for (const word of result.responses) {
    const existingWordCount = wordCounts.get(word.id);

    wordCounts.set(word.id, {
      word,
      count: (existingWordCount?.count ?? 0) + 1,
    });
  }

  const respondentWords = [...wordCounts.values()]
    .sort(
      (left, right) =>
        right.count - left.count || left.word.id - right.word.id,
    )
    .map(({ word, count }) => ({
      word: word.korean,
      count,
      percent:
        respondentCount === 0
          ? 0
          : Math.round((count / respondentCount) * 1000) / 10,
    }));

  return {
    owner: {
      name: result.ownerInfo.name,
      selectedWords: result.ownerInfo.self_words.map((word) => word.korean),
    },
    respondentCount,
    respondentWords,
  };
}

export function createAnalysisPromptText(data: AnalysisPromptData): string {
  return `당신은 조하리 창(Johari Window) 관점을 바탕으로 자기 인식 데이터를 분석하는 전문 분석가입니다.

아래 JSON은 테스트 작성자가 스스로 선택한 단어와, 주변 사람들이 선택한 단어를 집계한 결과입니다.

분석 시 다음 원칙을 반드시 지켜주세요.

- 단어 하나만으로 성격을 단정하지 말고 전체 패턴을 종합적으로 해석합니다.
- 응답 빈도(Count)와 응답 비율(Percent)를 함께 고려합니다.
- 자기 인식과 타인 인식의 차이를 중심으로 분석합니다.
- 근거 없는 심리 추측이나 과도한 일반화는 피합니다.
- 긍정적인 내용뿐 아니라 객관적인 관점과 성장 방향도 함께 제시합니다.
- 각 질문은 제목을 포함하여 작성하고 충분한 근거와 예시를 들어 설명합니다.

다음 질문에 답해주세요.

1. **그래서 나는 어떤 사람으로 보일까?**
   - 테스트 작성자와 주변 사람들의 선택을 종합했을 때 사람들은 이 사람을 어떤 이미지와 분위기의 사람으로 인식하고 있을까요?

2. **내가 생각하는 나와 사람들이 보는 나는 얼마나 다를까?**
   - 테스트 작성자가 중요하게 생각하는 자신의 모습과 실제 주변 사람들이 느끼는 모습 사이에는 어떤 공통점과 차이가 있나요?

3. **사람들은 나에게 어떤 역할을 기대할까?**
   - 반복적으로 선택된 단어들을 바탕으로 사람들이 이 사람에게 기대하는 역할이나 관계 속 이미지를 설명해주세요.

4. **내가 모르고 있던 나의 반전 매력이나 가능성은 무엇일까?**
   - 테스트 작성자는 선택하지 않았지만 주변 사람들이 반복적으로 선택한 단어를 중심으로 숨겨진 강점, 잠재력, 반전 매력을 설명해주세요.

5. **앞으로 어떤 점을 의식하면 더 좋은 관계와 성장을 만들 수 있을까?**
   - 현재 결과를 바탕으로 인간관계와 자기 성장 측면에서 실천해볼 만한 행동이나 태도를 현실적으로 제안해주세요.

아래 JSON 데이터를 기반으로 분석해주세요.

\`\`\`json
${JSON.stringify(data, null, 2)}
\`\`\`

추가 고려사항

- 응답 빈도(Count)와 응답 비율(Percent)를 함께 고려하여 분석해주세요.
- 반복적으로 높은 비율을 보이는 단어는 더 높은 신뢰도로 해석해주세요.
- 응답자가 매우 많은 경우에는 다양한 관계의 사람들이 포함되어 특징이 평균화(희석)될 수 있다는 점도 함께 고려하여 해석해주세요.
- 결과는 절대적인 성격 진단이 아니라, 현재 주변 사람들이 인식하는 모습을 탐색하기 위한 참고 자료로 설명해주세요.`;
}
