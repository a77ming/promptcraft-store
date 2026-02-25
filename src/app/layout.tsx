import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PromptCraft Store - 精选 AI 提示词商店",
  description: "精选100+高质量AI提示词，覆盖写作、编程、营销、商业、设计全领域。购买即用，永久有效。",
  keywords: "AI提示词, ChatGPT提示词, Claude提示词, 提示词模板, AI工具",
  openGraph: {
    title: "PromptCraft Store - 精选 AI 提示词商店",
    description: "精选100+高质量AI提示词，覆盖写作、编程、营销、商业、设计全领域。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
