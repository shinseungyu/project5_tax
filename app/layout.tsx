import type { Metadata } from 'next'
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
  },
  twitter: {
    card: 'summary_large_image',
    title: '관세계산기 - 수입 관세 자동 계산',
    description: '해외 직구 시 예상 관세와 부가세를 간편하게 계산하세요',
  },
  icons: {
    icon: '/favicon.ico', // 기본 아이콘 경로
  },
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
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={geist.variable}>
        {children}
      </body>
    </html>
  )
}
