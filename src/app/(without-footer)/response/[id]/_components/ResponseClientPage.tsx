"use client"

import { TestOwnerSummary, Word } from "@/types";
import ResponseHeaderSection from "./ResponseHeaderSection";
import WordSelectSection from "@/components/mirrow/WordSelectSection";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import StickyCounter from "@/components/mirrow/StickyCounter";
import { getStorage, setStorage, STORAGE_KEYS } from "@/lib/storage";
import { saveResponse } from "@/actions/response";

type ResponseClientPageProps = {
    ownerInfo: TestOwnerSummary
}

export default function ResponseClientPage({ ownerInfo }: ResponseClientPageProps) {
    const router = useRouter()
    const [selectedWords, setSelectedWords] = useState<Word[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasResponded, setHasResponded] = useState<boolean>(false);

    useEffect(() => {
        const mirrowList = getStorage(STORAGE_KEYS.LIST) ?? [];
        const respondedList = getStorage(STORAGE_KEYS.RESPONDED) ?? [];
        const isOwner = mirrowList.some((item) => item.testId === ownerInfo.id);
        const hasResponded = respondedList.includes(ownerInfo.id) || isOwner;
        setHasResponded(hasResponded)
    }, [ownerInfo.id]);

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

    const handleSubmit = async () => {
        const respondedList = getStorage(STORAGE_KEYS.RESPONDED) ?? [];
        setIsSubmitting(true);
        try {
            await saveResponse({ test_id: ownerInfo.id, words: selectedWords });
            setStorage(STORAGE_KEYS.RESPONDED, [...respondedList, ownerInfo.id]);
            router.push(`/result/${ownerInfo.result_token}`)
        } catch (error) {
            console.error(error)
            alert("단어 제출에 실패했습니다. 다시 시도해주세요. 문제가 계속될 시 문의주세요.")
        } finally {
            setIsSubmitting(false);
        }
    };

    // 이미 응답한 사람의 경우
    if (hasResponded) {
        return (
            <div className="flex w-full flex-col">
                <ResponseHeaderSection name={ownerInfo.name} />
                <h2 className="py-10 px-8 font-black text-xl">이미 응답한 Mirrow에요.</h2>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col">
            <ResponseHeaderSection name={ownerInfo.name} />
            <h2 className="py-10 px-8 border-b border-border font-black text-xl">"{ownerInfo.name}"을(를) 나타내는 단어 6개를 골라주세요.</h2>
            <WordSelectSection selectedWords={selectedWords} onSelect={handleSelectedWords} isLoading={isSubmitting} />
            <StickyCounter count={selectedWords.length} onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
    )
}
