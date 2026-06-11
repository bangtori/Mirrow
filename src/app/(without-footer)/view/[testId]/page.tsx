import { getVisitorResult } from "@/actions/response";
import { calculateVisitorComparison } from "@/utils/johari";
import VisitorViewClientPage from "./_components/VisitorViewClientPage";

type VisitorViewPageProps = {
    params: Promise<{ testId: string }>
    searchParams: Promise<{ responseToken?: string }>
}

export default async function VisitorViewPage({ params, searchParams }: VisitorViewPageProps) {
    const { testId } = await params;
    const { responseToken } = await searchParams;

    if (!responseToken) {
        throw new Error('잘못된 접근입니다.');
    }

    const result = await getVisitorResult(testId, responseToken);
    const visitorComparison = calculateVisitorComparison(result.selfWords, result.words);


    return (
        <VisitorViewClientPage name={result.name} visitorComparison={visitorComparison} />
    )
}
