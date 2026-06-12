import type { Metadata } from "next";
import { getVisitorResult } from "@/actions/response";
import { calculateVisitorComparison } from "@/utils/johari";
import VisitorViewClientPage from "./_components/VisitorViewClientPage";

type VisitorViewPageProps = {
    params: Promise<{ testId: string }>
    searchParams: Promise<{ responseToken?: string }>
}

export async function generateMetadata({ params, searchParams }: VisitorViewPageProps): Promise<Metadata> {
    const { testId } = await params;
    const { responseToken } = await searchParams;
    const url = `https://mirrow.kr/view/${testId}`;

    if (!responseToken) {
        return { title: "Mirrow 결과" };
    }

    try {
        const result = await getVisitorResult(testId, responseToken);
        const title = `${result.name}님의 Mirrow 결과`;
        return {
            title,
            openGraph: {
                title,
                description: "타인의 시선으로 발견하는 나 — 조하리 창 기반 자기 인식 도구",
                url,
                images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
            },
        };
    } catch {
        return { title: "Mirrow 결과" };
    }
}

export default async function VisitorViewPage({ params, searchParams }: VisitorViewPageProps) {
    const { testId } = await params;
    const { responseToken } = await searchParams;

    if (!responseToken) {
        throw new Error('잘못된 접근입니다.');
    }

    const result = await getVisitorResult(testId, responseToken);
    const visitorComparison = calculateVisitorComparison(result.selfWords, result.words);


    return (
        <VisitorViewClientPage name={result.name} visitorComparison={visitorComparison} />
    )
}
