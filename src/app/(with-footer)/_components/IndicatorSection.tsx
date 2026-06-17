import StepIndicator from '@/components/mirrow/StepIndicator'

export default function IndicatorSection({ currentStep }: { currentStep: number }) {
    return (
        <>
            <div className="flex py-5 px-4 w-full max-w-sm mx-auto">
                <StepIndicator currentStep={currentStep} />
            </div>
            <div className="border-b border-border"></div>
        </>
    )
}
