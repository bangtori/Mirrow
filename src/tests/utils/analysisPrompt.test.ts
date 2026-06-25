import { describe, expect, test } from 'vitest';

import { words } from '@/data/words';
import type { TestResult, Word } from '@/types';
import {
  createAnalysisPromptData,
  createAnalysisPromptText,
} from '@/utils/analysisPrompt';

const getWord = (id: number): Word => {
  const word = words.find((item) => item.id === id);

  if (!word) {
    throw new Error(`테스트 단어를 찾을 수 없습니다: ${id}`);
  }

  return word;
};

const ownerWords = [7, 32, 46, 42, 45, 57].map(getWord);

const responseWordIds = [
  [7, 25, 27, 32, 42, 46],
  [7, 25, 27, 32, 42, 55],
  [7, 25, 27, 32, 46, 55],
  [7, 25, 27, 42, 46, 55],
  [7, 25, 32, 42, 46, 55],
  [7, 27, 32, 42, 46, 55],
  [7, 25, 27, 32, 42, 55],
  [25, 27, 32, 42, 46, 55],
];

const mockResult: TestResult = {
  ownerInfo: {
    id: 'test-id',
    name: '방유빈',
    result_token: 'result-token',
    is_active: true,
    self_words: ownerWords,
  },
  responses: responseWordIds.flatMap((response) => response.map(getWord)),
};

describe('createAnalysisPromptData', () => {
  test('Owner 정보를 프롬프트 데이터로 변환한다', () => {
    const result = createAnalysisPromptData(mockResult);

    expect(result.owner).toEqual({
      name: '방유빈',
      selectedWords: [
        '유쾌한',
        '관찰력 좋은',
        '현실적인',
        '반응이 빠른',
        '시선을 의식하는',
        '내향·외향 균형형',
      ],
    });
  });

  test('응답자 수를 계산한다', () => {
    const result = createAnalysisPromptData(mockResult);

    expect(result.respondentCount).toBe(8);
  });

  test('응답 단어별 count와 percent를 계산한다', () => {
    const result = createAnalysisPromptData(mockResult);

    expect(result.respondentWords).toEqual(
      expect.arrayContaining([
        { word: '유쾌한', count: 7, percent: 87.5 },
        { word: '친절한', count: 7, percent: 87.5 },
        { word: '논리적인', count: 7, percent: 87.5 },
        { word: '관찰력 좋은', count: 7, percent: 87.5 },
        { word: '반응이 빠른', count: 7, percent: 87.5 },
        { word: '따뜻한', count: 7, percent: 87.5 },
        { word: '현실적인', count: 6, percent: 75 },
      ]),
    );
  });

  test('응답 단어를 count 내림차순, 같은 count에서는 id 오름차순으로 정렬한다', () => {
    const result = createAnalysisPromptData(mockResult);

    expect(result.respondentWords.map((item) => item.word)).toEqual([
      '유쾌한',
      '친절한',
      '논리적인',
      '관찰력 좋은',
      '반응이 빠른',
      '따뜻한',
      '현실적인',
    ]);
  });

  test('응답자가 없으면 빈 응답 목록을 반환한다', () => {
    const result = createAnalysisPromptData({
      ...mockResult,
      responses: [],
    });

    expect(result.respondentCount).toBe(0);
    expect(result.respondentWords).toEqual([]);
  });

  test('응답 단어 수가 6의 배수가 아니면 오류를 던진다', () => {
    expect(() =>
      createAnalysisPromptData({
        ...mockResult,
        responses: mockResult.responses.slice(0, 5),
      }),
    ).toThrow('응답한 단어의 개수가 올바르지 않습니다.');
  });
});

describe('createAnalysisPromptText', () => {
  test('분석 지시문과 JSON 데이터를 포함한 프롬프트를 생성한다', () => {
    const data = createAnalysisPromptData(mockResult);
    const prompt = createAnalysisPromptText(data);

    expect(prompt).toContain(
      '당신은 조하리 창(Johari Window) 관점을 바탕으로 자기 인식 데이터를 분석하는 전문 분석가입니다.',
    );
    expect(prompt).toContain('```json');
    expect(prompt).toContain(JSON.stringify(data, null, 2));
    expect(prompt).toContain('추가 고려사항');
    expect(prompt).toContain(
      '응답자가 매우 많은 경우에는 다양한 관계의 사람들이 포함되어 특징이 평균화(희석)될 수 있다는 점도 함께 고려하여 해석해주세요.',
    );
    expect(prompt).toContain(
      '결과는 절대적인 성격 진단이 아니라, 현재 주변 사람들이 인식하는 모습을 탐색하기 위한 참고 자료로 설명해주세요.',
    );
  });
});
