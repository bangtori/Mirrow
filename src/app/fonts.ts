// app/fonts.ts
import {
  Noto_Sans_KR,
  JetBrains_Mono,
  Gowun_Batang,
} from "next/font/google";

export const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const gowunBatang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-gowun-batang",
  display: "swap",
});