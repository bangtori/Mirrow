import { Word } from './word';

export type UserResponse = {
  test_id: string;
  words: Word[];
};

export type ResponseToken = {
  visitor_token: string;
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
