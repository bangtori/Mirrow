import { Word } from './word';

export type TestResultDTO = {
  ownerInfo: TestOwnerDTO;
  responses: ResponseDTO[];
};

export type TestOwnerDTO = {
  id: string;
  name: string;
  result_token: string;
  is_active: boolean;
  self_words: string[]; // id 배열
};

export type ResponseDTO = {
  id: string;
  test_id: string;
  words: string[]; // id 배열
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
