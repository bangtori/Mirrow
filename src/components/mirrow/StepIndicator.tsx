import { Fragment } from "react/jsx-runtime";

interface StepIndicatorProps {
    currentStep: number;
}

const steps = [
    "소개", "단어 선택", "링크 발급"
];

const MAX_STEP = steps.length;

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
    return (
        <div className="flex w-full justify-between">
            {steps.map((step, index) => (
                <Fragment key={index}>
                    <div className="flex flex-col items-center gap-1 w-16">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${currentStep > index ? "bg-accent text-white" : "border border-border text-muted bg-card2"}`}>
                            {index + 1}
                        </div>
                        <p>{step}</p>
                    </div>
                    {index < MAX_STEP - 1 && <div className="flex-1 mx-2 mt-3.5 h-[0.5px] bg-border" />}
                </Fragment>
            ))}
        </div>
    )
}
