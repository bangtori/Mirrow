import { MirrowItem } from "@/types";
import CreatedMirrowCell from "./CreatedMirrowCell";

export default function CreatedMirrowSection({ mirrowList }: { mirrowList: MirrowItem[] }) {
    const [mirrow] = mirrowList;

    if (!mirrow) return null;

    return (
        <section className="pt-5">
            <CreatedMirrowCell mirrow={mirrow} />
        </section>
    )
}
