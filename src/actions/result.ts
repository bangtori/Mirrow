import { TestResult } from '@/types';

export async function getResult(token: string): Promise<TestResult> {
  // TODO: 실제 supabase 데이터 가져오도록 변경
  const MOCK_DATA: TestResult = {
    ownerInfo: {
      id: 'pemncwkx',
      name: '유빈',
      result_token: '9h5vjbcd',
      is_active: true,
      self_words: [
        { id: 1, english: 'able', korean: '재능있는' },
        { id: 7, english: 'cheerful', korean: '유쾌한' },
        { id: 12, english: 'dependable', korean: '믿음직한' },
        { id: 33, english: 'optimistic', korean: '낙천적인' },
        { id: 57, english: 'ambivert', korean: '내향·외향 균형형' },
        { id: 32, english: 'observant', korean: '관찰력 좋은' },
      ],
    },
    responses: [
      { id: 7, english: 'cheerful', korean: '유쾌한' },
      { id: 12, english: 'dependable', korean: '믿음직한' },
      { id: 33, english: 'optimistic', korean: '낙천적인' },
      { id: 7, english: 'cheerful', korean: '유쾌한' },
      { id: 27, english: 'logical', korean: '논리적인' },
      { id: 28, english: 'loving', korean: '애정이 많은, 다정한' },
      { id: 19, english: 'helpful', korean: '도움이 되는' },
      { id: 1, english: 'able', korean: '재능있는' },
      { id: 33, english: 'optimistic', korean: '낙천적인' },
      { id: 42, english: 'responsive', korean: '잘 반응하는, 반응이 빠른' },
      { id: 39, english: 'reflective', korean: '생각이 깊은' },
      { id: 46, english: 'sensible', korean: '현실적인, 실용적인' },
    ],
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (token !== MOCK_DATA.ownerInfo.result_token) {
    throw new Error('결과 정보를 찾을 수 없습니다.');
  }

  if (Math.random() < 0.1) {
    throw new Error('결과 정보를 가져오는데 실패했습니다.');
  }

  // TODO: 실제 연동 시 아래 로직으로 변경
  // 1. result_token으로 tests 테이블에서 해당 row 조회
  // 2. tests.id 기준으로 responses 테이블 조인 (test_id = tests.id)
  // 3. Supabase select('*, responses(*)') 형태로 한 번에 조회
  // 4. DTO → Model 변환 (string[] id 배열 → Word[] 매핑)
  // ** 필요 함수 **
  // - DTO - Model Mapping
  // - 워드의 string id를 Word로 변환
  // - 단어 카운팅을 통한 퍼센트 계산은 유틸함수로 빼서 클라이언트에서 계산
  // ** 에러 핸들링**
  // - is_active = false일 시 비활성화된 링크 처리
  // - 맵핑 실패 에러
  // - 쿼리 에러

  return MOCK_DATA;
}
