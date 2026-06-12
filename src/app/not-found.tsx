import ErrorPage from "@/components/layout/ErrorPage";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-dvh">
            <ErrorPage message="페이지를 찾을 수 없습니다." />
            <Link href="/">
                <Button>홈으로 돌아가기</Button>
            </Link>
        </div>
    );
}
