'use client'
import ErrorPage from "@/components/layout/ErrorPage";

export default function Error({ error }: { error: Error, reset: () => void }) {
    return (
        <ErrorPage
            message={error.message}
            buttonText="홈으로 돌아가기"
            onButtonClick={() => window.location.href = '/'}
        />
    )
}