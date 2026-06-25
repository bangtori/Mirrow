import type { ResponseRow, TestRow } from './database';
import { Word } from './word';

export type TestResultSelect = TestRow & {
  responses: ResponseRow[];
};

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

export type AnalysisPromptData = {
  owner: {
    name: string;
    selectedWords: string[];
  };
  respondentCount: number;
  respondentWords: {
    word: string;
    count: number;
    percent: number;
  }[];
};

export type VisitorComparison = {
  shared: Word[]; // 교집합 - 둘 다 선택
  onlyVisitor: Word[]; // 응답자만 선택
  onlyOwner: Word[]; // 출제자만 선택
};
