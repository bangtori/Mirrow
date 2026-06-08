import Button from "../ui/Button";

export default function Footer() {
    return (
        <footer className="text-muted mt-auto pb-8">
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold font-display text-2xl text-text">Mirrow</h2>
                        <p>v1.0.0</p>
                        <p>타인의 시선으로 발견하는 나</p>
                    </div>
                    <Button>피드백 보내기</Button>
                    <p>Mirrow는 전문 심리 검사가 아닌 자기 탐색을 위한 참고 도구입니다.</p>
                    <p>Made by Tori Yubin © 2026 Mirrow. All rights reserved.</p>

                </div>
            </div>
        </footer>
    )
}
