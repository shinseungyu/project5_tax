import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: '미국 직구 관세계산기 | 2026 아마존·이베이 관세·부가세 계산',
  description: '미국 직구(아마존, 이베이 등) 관세와 부가세를 미리 계산하세요. $200 면세 한도(목록통관), 품목별 관세율, FTA 적용 여부까지 미국 직구 세금 완벽 가이드.',
  alternates: { canonical: '/us' },
  openGraph: {
    title: '미국 직구 관세계산기 | 2026 아마존·이베이 관세 계산',
    description: '미국 직구 관세와 부가세를 1초 만에 계산하세요. $200 면세 한도 기준 아마존·이베이 직구 완벽 가이드.',
    url: '/us',
    images: [{ url: 'https://newsioo.com/thumb.webp', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '미국 직구 면세 한도는 얼마인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '미국 직구는 목록통관 품목 기준 $200 이하면 관세와 부가세가 면제됩니다. 단 영양제·의약품 등 일반통관 품목은 $150 기준이 적용됩니다.' },
    },
    {
      '@type': 'Question',
      name: '아마존 직구 관세는 어떻게 계산하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '$200 초과 시 과세가격(상품가+현지배송비)에 품목별 관세율(0~13%)을 적용합니다. 한미 FTA로 의류·신발 등은 관세가 0%입니다. 부가세는 (과세가격+관세)×10%입니다.' },
    },
    {
      '@type': 'Question',
      name: '한미 FTA로 미국 직구 관세가 0%인 품목은?',
      acceptedAnswer: { '@type': 'Answer', text: '한미 FTA 협정으로 미국산 의류, 신발, 가방, 전자기기 대부분이 관세 0%입니다. 다만 일부 품목은 원산지 증명서가 필요하며, 관세가 0%여도 부가세(10%)는 부과됩니다.' },
    },
    {
      '@type': 'Question',
      name: '아마존에서 두 번 나눠 샀는데 같은 날 배대지에서 출발하면 합산과세 되나요?',
      acceptedAnswer: { '@type': 'Answer', text: '배대지에서 합포장하면 세관이 하나의 화물로 처리해 합산과세가 될 수 있습니다. 배대지 이용 시 화물을 따로따로 출발시키거나, 두 배송 사이에 2~3일 이상 간격을 두어 입항일이 겹치지 않게 하세요.' },
    },
    {
      '@type': 'Question',
      name: '미국 직구 후 반품하면 납부한 관세를 돌려받을 수 있나요?',
      acceptedAnswer: { '@type': 'Answer', text: '네, 관세를 납부한 물품을 반품하면 관세 환급 신청이 가능합니다. 수입신고필증을 보관하고 반품 완료 후 세관에 환급 신청하면 납부한 관세를 돌려받을 수 있습니다.' },
    },
  ],
};

export default function USPage() {
  return (
    <div className={styles.container}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerIcon}><Calculator size={24} /></div>
          <h1 className={styles.title}>미국 직구 관세계산기</h1>
          <p className={styles.subtitle}>2026년 아마존·이베이 직구 관세·부가세 완벽 계산 가이드</p>
        </header>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: '16px', padding: '28px', marginBottom: '32px', border: '2px solid #3b82f6', textAlign: 'center' }}>
          <p style={{ fontSize: '15px', color: '#1d4ed8', fontWeight: '600', marginBottom: '8px' }}>🧮 미국 직구 세금, 지금 바로 계산해보세요</p>
          <p style={{ fontSize: '13px', color: '#2563eb', marginBottom: '20px' }}>상품 가격과 현지 배송비를 달러($)로 입력하면 관세·부가세를 1초 만에 계산해드립니다</p>
          <Link href="/?origin=us" style={{ display: 'inline-block', padding: '14px 32px', background: '#3b82f6', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '16px', textDecoration: 'none' }}>
            미국 직구 관세 바로 계산하기 →
          </Link>
        </div>

        {/* 핵심 정보 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: '목록통관 면세 한도', value: '$200', desc: '미국만 $200 면세', color: '#10b981' },
            { label: '일반통관 면세 한도', value: '$150', desc: '영양제·의약품 등', color: '#f59e0b' },
            { label: 'FTA 의류 관세', value: '0%', desc: '한미 FTA 적용', color: '#3b82f6' },
            { label: '부가세', value: '10%', desc: '과세가격+관세의 10%', color: '#8b5cf6' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: item.color, marginBottom: '4px' }}>{item.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <article className={styles.guideSection}>
          <h2>미국 직구 관세 완벽 가이드 2026</h2>

          <section>
            <h3>1. 미국 직구만 면세 한도가 $200인 이유</h3>
            <p>미국 직구는 한국-미국 간 특별 협정에 따라 <strong>목록통관 품목에 한해 $200 이하 면세</strong>가 적용됩니다. 다른 국가(중국, 일본, 유럽 등)는 $150이 기준이므로 미국 직구가 상대적으로 유리합니다.</p>
            <p style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #3b82f6', fontSize: '14px' }}>
              💡 단, 영양제·의약품·식품 등 <strong>일반통관 품목</strong>은 미국에서 오더라도 $150 기준이 적용됩니다.
            </p>
          </section>

          <section>
            <h3>2. 한미 FTA 적용 품목별 관세율 (2026)</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['품목', '기본 관세율', 'FTA 관세율', '부가세', '비고'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '700' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['의류·신발', '13%', '0%', '10%', 'FTA 원산지 미국산'],
                    ['가방·잡화', '8%', '0%', '10%', 'FTA 원산지 미국산'],
                    ['전자기기', '0%', '0%', '10%', '원래 무관세'],
                    ['영양제·건강식품', '8%', '0%', '10%', '$150 일반통관 기준'],
                    ['화장품', '6.5%', '0%', '10%', 'FTA 적용'],
                    ['향수 60ml 이하', '7%', '0%', '10%', '초과 시 개소세 부과'],
                  ].map(([item, base, fta, vat, note]) => (
                    <tr key={item} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '600' }}>{item}</td>
                      <td style={{ padding: '10px 14px', color: '#ef4444' }}>{base}</td>
                      <td style={{ padding: '10px 14px', color: '#10b981', fontWeight: '700' }}>{fta}</td>
                      <td style={{ padding: '10px 14px' }}>{vat}</td>
                      <td style={{ padding: '10px 14px', fontSize: '12px', color: 'var(--text-muted)' }}>{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>※ FTA 관세 0% 적용은 미국산(Made in USA) 원산지 증명 필요. 중국산 등 제3국 제조 상품은 기본 관세율 적용.</p>
          </section>

          <section>
            <h3>3. 아마존 직구 관세 계산 예시</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { title: '예시 1: 의류 $250 구매 (FTA 적용)', items: ['과세가격: $250 → 약 365,000원', '관세(FTA 0%): 0원', '부가세(10%): 36,500원', '총 세금: 36,500원'], color: '#10b981' },
                { title: '예시 2: 의류 $250 구매 (미국산 아님)', items: ['과세가격: $250 → 약 365,000원', '관세(13%): 47,450원', '부가세(10%): 41,245원', '총 세금: 88,695원'], color: '#ef4444' },
              ].map(({ title, items, color }) => (
                <div key={title} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${color}` }}>
                  <p style={{ fontWeight: '700', marginBottom: '12px', fontSize: '14px' }}>{title}</p>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px' }}>
                    {items.map((item, i) => (
                      <li key={i} style={{ marginBottom: '6px', fontWeight: i === items.length - 1 ? '700' : '400', color: i === items.length - 1 ? color : 'inherit' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3>4. 배대지(배송대행지) 이용 시 주의사항</h3>
            <p>아마존, 이베이 등은 한국 직배송이 안 되는 경우가 많아 배대지를 이용합니다. 배대지 수수료(국제 배송비)는 관세 계산 시 포함하지 않습니다. 하지만 여러 주문을 배대지에서 합포장하면 관세청이 합산과세로 처리할 수 있으니 주의하세요.</p>
          </section>
        </article>

        {/* FAQ */}
        <article style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>미국 직구 관세 자주 묻는 질문</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: '아마존에서 $199 제품 사면 진짜 관세 0원인가요?', a: '목록통관 품목이라면 맞습니다. 의류, 신발, 전자기기 등 일반 소비재가 $200 이하이면 관세와 부가세 모두 면제입니다. 단 영양제, 의약품, 식품은 $150 기준이 적용되므로 주의하세요.' },
              { q: '이베이(eBay)도 미국 직구 기준($200)이 적용되나요?', a: '네, 이베이는 미국 플랫폼이므로 미국에서 발송되는 상품은 $200 면세 기준이 적용됩니다. 단 이베이 판매자가 중국 등 다른 국가에서 발송하면 $150 기준이 적용될 수 있습니다.' },
              { q: '미국 직구 시 Sales Tax(현지 세금)도 과세가격에 포함되나요?', a: '네, 아마존 등에서 부과되는 Sales Tax는 현지에서 지불한 금액이므로 과세가격(CIF)에 포함됩니다. Sales Tax가 붙은 총 결제금액을 기준으로 면세 한도 및 관세를 계산하세요.' },
              { q: '아마존 프라임 혜택으로 현지 배송비 무료면 과세가격이 상품가만인가요?', a: '맞습니다. 아마존 프라임이나 무료 배송의 경우 현지 배송비가 0원이므로 상품가(+Sales Tax)가 과세가격입니다. 배대지까지의 국제 배송비는 과세가격에 포함하지 않습니다.' },
              { q: '아마존에서 두 번 나눠 샀는데 같은 날 배대지에서 출발하면 합산과세 되나요?', a: '배대지에서 합포장하면 세관이 하나의 화물로 처리해 합산과세가 될 수 있습니다. 배대지 이용 시 화물을 따로따로 출발시키거나, 두 배송 사이에 2~3일 이상 간격을 두어 입항일이 겹치지 않게 하세요.' },
              { q: '미국 직구 후 반품하면 납부한 관세를 돌려받을 수 있나요?', a: '네, 관세를 납부한 물품을 반품하면 관세 환급 신청이 가능합니다. 수입신고필증을 보관하고 반품 완료 후 세관에 환급 신청하면 납부한 관세를 돌려받을 수 있습니다.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '15px', margin: '0 0 8px', color: 'var(--text-primary)' }}><span style={{ color: 'var(--primary)', marginRight: '6px' }}>Q.</span>{q}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}><strong>A.</strong> {a}</p>
              </div>
            ))}
          </div>
        </article>

        {/* 관련 링크 */}
        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { href: '/aliexpress', label: '알리익스프레스 관세계산기' },
            { href: '/temu', label: '테무 관세계산기' },
            { href: '/combined-tax', label: '합산과세 계산기' },
            { href: '/guide', label: '관세 가이드' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{ display: 'block', padding: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', textAlign: 'center', color: 'var(--primary)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
              {label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
