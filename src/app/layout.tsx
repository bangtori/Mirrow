import type { Metadata } from "next";
import "./globals.css";
import { notoSansKr, jetBrainsMono, gowunBatang } from "./fonts";

export const metadata: Metadata = {
  title: "Mirrow",
  description: "타인의 시선으로 발견하는 나 — 조하리 창 기반 자기 인식 도구",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSansKr.variable} ${jetBrainsMono.variable} ${gowunBatang.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-card px-4 lg:px-0">
        {children}
      </body>
    </html >
  );
}
