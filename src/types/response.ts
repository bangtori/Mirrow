import type { ResponseRow, TestRow } from './database';
import { Word } from './word';

export type UserResponse = {
  test_id: string;
  words: Word[];
};

export type ResponseToken = Pick<ResponseRow, 'visitor_token'>;

export type VisitorResultSelect = Pick<ResponseRow, 'words'> & {
  tests: Pick<TestRow, 'name' | 'self_words'>;
};

export type VisitorResultDTO = {
  words: number[];
  tests: VisitorTestDTO;
};
export type VisitorTestDTO = {
  name: string;
  self_words: number[];
};

export type VisitorResult = {
  name: string;
  words: Word[];
  selfWords: Word[];
};
