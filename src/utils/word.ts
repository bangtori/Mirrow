import { words } from '@/data/words';
import { Word } from '@/types';

export function mapWordIdToWord(wordId: number): Word {
  const word = words.find((w) => w.id === wordId);
  if (!word) {
    console.error('❌ [MapWordIdToWord Error] word not found - ', wordId);
    throw new Error('단어를 찾을 수 없습니다.');
  }
  return word;
}
