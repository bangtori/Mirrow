'use server';
import { createClient } from '@/lib/supabase/server';
import { TestResult, TestResultDTO, TestResultSelect } from '@/types';
import { mapWordIdToWord } from '@/utils/word';

export async function getResult(token: string): Promise<TestResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tests')
    .select('*, responses(*)')
    .eq('result_token', token)
    .single();

  if (error || !data) {
    throw new Error('결과 정보를 찾을 수 없습니다.');
  }

  if (!data.is_active) {
    throw new Error('비활성화된 링크입니다.');
  }

  try {
    const dtoData = mapTestResultSelectToDto(data);
    return mapDtoToModel(dtoData);
  } catch (error) {
    console.error('❌ 변환 에러:', error);
    throw new Error('결과 정보를 변환하는데 실패했습니다.');
  }
}

function mapTestResultSelectToDto(selectData: TestResultSelect): TestResultDTO {
  return {
    id: selectData.id,
    name: selectData.name,
    result_token: selectData.result_token,
    is_active: selectData.is_active,
    self_words: selectData.self_words,
    responses: selectData.responses.map((response) => ({
      id: response.id,
      test_id: response.test_id,
      words: response.words,
    })),
  };
}

function mapDtoToModel(dtoData: TestResultDTO): TestResult {
  const responseWords = dtoData.responses.flatMap((response) =>
    response.words.map((wordId) => mapWordIdToWord(wordId)),
  );

  return {
    ownerInfo: {
      id: dtoData.id,
      name: dtoData.name,
      result_token: dtoData.result_token,
      is_active: dtoData.is_active,
      self_words: dtoData.self_words.map((wordId) => mapWordIdToWord(wordId)),
    },
    responses: responseWords,
  };
}
