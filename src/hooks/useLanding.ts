import { saveTestOwner } from '@/actions/tests';
import { Word, Links } from '@/types';
import { useEffect, useState } from 'react';

export function useLanding() {
  const [name, setName] = useState<string>('');
  const [seletedWords, setSeletedWords] = useState<Word[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [links, setLinks] = useState<Links | null>(null);
  const [isCreatingLinks, setIsCreatingLinks] = useState<boolean>(false);

  useEffect(() => {
    setLinks(null);
  }, [seletedWords]);

  const handleName = (value: string) => {
    setName(value);
  };

  const handleSeletedWords = (word: Word) => {
    setSeletedWords((prev) => {
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
      const newLinks = await saveTestOwner(name, seletedWords);
      setLinks(newLinks);
    } finally {
      setIsCreatingLinks(false);
    }
  };

  return {
    name,
    seletedWords,
    currentStep,
    links,
    isCreatingLinks,
    handleName,
    handleSeletedWords,
    handleNextStep,
    createLinks,
  };
}
