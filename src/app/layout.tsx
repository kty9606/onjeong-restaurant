import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '온정 (溫庭) | 따뜻한 모던 한식 다이닝',
  description: '제철 식재료와 정성으로 빚어낸 정갈한 모던 한식 다이닝 온정(溫庭)',
  openGraph: {
    title: '온정 (溫庭) | 따뜻한 모던 한식 다이닝',
    description: '제철 식재료와 정성으로 빚어낸 정갈한 모던 한식 다이닝 온정(溫庭)',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-[#faf8f5] text-[#2b241f]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
