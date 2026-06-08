'use server';
import { UserResponse } from '@/types/response';
import { createClient } from '@/lib/supabase/server';

export async function saveResponse(response: UserResponse): Promise<void> {
  // Validation
  if (!response.test_id) {
    throw new Error('응답할 대상이 없습니다.');
  }
  if (!response.words || response.words.length !== 6) {
    throw new Error('6개의 단어를 선택해야 합니다.');
  }

  const supabase = await createClient();

  // DB 저장
  const wordIds = response.words.map((word) => word.id);
  const { error } = await supabase.from('responses').insert({
    test_id: response.test_id,
    words: wordIds,
  });

  if (error) {
    console.error('❌ DB 저장 실패:', error);
    throw new Error('응답 저장 중 오류가 발생했습니다.');
  }
}
