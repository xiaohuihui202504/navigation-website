import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '个人导航 - 我的收藏网站',
  description: '256 个精心收集的网站链接，涵盖 AI 工具、开发工具、云服务等 12 个分类',
  keywords: '导航, 网站收藏, AI 工具, 开发工具, 云服务',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  );
}
