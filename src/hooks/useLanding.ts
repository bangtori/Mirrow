import { trackEvent } from '@/actions/events';
import { saveTestOwner } from '@/actions/tests';
import { getStorage, setStorage, STORAGE_KEYS } from '@/lib/storage';
import { Word, Links, MirrowItem } from '@/types';
import { EVENT_NAMES } from '@/types/events';
import { useEffect, useState } from 'react';

export function useLanding() {
  const [name, setName] = useState<string>('');
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [links, setLinks] = useState<Links | null>(null);
  const [isCreatingLinks, setIsCreatingLinks] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    setLinks(null);
  }, [selectedWords]);

  const handleName = (value: string) => {
    setName(value);
    if (nameError && value.trim()) {
      setNameError(null);
    }
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

  const handleIntroNext = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError('이름을 입력해주세요.');
      return;
    }

    setName(trimmedName);
    setNameError(null);
    handleNextStep();
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev === 3 ? 3 : ((prev + 1) as 1 | 2 | 3)));
  };

  const createLinks = async () => {
    setIsCreatingLinks(true);
    try {
      const newLinks = await saveTestOwner(name, selectedWords);
      await trackEvent(EVENT_NAMES.PROFILE_CREATED, newLinks.testId);
      addMirrowList(newLinks);
      setLinks(newLinks);
    } finally {
      setIsCreatingLinks(false);
    }
  };

  const addMirrowList = (link: Links) => {
    const testUrl = `/response/${link.testId}`;
    const resultUrl = `/result/${link.resultId}`;
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
    nameError,
    selectedWords,
    currentStep,
    links,
    isCreatingLinks,
    handleName,
    handleSelectedWords,
    handleNextStep,
    handleIntroNext,
    createLinks,
  };
}
