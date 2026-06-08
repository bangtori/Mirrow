import ResultClientPage from "./_components/ResultClientPage";
import { getResult } from "@/actions/result";
import { calcJohariResult } from "@/utils/johari";

type Props = { params: Promise<{ id: string }> }
export default async function ResponsePage({ params }: Props) {
    const { id } = await params;
    const result = await getResult(id);
    const resultModel = calcJohariResult(result.ownerInfo.self_words, result.responses);

    return (
        <ResultClientPage data={resultModel} ownerName={result.ownerInfo.name} testId={result.ownerInfo.id} />
    );
}
