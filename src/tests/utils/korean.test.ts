import { describe, expect, test } from 'vitest';
import { getObjectParticle } from '@/utils/korean';
// 검증 테스트
// 1. 받침이 있는 경우 -> 을
// 2. 받침이 없는 경우 -> 를
// 3. 겹받침인 경우 -> 을
// 4. 빈 문자열 -> 를
// 5. 한글이 아닌 경우 -> 를
// 6. 띄어쓰기가 있는 경우 -> 마지막 글자 기준
// 7. 후행 공백이 있는 경우 -> 공백 무시

describe('getObjectParticle', () => {
  describe('단일 받침 테스트', () => {
    test('마지막 글자에 받침이 있으면 을을 반환한다', () => {
      expect(getObjectParticle('책')).toBe('을');
    });

    test('마지막 글자에 받침이 없으면 를을 반환한다', () => {
      expect(getObjectParticle('바다')).toBe('를');
    });
  });

  describe('겹받침 테스트', () => {
    test('겹받침이 있으면 을을 반환한다 - ㄹㄱ', () => {
      expect(getObjectParticle('삵')).toBe('을');
    });
    test('겹받침이 있으면 을을 반환한다 - ㄹㅁ', () => {
      expect(getObjectParticle('삶')).toBe('을');
    });
    test('겹받침이 있으면 을을 반환한다 - ㅂㅅ', () => {
      expect(getObjectParticle('값')).toBe('을');
    });
    test('겹받침이 있으면 을을 반환한다 - 앉', () => {
      expect(getObjectParticle('앉')).toBe('을');
    });
  });

  describe('한글이 아닌 경우 (예외 테스트)', () => {
    test('빈 문자열이면 를을 반환한다', () => {
      expect(getObjectParticle('')).toBe('를');
    });

    test('마지막 글자가 영어면 를을 반환한다', () => {
      expect(getObjectParticle('test')).toBe('를');
    });

    test('마지막 글자가 숫자 를을 반환한다', () => {
      expect(getObjectParticle('123')).toBe('를');
    });

    test('마지막 글자가 특수문자면 를을 반환한다', () => {
      expect(getObjectParticle('@#$%')).toBe('를');
    });

    test('마지막 글자가 이모지면 를을 반환한다', () => {
      expect(getObjectParticle('🤖')).toBe('를');
    });
  });

  describe('띄어쓰기가 있는 경우', () => {
    test('띄어쓰기가 있는 경우 마지막 글자를 기준으로 을/를을 판단한다', () => {
      expect(getObjectParticle('테스트 123')).toBe('를');
    });
    test('띄어쓰기가 있는 경우 마지막 글자를 기준으로 을/를을 판단한다', () => {
      expect(getObjectParticle('테스트 🤖')).toBe('를');
    });
    test('띄어쓰기가 있는 경우 마지막 글자를 기준으로 을/를을 판단한다', () => {
      expect(getObjectParticle('테스트 @#$%')).toBe('를');
    });

    test('띄어쓰기가 있는 경우 마지막 글자를 기준으로 을/를을 판단한다', () => {
      expect(getObjectParticle('하얀 우유')).toBe('를');
    });
    test('띄어쓰기가 있는 경우 마지막 글자를 기준으로 을/를을 판단한다', () => {
      expect(getObjectParticle('빨간 물감')).toBe('을');
    });
  });

  test('후행 공백은 무시하고 조사 판단을 한다', () => {
    expect(getObjectParticle('사자 ')).toBe('를');

    expect(getObjectParticle('물감 ')).toBe('을');
  });
});
