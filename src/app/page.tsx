'use client'
import StepIndicator from "@/components/mirrow/StepIndicator";
import StickyCounter from "@/components/mirrow/StickyCounter";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NoticeBox from "@/components/ui/NoticeBox";
import ResultChip from "@/components/ui/ResultChip";
import WordChip from "@/components/ui/WordChip";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center my-10">
      <main className="flex flex-col gap-10 max-w-lg w-full">
        {/* stepper */}
          <section className="flex flex-col gap-3">
            <StepIndicator currentStep={1} />
            <StepIndicator currentStep={2} />
            <StepIndicator currentStep={3} />
          </section>
        {/* test case */}
          <StickyCounter count={3} onSubmit={() => {}} />
        <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">Buttons</h2>
        <div className="flex gap-3">
          <Button variant="primary">Button</Button>
          <Button variant="primary" appearance="outline">Button</Button>
          <Button variant="primary" appearance="ghost">Button</Button>
        </div>
        <div className="flex gap-3">
          <Button variant="danger">Button</Button>
          <Button variant="danger" appearance="outline">Button</Button>
          <Button variant="danger" appearance="ghost">Button</Button>
        </div>
        <div className="flex gap-3">
          <Button size="sm">Button</Button>
          <Button size="md">Button</Button>
          <Button size="lg">Button</Button>
        </div>
       </section>
       <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">Badges</h2>
        <div className="flex gap-3">
          <Badge variant="accent">accent</Badge>
          <Badge variant="muted">muted</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="warn">warn</Badge>
          <Badge variant="danger">danger</Badge>
        </div>
       </section>
       <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">Inputs</h2>
        <div className="flex flex-col gap-3">
          <Input title="Default" placeholder="placeholder" value="" />
          <Input title="Error" placeholder="placeholder" error="error" value="" />
        </div>
       </section>

       <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">NoticeBox</h2>
        <div className="flex flex-col gap-3">
          <NoticeBox variant="info">infoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfoinfo</NoticeBox>
          <NoticeBox variant="warn">warn</NoticeBox>
          <NoticeBox variant="danger">danger</NoticeBox>
          <NoticeBox variant="success">success</NoticeBox>
        </div>
       </section>

       <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">WordChip</h2>
        <div className="flex gap-3">
          <WordChip text="selected" isSelected />
          <WordChip text="unSelected" />
          <WordChip text="disabled" disabled />
        </div>
       </section>

       <section className="flex flex-col gap-6">
        <h2 className="font-body text-text text-4xl">ResultChip</h2>
        <div className="flex gap-3">
          <ResultChip text="high" percent={88} />
          <ResultChip text="mid" percent={50} />
          <ResultChip text="low" percent={0} />
        </div>
       </section>
      </main>
    </div>
  );
}
