import type { TestRow } from './database';

export type TestOwnerSummary = Pick<
  TestRow,
  'id' | 'name' | 'result_token' | 'is_active'
>;

export type Links = {
  testId: string;
  resultId: string;
};
