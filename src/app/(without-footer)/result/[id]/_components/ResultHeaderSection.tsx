import Badge, { Variant } from "@/components/ui/Badge";
import Image from "next/image";
type ResultHeaderSectionProp = {
    name: string;
    responseCount: number;
};
type ResponseStatus = {
    message: string;
    variant?: Variant;
};

function getResponseStatus(count: number): ResponseStatus {
    if (count <= 2) {
        return {
            message: '조하리 창 미리보기',
        };
    }

    if (count <= 8) {
        return {
            message: '권장 응답 수 달성',
        };
    }

    return {
        message: '충분한 응답이 모였어요',
    };
}
export default function ResultHeaderSection({ name, responseCount }: ResultHeaderSectionProp) {
    const { message } = getResponseStatus(responseCount);
    return (
        <section className="-mx-6 flex flex-col md:flex-row gap-4 items-center py-5 md:py-10 px-6 border-b border-border">
            <Image
                src="/images/logo.png"
                alt="로고 이미지"
                width={50}
                height={50}
            />
            <div className="flex flex-col gap-2">
                <h1 className="text-heading-md font-display md:text-heading-lg">{name}님의 Mirrow</h1>
                <div className="flex flex-col md:flex-row items-center gap-2">
                    <Badge>{responseCount}명 응답 · {message}</Badge>
                    <p className="text-body-md text-muted md:text-body-lg">조하리 창 결과</p>
                </div>
            </div>
        </section>
    )
}
