export function getObjectParticle(word: string): '을' | '를' {
  if (!word) return '를';

  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);

  // 한글 음절 범위: 가(0xAC00) ~ 힣(0xD7A3)
  if (code < 0xac00 || code > 0xd7a3) {
    return '를';
  }

  const hasFinalConsonant = (code - 0xac00) % 28 !== 0;

  return hasFinalConsonant ? '을' : '를';
}
