import IntroHeader from './intro/IntroHeader'
import DescriptionSection from './intro/DescriptionSection';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import IndicatorSection from './IndicatorSection';


type IntroPageProps = {
    currentStep: number;
    name: string;
    onChange: (value: string) => void;
    onNext: () => void;
    error: string | null;
}
export default function IntroPage({ currentStep, name, onChange, onNext, error }: IntroPageProps) {
    return (
        <div className='flex w-full flex-col pb-8'>
            <IntroHeader />
            <IndicatorSection currentStep={currentStep} />
            <DescriptionSection />
            <div className="px-6">
                <Input placeholder='홍길동' title='이름을 입력해주세요.' error={error} value={name} onChange={(e) => onChange(e.target.value)} />
            </div>
            <div className="px-6 mt-8">
                <Button variant="primary" size="lg" className="w-full" onClick={onNext}>다음: 단어 선택하기 </Button>
            </div>
        </div>
    )
}
