'use client'
import ErrorPage from "@/components/layout/ErrorPage";
import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: Error, reset: () => void }) {
    const router = useRouter();
    return (
        <ErrorPage
            message={error.message}
            buttonText="홈으로 돌아가기"
            onButtonClick={() => router.push("/")}
        />
    )
}