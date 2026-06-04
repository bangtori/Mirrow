import { words } from '@/data/words';
import { JohariResult, ResultModel, Word, WordResult } from '@/types';

export function calcJohariResult(
  self_words: Word[],
  responses: Word[],
): ResultModel {
  const responseCount = responses.length / 6;
  const selfWordIdSet = new Set(self_words.map((w) => w.id));
  const responseIdSet = new Set(responses.map((w) => w.id));
  const ALL_WORD_IDS = new Set(words.map((w) => w.id));

  const openIds = selfWordIdSet.intersection(responseIdSet);
  const hiddenIds = selfWordIdSet.difference(responseIdSet);
  const blindIds = responseIdSet.difference(selfWordIdSet);
  const unknownIds = ALL_WORD_IDS.difference(openIds)
    .difference(hiddenIds)
    .difference(blindIds);

  const johariResult: JohariResult = {
    open: [],
    blind: [],
    hidden: [],
    unknown: [],
  };

  //open
  for (const id of openIds) {
    const word = words.find((w) => w.id === id);
    if (!word) {
      continue;
    }
    johariResult.open.push({
      word,
      percentage: calcPercentage(responses, word, responseCount),
    });
  }

  //blind
  for (const id of blindIds) {
    const word = words.find((w) => w.id === id);
    if (!word) {
      continue;
    }
    johariResult.blind.push({
      word,
      percentage: calcPercentage(responses, word, responseCount),
    });
  }

  //hidden
  for (const id of hiddenIds) {
    const word = words.find((w) => w.id === id);
    if (!word) {
      continue;
    }
    johariResult.hidden.push(word);
  }

  //unknown
  for (const id of unknownIds) {
    const word = words.find((w) => w.id === id);
    if (!word) {
      continue;
    }
    johariResult.unknown.push(word);
  }
  return {
    responses_count: responseCount,
    result: johariResult,
  };
}

function calcPercentage(
  totalResponse: Word[],
  targetWord: Word,
  responseCount: number,
): number {
  const count = totalResponse.filter((r) => r.id === targetWord.id).length;
  return Math.round((count / responseCount) * 100);
}
