import Image from "next/image";
import Button from "../ui/Button";

type ErrorPageProps = {
    message: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function ErrorPage({ message, buttonText, onButtonClick }: ErrorPageProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-72 gap-4 px-8 py-10">
            <Image src="/icons/error.png" alt="에러" height={100} width={100} style={{ width: "auto", height: 100 }} />
            <h1 className="font-body font-black text-xl">문제가 발생했습니다.</h1>
            <p className="font-body mb-5 w-full min-w-0 max-w-full break-all text-center text-accent">{message}</p>
            {buttonText && onButtonClick && (
                <Button onClick={onButtonClick}>{buttonText}</Button>
            )}
        </div>
    )
}
