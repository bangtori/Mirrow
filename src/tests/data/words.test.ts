import { describe, expect, test } from 'vitest';
import { selectableWords, wordMap, words } from '@/data/words';

describe('words', () => {
  test('신규 선택 목록에서 legacy 단어 id 23을 제외한다', () => {
    expect(selectableWords.some((word) => word.id === 23)).toBe(false);
    expect(selectableWords.some((word) => word.korean === '총명한')).toBe(false);
  });

  test('결과 표시용 전체 단어 매핑에서는 legacy 단어 id 23을 유지한다', () => {
    expect(words.some((word) => word.id === 23)).toBe(true);
    expect(wordMap.get(23)).toEqual(
      expect.objectContaining({
        id: 23,
        english: 'intelligent',
        korean: '총명한',
      }),
    );
  });
});
