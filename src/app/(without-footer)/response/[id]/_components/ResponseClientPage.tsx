"use client"

import { TestOwnerSummary, Word } from "@/types";
import ResponseHeaderSection from "./ResponseHeaderSection";
import WordSelectSection from "@/components/mirrow/WordSelectSection";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import StickyCounter from "@/components/mirrow/StickyCounter";
import { getStorage, setStorage, STORAGE_KEYS } from "@/lib/storage";
import { saveResponse } from "@/actions/response";
import { getObjectParticle } from "@/utils/korean";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/actions/events";
import { EVENT_NAMES } from "@/types/events";

type ResponseClientPageProps = {
    ownerInfo: TestOwnerSummary;
    words: Word[];
}

export default function ResponseClientPage({ ownerInfo, words }: ResponseClientPageProps) {
    const router = useRouter()
    const [selectedWords, setSelectedWords] = useState<Word[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [hasResponded, setHasResponded] = useState<boolean>(false);

    useEffect(() => {
        void trackEvent(EVENT_NAMES.RESPONSE_PAGE_VIEWED, ownerInfo.id);
    }, [ownerInfo.id]);

    useEffect(() => {
        const timerId = window.setTimeout(() => {
            const mirrowList = getStorage(STORAGE_KEYS.LIST) ?? [];
            const respondedList = getStorage(STORAGE_KEYS.RESPONDED) ?? [];
            const isOwner = mirrowList.some((item) => item.testId === ownerInfo.id);
            const hasResponded = respondedList.includes(ownerInfo.id) || isOwner;
            setHasResponded(hasResponded)
        }, 0);

        return () => window.clearTimeout(timerId);
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
            const responseToken = await saveResponse({ test_id: ownerInfo.id, words: selectedWords });
            setStorage(STORAGE_KEYS.RESPONDED, [...respondedList, ownerInfo.id]);
            router.push(`/view/${ownerInfo.id}?responseToken=${responseToken.visitor_token}`)
        } catch (error) {
            console.error(error)
            alert("단어 제출에 실패했습니다. 다시 시도해주세요. 문제가 계속될 시 문의주세요.")
        }
        // 작업 완료 후 페이지 이동까지의 간격에서 버튼이 활성화 상태가 되어 제거 -> 이지가 이동되면 어차피 컴포넌트가 언마운트됨
        // finally {
        //     setIsSubmitting(false);
        // }
    };

    // 이미 응답한 사람의 경우
    if (hasResponded) {
        return (
            <div className="flex w-full flex-col">
                <ResponseHeaderSection name={ownerInfo.name} />
                <h2 className="py-10 px-8 font-black text-xl">이미 응답한 Mirrow에요.</h2>
                <div className="px-8 pb-10">
                    <Button className="w-full" onClick={() => router.push("/")}>처음으로 돌아가기</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col">
            <ResponseHeaderSection name={ownerInfo.name} />
            <h2 className="py-10 px-8 border-b border-border font-black text-xl">&quot;{ownerInfo.name}&quot;{getObjectParticle(ownerInfo.name)} 나타내는 단어 6개를 골라주세요.</h2>
            <WordSelectSection words={words} selectedWords={selectedWords} onSelect={handleSelectedWords} isLoading={isSubmitting} />
            <StickyCounter count={selectedWords.length} onSubmit={handleSubmit} isLoading={isSubmitting} />
        </div>
    )
}
