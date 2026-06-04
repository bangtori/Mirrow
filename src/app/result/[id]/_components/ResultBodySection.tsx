import JohariPanel from "@/components/mirrow/JohariPanel";
import { ResultModel } from "@/types";

type ResultBodySectionProps = {
    resultModel: ResultModel;
    responseCount: number;
}

const UnknownPanel = () => (<div className="flex flex-col gap-1 bg-card rounded-lg p-4 border border-border">
    <h2 className="text-xs font-bold font-mono text-muted">Unknown · 미지의 창</h2>
    <p className="text-sm font-bold">서로 모르는 나</p>
    <p className="mt-2 text-sm text-muted">응답자가 5명 이상일 때 이 영역에 단어가 표시됩니다.</p>
</div>)
export default function ResultBodySection({ resultModel, responseCount }: ResultBodySectionProps) {
    const {
        open,
        blind,
        hidden,
        unknown
    } = resultModel.result;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-10">
            <JohariPanel type="open" words={open.map(({ word, percentage }) => ({ word: word.korean, percent: percentage }))} />
            <JohariPanel type="blind" words={blind.map(({ word, percentage }) => ({ word: word.korean, percent: percentage }))} />
            <JohariPanel type="hidden" words={hidden.map((word) => ({ word: word.korean, percent: 0 }))} />
            {responseCount < 5 ? <UnknownPanel /> : <JohariPanel type="unknown" words={unknown.map((word) => ({ word: word.korean, percent: 0 }))} />}
        </div>
    )
}
