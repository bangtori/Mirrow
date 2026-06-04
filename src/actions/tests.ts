'use server';

import { createClient } from '@/lib/supabase/server';
import { Links, TestOwnerSummary } from '@/types';
import { Word } from '@/types';
export async function getTestOwnerInfo(id: string): Promise<TestOwnerSummary> {
  // TODO: Test용 목업 로직, 실제 DB 연동 후 삭제 예정
  const MOCK_DATA: TestOwnerSummary = {
    id: 'pemncwkx',
    name: '유빈',
    result_token: '9h5vjbcd',
    is_active: true,
  };
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (id !== MOCK_DATA.id) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  if (Math.random() < 0.1) {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }

  return MOCK_DATA;
}

export async function saveTestOwner(
  name: string,
  self_words: Word[],
): Promise<Links> {
  // Validation
  if (!name.trim() || self_words.length === 0) {
    throw new Error('이름과 단어 선택은 필수입니다.');
  }

  if (self_words.length !== 6) {
    throw new Error('6개의 단어를 선택해야 합니다.');
  }

  // Insert
  const supabase = await createClient();
  const wordIds = self_words.map((word) => word.id.toString());
  const { data, error } = await supabase
    .from('tests')
    .insert({
      name: name.trim(),
      self_words: wordIds,
    })
    .select('id, result_token');

  if (error || !data || data.length === 0) {
    console.error('❌ DB 에러:', error);
    throw new Error('테스트를 생성하는데 문제가 발생했습니다.');
  }

  const { id, result_token } = data[0];
  return { testId: id, resultId: result_token };
}
