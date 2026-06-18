import LandingClientPage from "./_components/LandingClientPage";
import { selectableWords } from "@/data/words";

export default function Home() {
  return (
    <LandingClientPage words={selectableWords} />
  );
}
