import Button from "../ui/Button";

type ErrorPageProps = {
    message: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function ErrorPage({ message, buttonText, onButtonClick }: ErrorPageProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            {/* TODO: - 나중에 Mirrow 전용 아이콘 만들어서 넣기 */}
            <p className="font-body font-black text-xl">{message}</p>
            {buttonText && onButtonClick && (
                <Button onClick={onButtonClick}>{buttonText}</Button>
            )}
        </div>
    )
}
