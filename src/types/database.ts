import type { Tables, TablesInsert, TablesUpdate } from './supabase';

export type EventRow = Tables<'events'>;
export type EventInsert = TablesInsert<'events'>;
export type EventUpdate = TablesUpdate<'events'>;

export type ResponseRow = Tables<'responses'>;
export type ResponseInsert = TablesInsert<'responses'>;
export type ResponseUpdate = TablesUpdate<'responses'>;

export type TestRow = Tables<'tests'>;
export type TestInsert = TablesInsert<'tests'>;
export type TestUpdate = TablesUpdate<'tests'>;
