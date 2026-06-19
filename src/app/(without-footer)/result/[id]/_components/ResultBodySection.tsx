import JohariPanel from "@/components/mirrow/JohariPanel";
import { ResultModel } from "@/types";

type ResultBodySectionProps = {
    resultModel: ResultModel;
    responseCount: number;
}

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
            <JohariPanel type="hidden" words={hidden.map((word) => ({ word: word.korean, variant: "outline-muted" }))} />
            <JohariPanel type="unknown" words={unknown.map((word) => ({ word: word.korean, variant: "outline-muted" }))} locked={responseCount < 5} />
        </div>
    )
}
