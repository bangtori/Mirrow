import Button from "@/components/ui/Button";
import NoticeBox from "@/components/ui/NoticeBox";

export default function ErrorSection() {
    return (
        <section className="flex flex-col gap-4 py-10 px-8">
            <NoticeBox variant="danger">응답 링크 생성에 실패했어요. 다시 시도해주세요</NoticeBox>
            <Button variant="danger" appearance="outline" size="lg" onClick={() => window.location.href = "/"}>처음으로 돌아가기</Button>
        </section>
    )
}
