import { Word } from '@/types';
import { useEffect, useState } from 'react';

type Links = {
  testId: string;
  resultId: string;
};
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
      // TODO: 테스트용 로직 실제 비지니스 로직 연결 후 제거 필요
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 30% 확률로 에러 발생
      if (Math.random() < 0.3) {
        throw new Error('링크 생성에 실패했습니다.');
      }

      const generateId = () => Math.random().toString(36).slice(2, 10);

      const newLinks: Links = {
        testId: generateId(),
        resultId: generateId(),
      };

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
