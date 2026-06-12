import type { Metadata } from "next";
import { getTestOwnerInfo } from "@/actions/tests";
import ResponseClientPage from "./_components/ResponseClientPage";

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const { name } = await getTestOwnerInfo(id);
    const title = `${name}님의 Mirrow에 응답해주세요`;
    const url = `https://mirrow.kr/response/${id}`;
    return {
        title,
        openGraph: {
            title,
            description: "타인의 시선으로 발견하는 나 — 조하리 창 기반 자기 인식 도구",
            url,
        },
    };
}

export default async function ResponsePage({ params }: Props) {
    const { id } = await params;
    const testOwnerInfo = await getTestOwnerInfo(id);

    return (
        <ResponseClientPage ownerInfo={testOwnerInfo} />
    );
}
