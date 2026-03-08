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
  // ✅ 수정 1: keywords 추가
  keywords: ['관세계산기', '해외직구 관세', '수입 관세 계산', '부가세 계산', '직구 관세율', '면세 한도', '합산과세', '알리 관세', '테무 관세', '아마존 직구 관세'],
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
    // ✅ 수정 2: 인증코드 받으면 주석 풀고 여기 입력하세요
    // google: '여기에_구글_인증코드_입력',
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
  // ✅ 수정 3: url + offers + featureList 추가
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '관세계산기 - 수입 관세 자동 계산',
    description: '해외 직구 시 예상 관세와 부가세를 간편하게 계산해주는 무료 계산기입니다.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://newsioo.com',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: '관세 자동 계산, 부가세 계산, 국가별 면세 한도 안내, 실시간 환율 반영',
  };

  // ✅ 수정 4: FAQ 3개 → 5개로 확장
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '달러가 아닌 엔화나 위안화로 결제하면 어떻게 계산하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '세관에서는 물건이 한국에 도착하는 날(입항일)의 과세환율을 기준으로 모든 금액을 확인합니다. 본 계산기에서 출발 국가를 일본이나 중국으로 선택하시면 현지 통화로 편리하게 입력하면서 예상되는 달러 환산액을 미리 확인할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '배대지(배송대행지) 요금도 세금 부과 기준(과세가격)에 포함되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '아닙니다. 면세 한도($150 또는 $200)를 계산할 때나 세금을 책정할 때, 여러분이 배대지에 지불하는 국제 배송비는 포함되지 않습니다. 오직 접속하신 해외 쇼핑몰에 지불한 총 금액(물건값 + 현지 배송비 + 현지 세금)이 기준이 됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '목록통관과 일반통관의 차이가 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '목록통관은 의류, 신발 등 위험성이 낮은 물품을 서류만으로 빠르게 통관시키는 제도입니다(미국 $200 면세). 일반통관은 영양제, 의약품, 식품 등 세관의 직접 확인이 필요한 품목으로, 전 세계 어디서 오든 무조건 $150가 면세 한도입니다. 일반통관 품목이 하나라도 섞여 있다면 전체 택배가 일반통관($150 한도)으로 취급되니 주의하세요.',
        },
      },
      // ✅ 새로 추가 FAQ 2개
      {
        '@type': 'Question',
        name: '알리익스프레스·테무에서 구매하면 관세가 붙나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '알리익스프레스, 테무 등 중국 플랫폼은 $150 이하일 경우 면세입니다. $150 초과 시 품목에 따라 관세(8~13%)와 부가세(10%)가 부과됩니다. 여러 건을 같은 날 주문해 동시에 입항하면 합산과세 대상이 될 수 있어 주의가 필요합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '해외직구 관세 면세 한도는 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '미국 직구는 목록통관 품목 기준 $200 이하, 그 외 국가(중국, 일본, 유럽 등)는 $150 이하면 관세가 면제됩니다. 단, 영양제·의약품·식품 등 일반통관 품목은 미국에서 오더라도 $150 기준이 적용됩니다.',
        },
      },
    ],
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <Script
          id="faq-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          strategy="beforeInteractive"
        />
        <meta name="naver-site-verification" content="89526f8a6ecae4298dcb29200f67dbc70c6c1b48" />
        <Script
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
        <nav className="nav-container">
          <div className="nav-content">
            <a href="/" className="nav-logo">
              관세계산기
            </a>
            <div className="nav-links">
              <a href="/" className="nav-link">관세계산기</a>
              <a href="/combined-tax" className="nav-link">합산과세 계산기</a>
              <a href="/guide" className="nav-link">관세 가이드</a>
              <a href="/qna" className="nav-link">Q&A</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
