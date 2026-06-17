import type { Metadata, Viewport } from "next";
import "./globals.css";
import { notoSansKr, jetBrainsMono, gowunBatang } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://mirrow.kr"),
  title: "Mirrow",
  description: "타인의 시선으로 발견하는 나 — 조하리 창 기반 자기 인식 도구",
  icons: {
    icon: "/images/logo_app.png",
    apple: "/images/logo_app.png",
  },
  openGraph: {
    title: "Mirrow",
    description: "타인의 시선으로 발견하는 나 — 조하리 창 기반 자기 인식 도구",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${jetBrainsMono.variable} ${gowunBatang.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-card md:px-4 lg:px-0">
        {children}
      </body>
    </html >
  );
}
