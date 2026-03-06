import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "합산과세 계산기 - 2026 해외 직구 면세 한도 및 입항일 체크",
  description: "알리, 테무, 아마존 직구 시 합산과세 폭탄을 피하는 가장 쉬운 방법! 물품 가격만 넣으면 입항일 주의 여부를 바로 알려드립니다.",
  openGraph: {
    title: "합산과세 계산기 - 2026 해외 직구 면세 한도 및 입항일 체크",
    description: "알리, 테무, 아마존 직구 시 합산과세 폭탄을 피하는 가장 쉬운 방법! 물품 가격만 넣으면 입항일 주의 여부를 바로 알려드립니다.",
    url: "/tips",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "합산과세 계산기 - 2026 해외 직구 면세 한도 및 입항일 체크",
    description: "알리, 테무, 아마존 직구 시 합산과세 폭탄을 피하는 가장 쉬운 방법! 물품 가격만 넣으면 입항일 주의 여부를 바로 알려드립니다.",
  }
};

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
