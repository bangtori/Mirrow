'use client'
import ErrorPage from "@/components/layout/ErrorPage";
import { usePathname, useRouter } from 'next/navigation';

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleButtonClick = () => {
        if (pathname === "/") {
            reset();
            return;
        }

        router.push("/");
    };

    return (
        <ErrorPage
            message={error.message}
            buttonText="홈으로 돌아가기"
            onButtonClick={handleButtonClick}
        />
    )
}
