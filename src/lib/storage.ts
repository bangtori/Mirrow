import { MirrowItem } from '@/types';

export const STORAGE_KEYS = {
  RESPONDED: 'mirrow_responded',
  LIST: 'mirrow_list',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

type StorageValueMap = {
  mirrow_responded: string[];
  mirrow_list: MirrowItem[];
};

export function setStorage<K extends StorageKey>(
  key: K,
  value: StorageValueMap[K],
) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage<K extends StorageKey>(
  key: K,
): StorageValueMap[K] | null {
  const value = localStorage.getItem(key);
  try {
    if (!value) return null;
    return JSON.parse(value) as StorageValueMap[K];
  } catch (error) {
    console.error('❌ [getStorage] Error parsing value:', error);
    return null;
  }
}
