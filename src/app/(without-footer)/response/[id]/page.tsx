import { getTestOwnerInfo } from "@/actions/tests";
import ResponseClientPage from "./_components/ResponseClientPage";

type Props = { params: Promise<{ id: string }> }
export default async function ResponsePage({ params }: Props) {
    const { id } = await params;
    const testOwnerInfo = await getTestOwnerInfo(id);

    return (
        <ResponseClientPage ownerInfo={testOwnerInfo} />
    );
}
