'use server';
import {
  ResponseToken,
  UserResponse,
  VisitorResult,
  VisitorResultDTO,
} from '@/types/response';
import { createClient } from '@/lib/supabase/server';
import { mapWordIdToWord } from '@/utils/word';

export async function saveResponse(
  response: UserResponse,
): Promise<ResponseToken> {
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
  const { data, error } = await supabase
    .from('responses')
    .insert({
      test_id: response.test_id,
      words: wordIds,
    })
    .select('visitor_token')
    .single();

  if (error || !data) {
    console.error('❌ DB 저장 실패:', error);
    throw new Error('응답 저장 중 오류가 발생했습니다.');
  }

  return data as ResponseToken;
}

export async function getVisitorResult(
  testId: string,
  visitorToken: string,
): Promise<VisitorResult> {
  if (!testId || !visitorToken) {
    console.error(
      `❌ Test ID or Visitor Token is invalid : ${testId}, ${visitorToken}`,
    );
    throw new Error('잘못된 요청입니다.');
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('responses')
    .select('words, tests(name, self_words)')
    .eq('visitor_token', visitorToken)
    .eq('test_id', testId)
    .single();

  if (error || !data) {
    console.error('❌ DB 조회 실패:', error);
    throw new Error('응답 조회 중 오류가 발생했습니다.');
  }

  try {
    const dtoData = data as unknown as VisitorResultDTO;
    return mapVisitorResultDtoToModel(dtoData);
  } catch (error) {
    console.error('❌ 변환 에러:', error);
    throw new Error('결과 정보를 변환하는데 실패했습니다.');
  }
}

function mapVisitorResultDtoToModel(dtoData: VisitorResultDTO): VisitorResult {
  const selectedWords = dtoData.words.map((wordId) => mapWordIdToWord(wordId));
  const selfWords = dtoData.tests.self_words.map((wordId) =>
    mapWordIdToWord(wordId),
  );

  return {
    name: dtoData.tests.name,
    words: selectedWords,
    selfWords: selfWords,
  };
}
