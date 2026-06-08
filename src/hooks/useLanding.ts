import { saveTestOwner } from '@/actions/tests';
import { getStorage, setStorage, STORAGE_KEYS } from '@/lib/storage';
import { Word, Links, MirrowItem } from '@/types';
import { useEffect, useState } from 'react';

export function useLanding() {
  const [name, setName] = useState<string>('');
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [links, setLinks] = useState<Links | null>(null);
  const [isCreatingLinks, setIsCreatingLinks] = useState<boolean>(false);

  useEffect(() => {
    setLinks(null);
  }, [selectedWords]);

  const handleName = (value: string) => {
    setName(value);
  };

  const handleSelectedWords = (word: Word) => {
    setSelectedWords((prev) => {
      if (prev.some((w) => w.id === word.id)) {
        return prev.filter((w) => w.id !== word.id);
      } else {
        if (prev.length === 6) {
          return prev;
        }
        return [...prev, word];
      }
    });
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev === 3 ? 3 : ((prev + 1) as 1 | 2 | 3)));
  };

  const createLinks = async () => {
    setIsCreatingLinks(true);
    try {
      const newLinks = await saveTestOwner(name, selectedWords);
      saveLocalStorage(newLinks);
      setLinks(newLinks);
    } finally {
      setIsCreatingLinks(false);
    }
  };

  const saveLocalStorage = (link: Links) => {
    const baseUrl = window.location.origin;
    const testUrl = `${baseUrl}/response/${link.testId}`;
    const resultUrl = `${baseUrl}/result/${link.resultId}`;
    const mirrowItem: MirrowItem = {
      testId: link.testId,
      userName: name,
      resultUrl,
      responseUrl: testUrl,
      createdAt: new Date().toISOString(),
    };

    const currentList = getStorage(STORAGE_KEYS.LIST) ?? [];
    setStorage(STORAGE_KEYS.LIST, [...currentList, mirrowItem]);
  };

  return {
    name,
    selectedWords,
    currentStep,
    links,
    isCreatingLinks,
    handleName,
    handleSelectedWords,
    handleNextStep,
    createLinks,
  };
}
