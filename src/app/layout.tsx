import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'TalkBingo — 대화로 빙고를 완성하세요!',
  description: '연인, 가족, 친구와 함께하는 대화 빙고 게임. 서로에 대해 새로운 것을 발견하세요!',
  keywords: 'TalkBingo, 톡빙고, 빙고톡, 커플게임, 대화게임, 아이스브레이킹',
  openGraph: {
    title: 'TalkBingo — 대화로 빙고를 완성하세요!',
    description: '연인, 가족, 친구와 함께하는 대화 빙고 게임',
    siteName: 'TalkBingo',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
