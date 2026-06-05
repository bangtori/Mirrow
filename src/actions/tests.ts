'use server';

import { createClient } from '@/lib/supabase/server';
import { Links, TestOwnerSummary } from '@/types';
import { Word } from '@/types';
export async function getTestOwnerInfo(id: string): Promise<TestOwnerSummary> {
  if (!id) {
    console.error('❌ [getTestOwnerInfo] Validation Error - id 값 미존재');
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tests')
    .select('id, name, result_token, is_active')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('❌ [getTestOwnerInfo] DB 조회 에러:', error);
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  return data as TestOwnerSummary;
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
  const wordIds = self_words.map((word) => word.id);
  const { data, error } = await supabase
    .from('tests')
    .insert({
      name: name.trim(),
      self_words: wordIds,
    })
    .select('id, result_token')
    .single();

  if (error || !data) {
    console.error('❌ DB 에러:', error);
    throw new Error('테스트를 생성하는데 문제가 발생했습니다.');
  }

  const { id, result_token } = data;
  return { testId: id, resultId: result_token };
}
