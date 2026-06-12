import type { Metadata } from "next";
import ResultClientPage from "./_components/ResultClientPage";
import { getResult } from "@/actions/result";
import { getOwnerNameByResultToken } from "@/actions/tests";
import { calcJohariResult } from "@/utils/johari";

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const name = await getOwnerNameByResultToken(id);
    const title = `${name}님의 Mirrow`;
    const url = `https://mirrow.kr/result/${id}`;
    return {
        title,
        openGraph: {
            title,
            description: "타인의 시선으로 발견하는 나 — 조하리 창 기반 자기 인식 도구",
            url,
            images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
        },
    };
}

export default async function ResultPage({ params }: Props) {
    const { id } = await params;
    const result = await getResult(id);
    const resultModel = calcJohariResult(result.ownerInfo.self_words, result.responses);

    return (
        <ResultClientPage data={resultModel} ownerName={result.ownerInfo.name} testId={result.ownerInfo.id} />
    );
}
