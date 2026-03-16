import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: '중국 직구 관세계산기 | 알리익스프레스·테무 세금 한번에 확인',
  description: '알리익스프레스, 테무 등 중국 직구 시 관세와 부가세를 미리 계산하세요. $150 면세 한도, 합산과세 피하는 법, 품목별 세율까지 한번에 정리.',
  alternates: { canonical: '/china-direct' },
  openGraph: {
    title: '중국 직구 관세계산기 | 알리·테무 관세 한번에',
    description: '알리익스프레스, 테무 직구 관세와 부가세를 1초 만에 계산하세요.',
    url: '/china-direct',
    images: [{ url: 'https://newsioo.com/thumb.webp', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '알리익스프레스·테무 직구 면세 한도는 얼마인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '알리익스프레스와 테무는 모두 중국 플랫폼으로, 면세 한도는 $150입니다. 상품가 + 현지 배송비 합계가 $150 이하면 관세와 부가세가 면제됩니다.' },
    },
    {
      '@type': 'Question',
      name: '알리와 테무에서 동시에 주문하면 합산과세 되나요?',
      acceptedAnswer: { '@type': 'Answer', text: '알리와 테무는 서로 다른 쇼핑몰이므로 같은 날 입항해도 구매처가 다르면 합산과세에서 제외됩니다. 단, 같은 쇼핑몰에서 여러 번 주문한 경우는 합산 대상이 될 수 있습니다.' },
    },
    {
      '@type': 'Question',
      name: '알리·테무 관세 계산은 어떻게 하나요?',
      acceptedAnswer: { '@type': 'Answer', text: '$150 초과 시 과세가격(상품가+현지배송비)을 원화로 환산 후 품목별 관세율(8~13%)을 적용합니다. 부가세는 (과세가격+관세)×10%입니다.' },
    },
    {
      '@type': 'Question',
      name: '알리에서 5일 배송으로 여러 개 샀는데 관세 나오나요?',
      acceptedAnswer: { '@type': 'Answer', text: '네, 각각 결제했어도 한국 세관에 같은 날 도착하면 전체 금액을 합산해서 $150가 넘을 경우 관세가 부과됩니다. 주문 사이에 2~3일 간격을 두어 입항일이 겹치지 않도록 하는 것이 안전합니다.' },
    },
    {
      '@type': 'Question',
      name: '테무에서 다른 날 주문했는데 같은 날 도착할 수 있나요?',
      acceptedAnswer: { '@type': 'Answer', text: '테무는 분할 배송이 잦아서 다른 날 주문한 상품들이 같은 날 한국 세관에 도착할 수 있습니다. 주문 사이에 최소 2~3일 간격을 두고, 합산과세 계산기로 미리 위험도를 확인하세요.' },
    },
  ],
};

export default function ChinaDirectPage() {
  return (
    <div className={styles.container}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerIcon}><Calculator size={24} /></div>
          <h1 className={styles.title}>중국 직구 관세계산기</h1>
          <p className={styles.subtitle}>알리익스프레스·테무 관세·부가세 2026년 완벽 가이드</p>
        </header>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', borderRadius: '16px', padding: '28px', marginBottom: '32px', border: '2px solid #f97316', textAlign: 'center' }}>
          <p style={{ fontSize: '15px', color: '#c2410c', fontWeight: '600', marginBottom: '8px' }}>🧮 알리·테무 직구 세금, 바로 계산해보세요</p>
          <p style={{ fontSize: '13px', color: '#ea580c', marginBottom: '20px' }}>가격과 배송비를 입력하면 관세·부가세를 즉시 계산해드립니다</p>
          <Link href="/?origin=cn" style={{ display: 'inline-block', padding: '14px 32px', background: '#f97316', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '16px', textDecoration: 'none' }}>
            중국 직구 관세 바로 계산하기 →
          </Link>
        </div>

        {/* 플랫폼 비교 */}
        <div className={styles.card} style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>알리익스프레스 vs 테무 핵심 비교</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  {['항목', '알리익스프레스', '테무'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '700' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['운영사', '알리바바 그룹', 'PDD Holdings(핀둬둬)'],
                  ['발송 국가', '중국(일부 한국창고)', '주로 중국'],
                  ['면세 한도', '$150', '$150'],
                  ['가격 통화', '달러·위안화', '달러'],
                  ['배송 기간', '5~15일', '5~15일'],
                  ['합산과세 위험', '중간', '높음(분할배송 잦음)'],
                  ['반품 편의성', '중간', '중간'],
                ].map(([item, ali, temu]) => (
                  <tr key={item} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '13px' }}>{item}</td>
                    <td style={{ padding: '10px 14px' }}>{ali}</td>
                    <td style={{ padding: '10px 14px' }}>{temu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 핵심 정보 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: '면세 한도', value: '$150', desc: '두 플랫폼 동일', color: '#10b981' },
            { label: '의류 관세율', value: '13%', desc: '+ 부가세 10%', color: '#f59e0b' },
            { label: '전자기기 관세율', value: '0%', desc: '부가세 10%만', color: '#3b82f6' },
            { label: '합산과세 기준', value: '입항일', desc: '같은 쇼핑몰 주의', color: '#ef4444' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.label}</p>
              <p style={{ fontSize: '26px', fontWeight: '800', color: item.color, marginBottom: '4px' }}>{item.value}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <article className={styles.guideSection}>
          <h2>중국 직구 관세 완벽 가이드 2026</h2>

          <section>
            <h3>1. 면세 한도 $150 — 두 플랫폼 동일 적용</h3>
            <p>알리익스프레스와 테무 모두 중국에서 발송되는 제품이므로 <strong>$150 이하면 관세와 부가세가 면제</strong>됩니다. 단, 상품가 + 현지 배송비 합산 기준이며 국제 배송비(배대지 비용)는 제외됩니다.</p>
            <p style={{ background: 'var(--bg-secondary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid #f97316', fontSize: '14px' }}>
              ⚠️ 위안화로 표시된 알리 상품은 달러로 환산 시 $150를 초과할 수 있습니다. 반드시 관세계산기로 미리 확인하세요.
            </p>
          </section>

          <section>
            <h3>2. 품목별 관세율 (알리·테무 공통)</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['품목', '관세율', '부가세', '합계'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '700' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['의류·신발', '13%', '10%', '약 24%'],
                    ['가방·잡화', '8%', '10%', '약 19%'],
                    ['전자기기', '0%', '10%', '약 10%'],
                    ['장난감·완구', '8%', '10%', '약 19%'],
                    ['화장품', '6.5%', '10%', '약 17%'],
                    ['영양제·건강식품', '8%', '10%', '약 19%'],
                    ['주방·생활용품', '8%', '10%', '약 19%'],
                  ].map(([item, duty, vat, total]) => (
                    <tr key={item} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '600' }}>{item}</td>
                      <td style={{ padding: '10px 14px', color: '#ef4444' }}>{duty}</td>
                      <td style={{ padding: '10px 14px' }}>{vat}</td>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: 'var(--primary)' }}>{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3>3. 합산과세 — 알리·테무에서 가장 많이 당하는 함정</h3>
            <p>같은 쇼핑몰에서 여러 번 주문한 물건이 같은 날 한국 세관에 입항하면 금액이 합산됩니다. $80 + $80이 같은 날 도착하면 $160로 합산되어 전체 과세됩니다.</p>
            <div style={{ overflowX: 'auto', marginTop: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['상황', '합산 여부', '비고'].map(h => (
                      <th key={h} style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '700' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['알리 $80 + 테무 $80 (같은 날 입항)', '면제', '구매처 다르면 합산 제외'],
                    ['알리 1차 $80 + 알리 2차 $80 (다른 날 구매, 같은 날 입항)', '면제 가능', '구매일 증빙 시 면제'],
                    ['알리에서 한 번에 $160 구매 후 분할 배송', '부과', '원칙적 합산 대상'],
                  ].map(([s, r, n]) => (
                    <tr key={s} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '8px 12px' }}>{s}</td>
                      <td style={{ padding: '8px 12px', fontWeight: '700', color: r === '부과' ? '#ef4444' : '#10b981' }}>{r}</td>
                      <td style={{ padding: '8px 12px', fontSize: '12px', color: 'var(--text-muted)' }}>{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/combined-tax" style={{ display: 'inline-block', marginTop: '12px', padding: '10px 20px', background: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
              합산과세 계산기로 미리 확인하기 →
            </Link>
          </section>
        </article>

        {/* 합산과세 주의사항 표 */}
        <div className={styles.card} style={{ marginTop: '32px', marginBottom: '8px', border: '2px solid #ef4444' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', color: '#ef4444' }}>⚠️ 알리·테무 직구 합산과세 주의사항</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>이것만 알면 억울한 관세 폭탄 예방 가능!</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#fef2f2' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #ef4444', fontWeight: '700', width: '120px' }}>구분</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '2px solid #ef4444', fontWeight: '700' }}>알리익스프레스 / 테무 직구 시 주의점</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: '면세 한도', content: '총 결제 금액 $150 이하 (미국 외 국가 기준)', icon: '💰' },
                  { label: '합산과세', content: '다른 날 주문했어도 입항일(국내 도착일)이 같으면 관세 부과!', icon: '🚨', highlight: true },
                  { label: '꿀팁', content: '안전하게 2~3일 간격을 두고 주문하는 것이 필수', icon: '✅' },
                ].map(({ label, content, icon, highlight }) => (
                  <tr key={label} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 14px', fontWeight: '700', color: highlight ? '#ef4444' : 'var(--text-secondary)', fontSize: '13px', whiteSpace: 'nowrap' }}>{icon} {label}</td>
                    <td style={{ padding: '12px 14px', fontWeight: highlight ? '700' : '400', color: highlight ? '#ef4444' : 'inherit' }}>{content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '16px', padding: '14px 16px', background: '#fff7ed', borderRadius: '8px', borderLeft: '3px solid #f97316', fontSize: '14px', lineHeight: '1.7', color: '#7c3c1d' }}>
            <strong>솔직히 말하면,</strong> 저도 처음에 알리에서 두 번 나눠서 샀는데 같은 날 도착해서 관세 폭탄 맞은 적 있습니다. 주문일이 달랐으니까 당연히 괜찮겠지 싶었거든요. 그런데 세관은 <strong>내가 언제 결제했는지가 아니라, 물건이 한국에 언제 들어왔는지</strong>만 봅니다. 2~3일 간격 두는 거, 귀찮더라도 꼭 지키세요.
          </div>
        </div>

        {/* FAQ */}
        <article style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>자주 묻는 질문</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { q: '알리 무료배송이면 배송비를 과세가격에 포함하나요?', a: '알리익스프레스 무료배송(Free Shipping)의 경우 현지 배송비가 0원이므로 상품가만 과세가격에 포함됩니다. 한국까지의 국제 배송비는 제외됩니다.' },
              { q: '테무는 여러 상품을 한 번에 담아도 분할 배송되는데 합산과세 위험 있나요?', a: '테무는 여러 판매자 상품을 묶어서 주문해도 별도 패키지로 나눠 발송하는 경우가 많습니다. 이 패키지들이 같은 날 세관에 도착하면 같은 주문 건으로 인식되어 합산될 수 있습니다.' },
              { q: '알리 위안화 가격을 달러로 환산하는 기준은?', a: '관세청은 매주 고시환율을 발표하며, 물품이 세관에 도착하는 날 기준 주의 고시환율로 환산합니다. 결제 당시 환율과 다를 수 있으므로 위 계산기로 미리 확인하는 것이 좋습니다.' },
              { q: '알리·테무에서 전자기기 구매 시 관세가 0%인가요?', a: '노트북, 태블릿 등 전자기기는 관세 0%이며 부가세 10%만 부과됩니다. 단 $150 초과 시에만 부가세가 발생합니다. 스마트폰은 중국산도 관세 0%입니다.' },
              { q: '알리에서 5일 배송으로 여러 개 샀는데 관세 나오나요?', a: '네, 각각 결제했어도 한국 세관에 같은 날 도착하면 전체 금액을 합산해서 $150가 넘을 경우 관세가 부과됩니다. 주문 사이에 2~3일 간격을 두어 입항일이 겹치지 않도록 하는 것이 안전합니다.' },
              { q: '테무에서 다른 날 주문했는데 같은 날 도착할 수 있나요?', a: '테무는 분할 배송이 잦아서 다른 날 주문한 상품들이 같은 날 한국 세관에 도착할 수 있습니다. 주문 사이에 최소 2~3일 간격을 두고, 합산과세 계산기로 미리 위험도를 확인하세요.' },
            ].map(({ q, a }) => (
              <div key={q} style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '15px', margin: '0 0 8px', color: 'var(--text-primary)' }}><span style={{ color: 'var(--primary)', marginRight: '6px' }}>Q.</span>{q}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}><strong>A.</strong> {a}</p>
              </div>
            ))}
          </div>
        </article>

        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { href: '/us', label: '미국 직구 관세계산기' },
            { href: '/combined-tax', label: '합산과세 계산기' },
            { href: '/jikgu-guide', label: '해외직구 관세 기초' },
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
