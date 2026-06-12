import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";

const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

export default function Footer() {
    return (
        <footer className="text-muted mt-auto pb-8">
            <div className="max-w-6xl mx-auto px-4 py-10">

                <div className="flex flex-col items-center text-center gap-4">
                    <div className="flex flex-col gap-2 items-center">
                        <Image
                            src="/images/logo_app.png"
                            alt="앱 로고 형태 로고 이미지"
                            width={50}
                            height={50}
                        />
                        <h2 className="font-bold font-display text-2xl text-text">Mirrow</h2>
                        {appVersion && <p>v{appVersion}</p>}
                        <p>타인의 시선으로 발견하는 나</p>
                    </div>
                    <Button>
                        <Link
                            href="https://forms.gle/pWBdG55Vdph24Uny8"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            피드백 보내기
                        </Link>
                    </Button>
                    <p>Mirrow는 전문 심리 검사가 아닌 자기 탐색을 위한 참고 도구입니다.</p>
                    <p>Made by Tori Yubin © 2026 Mirrow. All rights reserved.</p>

                </div>
            </div>
        </footer>
    )
}
