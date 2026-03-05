import type { Metadata, Viewport } from 'next'
import Script from 'next/script';
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: '관세계산기 - 수입 관세 자동 계산',
  description: '해외 직구 시 예상 관세와 부가세를 간편하게 계산하세요',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://newsioo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '관세계산기 - 수입 관세 자동 계산',
    description: '해외 직구 시 예상 관세와 부가세를 간편하게 계산하세요',
    url: '/',
    siteName: '관세계산기 - 수입 관세 자동 계산',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://newsioo.com/thumb.webp',
        width: 1200,
        height: 630,
        alt: '관세계산기 썸네일',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '관세계산기 - 수입 관세 자동 계산',
    description: '해외 직구 시 예상 관세와 부가세를 간편하게 계산하세요',
    images: ['https://newsioo.com/thumb.webp'],
  },
  authors: [{ name: '관세계산기 - 수입 관세 자동 계산' }],
  publisher: '관세계산기 - 수입 관세 자동 계산',
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  verification: {
    google: '여기에_구글_인증코드_입력',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  other: {
    "google-adsense-account": "ca-pub-5378247298190063"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '관세계산기 - 수입 관세 자동 계산',
    description: '해외 직구 시 예상 관세와 부가세를 간편하게 계산해주는 무료 계산기입니다.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://newsioo.com',
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script // Changed to Next.js Script component
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <meta name="naver-site-verification" content="89526f8a6ecae4298dcb29200f67dbc70c6c1b48" />
        <Script // Changed to Next.js Script component
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5378247298190063"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            .nav-container {
              background-color: white;
              border-bottom: 1px solid #e5e7eb;
              position: sticky;
              top: 0;
              z-index: 50;
              padding: 0 1rem;
            }
            .nav-content {
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              height: 4rem;
              align-items: center;
              justify-content: space-between;
            }
            .nav-logo {
              font-weight: bold;
              color: black;
              font-size: 1.125rem;
              text-decoration: none;
              display: flex;
              align-items: center;
            }
            .nav-links {
              display: flex;
              gap: 2rem;
            }
            .nav-link {
              text-decoration: none;
              color: #6b7280;
              font-size: 0.875rem;
              font-weight: 500;
              transition: color 0.2s;
            }
            .nav-link:hover {
              color: black;
            }
            @media (max-width: 640px) {
              .nav-links {
                gap: 0.3rem;
              }
              .nav-link {
                font-size: 0.8rem;
              }
            }
          `
        }} />
      </head>
      <body className={geist.variable}>
        {/* Global Navigation Header */}
        <nav className="nav-container">
          <div className="nav-content">
            <a href="/" className="nav-logo">
              관세계산기
            </a>
            <div className="nav-links">
              <a href="/" className="nav-link">계산기</a>
              <a href="/guide" className="nav-link">관세 가이드</a>
              <a href="/warning" className="nav-link">합산과세 주의</a>
              <a href="/qna" className="nav-link">Q&A</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
