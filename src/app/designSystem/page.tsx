"use client";

import { Copy, Plus } from "lucide-react";
import { useState } from "react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import NoticeBox from "@/components/ui/NoticeBox";
import ResultChip from "@/components/ui/ResultChip";
import TrayChip from "@/components/ui/TrayChip";
import WordChip from "@/components/ui/WordChip";
import { words } from "@/data/words";

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-4 border-b border-border px-5 py-8">
            <h2 className="font-body text-heading-md font-black text-text">{title}</h2>
            {children}
        </section>
    );
}

export default function DesignSystemPage() {
    const [inputValue, setInputValue] = useState("홍길동");
    const [selectedWordIds, setSelectedWordIds] = useState<number[]>([words[0].id]);
    const [trayLabels, setTrayLabels] = useState(["차분한", "믿음직한", "따뜻한"]);

    const sampleWords = words.slice(0, 6);

    const handleWordClick = (wordId: number) => {
        setSelectedWordIds((prev) =>
            prev.includes(wordId)
                ? prev.filter((id) => id !== wordId)
                : [...prev, wordId]
        );
    };

    const handleTrayRemove = (label: string) => {
        setTrayLabels((prev) => prev.filter((item) => item !== label));
    };

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col bg-card text-text">
            <header className="border-b border-border px-5 py-8">
                <p className="font-mono text-caption-lg text-muted">/designSystem</p>
                <h1 className="mt-2 font-body text-display-md font-black text-text">디자인 시스템</h1>
            </header>

            <Section title="Button">
                <div className="flex flex-wrap items-center gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button size="sm">Small</Button>
                    <Button icon={<Copy size={16} />}>Icon</Button>
                    <Button icon={<Plus size={16} />} aria-label="추가" />
                    <Button isLoading>Loading</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Section>

            <Section title="WordChip">
                <div className="flex flex-wrap gap-2">
                    {sampleWords.map((word) => (
                        <WordChip
                            key={word.id}
                            word={word}
                            isSelected={selectedWordIds.includes(word.id)}
                            onClick={() => handleWordClick(word.id)}
                        />
                    ))}
                    <WordChip word={words[6]} disabled />
                </div>
            </Section>

            <Section title="TrayChip">
                <div className="flex flex-wrap gap-2">
                    {trayLabels.map((label) => (
                        <TrayChip
                            key={label}
                            label={label}
                            onRemove={() => handleTrayRemove(label)}
                        />
                    ))}
                    {trayLabels.length === 0 && (
                        <p className="text-body-md text-muted">선택된 칩이 없습니다.</p>
                    )}
                </div>
            </Section>

            <Section title="Badge">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="accent">accent</Badge>
                    <Badge variant="muted">muted</Badge>
                    <Badge variant="success">success</Badge>
                    <Badge variant="warn">warn</Badge>
                    <Badge variant="danger">danger</Badge>
                </div>
            </Section>

            <Section title="NoticeBox">
                <div className="flex flex-col gap-3">
                    <NoticeBox variant="info">안내 메시지입니다.</NoticeBox>
                    <NoticeBox variant="success">성공 메시지입니다.</NoticeBox>
                    <NoticeBox variant="warn">주의가 필요한 메시지입니다.</NoticeBox>
                    <NoticeBox variant="danger">오류 메시지입니다.</NoticeBox>
                </div>
            </Section>

            <Section title="Input">
                <div className="flex flex-col gap-4">
                    <Input
                        title="이름"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        maxLength={10}
                    />
                    <Input
                        title="오류 상태"
                        value=""
                        placeholder="값을 입력해주세요"
                        error="필수 입력 항목입니다."
                    />
                </div>
            </Section>

            <Section title="Card">
                <div className="grid gap-3 sm:grid-cols-2">
                    <Card variant="default">
                        <p className="font-bold">default</p>
                        <p className="text-body-md text-subtext">기본 카드입니다.</p>
                    </Card>
                    <Card variant="accent">
                        <p className="font-bold">accent</p>
                        <p className="text-body-md">강조 카드입니다.</p>
                    </Card>
                    <Card variant="accent-dim">
                        <p className="font-bold">accent-dim</p>
                        <p className="text-body-md text-subtext">연한 강조 카드입니다.</p>
                    </Card>
                    <Card variant="border">
                        <p className="font-bold">border</p>
                        <p className="text-body-md text-subtext">테두리 카드입니다.</p>
                    </Card>
                </div>
            </Section>

            <Section title="ResultChip">
                <div className="flex flex-wrap gap-2">
                    <ResultChip text="높음" percent={75} />
                    <ResultChip text="중간" percent={34} />
                    <ResultChip text="낮음" percent={0} />
                    <ResultChip text="없음" percent={null} />
                </div>
            </Section>
        </main>
    );
}
