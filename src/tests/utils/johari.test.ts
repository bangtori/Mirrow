import { describe, expect, test } from 'vitest';
import { calcJohariResult } from '@/utils/johari';
import { Word } from '@/types';
import { words } from '@/data/words';

// 검증 테스트
// 1. self_words가 6개가 아니면 에러
// 2. responses가 6의 배수가 아니면 에러
// 3. 정상 입력이면 4영역 분류
// 4. responses_count 계산
// 5. percentage 계산
// 6. responses가 0개일 때 결과

const selfWords: Word[] = [
  { id: 1, english: 'able', korean: '재능있는' },
  { id: 2, english: 'accepting', korean: '포용적인' },
  { id: 3, english: 'adaptable', korean: '융통성 있는' },
  { id: 4, english: 'bold', korean: '용기 있는' },
  { id: 5, english: 'calm', korean: '차분한' },
  { id: 6, english: 'caring', korean: '배려심있는' },
];

const responses: Word[] = [
  { id: 4, english: 'bold', korean: '용기 있는' },
  { id: 5, english: 'calm', korean: '차분한' },
  { id: 6, english: 'caring', korean: '배려심있는' },
  { id: 7, english: 'cheerful', korean: '유쾌한' },
  { id: 8, english: 'clever', korean: '영리한' },
  { id: 9, english: 'congenial', korean: '마음이 맞는' },
  { id: 10, english: 'complex', korean: '복잡한, 생각이 많은' },
  { id: 11, english: 'confident', korean: '자신감 있는' },
  { id: 12, english: 'dependable', korean: '믿음직한' },
  { id: 13, english: 'dignified', korean: '품위있는' },
  { id: 7, english: 'cheerful', korean: '유쾌한' },
  { id: 8, english: 'clever', korean: '영리한' },
];

describe('calcJohariResult', () => {
  describe('입력값 검증', () => {
    test('self_words가 6개가 아니면 에러를 던진다', () => {
      const invalidSelfWords = selfWords.slice(0, 5);
      expect(() => calcJohariResult(invalidSelfWords, responses)).toThrow(
        '6개의 자기 단어가 필요합니다.',
      );
    });
    test('responses가 6의 배수가 아니면 에러를 던진다', () => {
      const invalidResponses = responses.slice(0, 5);
      expect(() => calcJohariResult(selfWords, invalidResponses)).toThrow(
        '응답한 단어의 개수가 올바르지 않습니다.',
      );
    });
  });

  describe('결과 계산', () => {
    test('응답자 수를 계산한다', () => {
      const result = calcJohariResult(selfWords, responses);
      expect(result.responses_count).toBe(2);
    });
    test('응답 단어를 open, hidden, blind, unknown으로 분류한다', () => {
      const result = calcJohariResult(selfWords, responses);
      const totalCount =
        result.result.blind.length +
        result.result.hidden.length +
        result.result.open.length;

      expect(result.result.open.map((v) => v.word.id)).toEqual([4, 5, 6]);

      expect(result.result.hidden.map((v) => v.id)).toEqual([1, 2, 3]);

      expect(result.result.blind.map((v) => v.word.id)).toEqual([
        7, 8, 9, 10, 11, 12, 13,
      ]);

      expect(result.result.unknown.length).toBe(words.length - totalCount);
    });

    test('단어 선택 비율을 계산한다', () => {
      const result = calcJohariResult(selfWords, responses);

      expect(result.result.open).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            word: expect.objectContaining({ id: 4 }),

            percentage: 50,
          }),
        ]),
      );

      expect(result.result.open).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            word: expect.objectContaining({ id: 5 }),

            percentage: 50,
          }),
        ]),
      );

      expect(result.result.blind).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            word: expect.objectContaining({ id: 7 }),
            percentage: 100,
          }),
        ]),
      );

      expect(result.result.blind).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            word: expect.objectContaining({ id: 8 }),
            percentage: 100,
          }),
        ]),
      );
    });
  });

  describe('엣지 케이스', () => {
    test('responses가 비어있으면 hidden과 unknown만 계산한다', () => {
      const result = calcJohariResult(selfWords, []);

      expect(result.result.open).toEqual([]);
      expect(result.result.blind).toEqual([]);
      expect(result.result.hidden.length).toBe(6);
      expect(result.result.unknown.length).toBe(words.length - 6);
    });
  });
});
