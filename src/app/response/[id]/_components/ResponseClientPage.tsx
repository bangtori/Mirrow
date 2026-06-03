"use client"

import { TestOwnerSummary, Word } from "@/types";
import ResponseHeaderSection from "./ResponseHeaderSection";
import WordSelectSection from "@/components/mirrow/WordSelectSection";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import StickyCounter from "@/components/mirrow/StickyCounter";

type ResponseClientPageProps = {
    ownerInfo: TestOwnerSummary
}

export default function ResponseClientPage({ ownerInfo }: ResponseClientPageProps) {
    const router = useRouter()
    const [seletedWords, setSeletedWords] = useState<Word[]>([]);
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
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // TODO: 테스트용 로직 단어 DB 반영 로직 연결 후 제거 필요
            await new Promise((resolve) => setTimeout(resolve, 500));

            if (Math.random() < 0.1) {
                throw new Error('단어 제출에 실패했습니다.');
            }

            // TODO: 중복 체크를 위한 로컬스토리지 로직 작성 필요

            router.push(`/result/${ownerInfo.result_token}`)
        } catch (error) {
            console.log(error)
            alert("단어 제출에 실패했습니다. 다시 시도해주세요. 문제가 계속될 시 문의주세요.")
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex w-full flex-col">
            <ResponseHeaderSection name={ownerInfo.name} />
            <h2 className="py-10 px-8 border-b border-border font-black text-xl">"{ownerInfo.name}"을(를) 나타내는 단어 6개를 골라주세요.</h2>
            <WordSelectSection selectedWords={seletedWords} onSelect={handleSeletedWords} isLoading={isSubmitting} />
            <StickyCounter count={seletedWords.length} onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
    )
}
