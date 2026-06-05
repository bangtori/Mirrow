import { Word } from './word';

export type TestResultDTO = {
  id: string;
  name: string;
  result_token: string;
  is_active: boolean;
  self_words: number[];
  responses: ResponseDTO[];
};

export type ResponseDTO = {
  id: string;
  test_id: string;
  words: number[]; // id 배열
};

export type TestResult = {
  ownerInfo: TestOwner;
  responses: Word[]; // 전체 응답자 단어 flat
};

export type TestOwner = {
  id: string;
  name: string;
  result_token: string;
  is_active: boolean;
  self_words: Word[];
};

export type WordResult = {
  word: Word;
  percentage: number;
};

export type JohariResult = {
  open: WordResult[];
  blind: WordResult[];
  hidden: Word[];
  unknown: Word[];
};

export type ResultModel = {
  responses_count: number;
  result: JohariResult;
};
