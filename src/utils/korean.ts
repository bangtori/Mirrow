export function getObjectParticle(word: string): '을' | '를' {
  const normalizedWord = word.trim();

  if (!normalizedWord) return '를';

  const lastChar = normalizedWord[normalizedWord.length - 1];
  const code = lastChar.charCodeAt(0);

  // 한글 음절 범위: 가 ~ 힣
  if (code < 0xac00 || code > 0xd7a3) {
    return '를';
  }

  const hasFinalConsonant = (code - 0xac00) % 28 !== 0;

  return hasFinalConsonant ? '을' : '를';
}
