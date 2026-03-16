import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../page.module.css';

export const metadata: Metadata = {
  title: '해외직구 관세 기초 완벽 정리 | 관세란? 면세기준 계산방법',
  description: '해외직구를 시작하기 전 꼭 알아야 할 관세의 개념, 면세 기준, 계산 방법을 쉽게 정리했습니다. 초보자도 바로 이해할 수 있는 직구 관세 가이드.',
  alternates: { canonical: '/jikgu-guide' },
  openGraph: {
    title: '해외직구 관세 기초 | 관세란? 면세기준 계산방법',
    description: '직구 관세의 개념부터 계산 방법까지 초보자도 쉽게 이해할 수 있도록 정리했습니다.',
    url: '/jikgu-guide',
    images: [{ url: 'https://newsioo.com/thumb.webp', width: 1200, height: 630 }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '해외직구 관세란 무엇인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '관세는 해외에서 국내로 들어오는 물품에 부과되는 세금입니다. 국내 산업 보호와 수입 물품 관리를 위해 품목별로 8~13% 관세율이 적용됩니다. 부가세(10%)는 관세와 별도로 추가됩니다.' },
    },
    {
      '@type': 'Question',
      name: '해외직구 면세 기준은 얼마인가요?',
      acceptedAnswer: { '@type': 'Answer', text: '미국 직구는 목록통관 품목 기준 $200 이하, 그 외 국가(중국, 일본, 유럽 등)는 $150 이하면 관세가 면제됩니다. 영양제·의약품은 미국에서도 $150 기준이 적용됩니다.' },
    },
    {
      '@type': 'Question',
      name: '해외직구 관세 계산 방법은?',
      acceptedAnswer: { '@type': 'Answer', text: '관세 = 과세가격(원화) × 관세율, 부가세 = (과세가격 + 관세) × 10%, 총 세금 = 관세 + 부가세. 관세계산기에 상품가와 배송비를 입력하면 자동으로 계산됩니다.' },
    },
  ],
};

export default function JikguGuidePage() {
  return (
    <div className={styles.container}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.wrapper}>

        <header className={styles.header}>
          <h1 className={styles.title}>해외직구 관세, 처음부터 이해하기</h1>
          <p className={styles.subtitle}>관세란 무엇인지, 면세 기준은 얼마인지, 어떻게 계산하는지 한번에 정리</p>
        </header>

        {/* 목차 */}
        <nav style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '12px' }}>목차</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '#customs', label: '1. 관세란 무엇인가?' },
              { href: '#exemption', label: '2. 해외직구 면세 기준' },
              { href: '#calculate', label: '3. 관세 계산 방법' },
            ].map(({ href, label }) => (
              <a key={href} href={href} style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
                → {label}
              </a>
            ))}
          </div>
        </nav>

        {/* 1. 관세란? */}
        <article className={styles.guideSection}>
          <section id="customs">
            <h2>1. 관세란 무엇인가?</h2>
            <p>
              관세(Customs Duty)는 <strong>해외에서 국내로 들어오는 물품에 부과되는 세금</strong>입니다.
              해외직구로 물건을 살 때 쇼핑몰 결제 금액 외에 추가로 내야 하는 세금이 바로 관세입니다.
            </p>
            <p>
              관세는 두 가지 목적이 있습니다. 첫째는 <strong>국내 산업 보호</strong>로, 저렴한 해외 제품이 대거 유입되면 국내 기업이 피해를 입기 때문에 수입 제품에 세금을 붙여 가격을 조정합니다.
              둘째는 <strong>국가 재정 수입</strong>입니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '24px 0' }}>
              {[
                { label: '관세', desc: '물품 수입 시 부과', rate: '품목별 0~13%', color: '#3b82f6' },
                { label: '부가세', desc: '소비에 대한 세금', rate: '과세가격+관세의 10%', color: '#8b5cf6' },
              ].map((item) => (
                <div key={item.label} style={{ background: 'var(--bg-card)', border: `2px solid ${item.color}`, borderRadius: '12px', padding: '20px' }}>
                  <p style={{ fontSize: '18px', fontWeight: '800', color: item.color, marginBottom: '8px' }}>{item.label}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{item.desc}</p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{item.rate}</p>
                </div>
              ))}
            </div>

            <p style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', fontSize: '14px', lineHeight: '1.7' }}>
              💡 <strong>핵심:</strong> 직구 시 내는 세금 = <strong>관세 + 부가세</strong> 두 가지입니다.
              관세는 품목마다 다르고, 부가세는 대부분 10%로 동일합니다.
            </p>
          </section>

          {/* 2. 면세 기준 */}
          <section id="exemption" style={{ marginTop: '48px' }}>
            <h2>2. 해외직구 면세 기준</h2>
            <p>
              모든 직구 물품에 관세가 붙는 건 아닙니다. <strong>일정 금액 이하면 관세와 부가세 모두 면제</strong>됩니다.
              이를 면세 한도라고 하며, 국가와 통관 방식에 따라 기준이 다릅니다.
            </p>

            <div style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['구분', '미국 직구', '기타 국가', '주요 플랫폼'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: '700' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['목록통관\n(일반 소비재)', '$200 이하 면세', '$150 이하 면세', '아마존, 이베이'],
                    ['일반통관\n(먹는 것·바르는 것)', '$150 이하 면세', '$150 이하 면세', '알리, 테무, 야후재팬'],
                  ].map(([type, us, other, platform]) => (
                    <tr key={type} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600', whiteSpace: 'pre-line' }}>{type}</td>
                      <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: '700' }}>{us}</td>
                      <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: '700' }}>{other}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-muted)' }}>{platform}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', margin: '20px 0' }}>
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '10px', padding: '16px' }}>
                <p style={{ fontWeight: '700', color: '#166534', marginBottom: '8px' }}>✅ 목록통관 주요 품목</p>
                <p style={{ fontSize: '13px', color: '#15803d', lineHeight: '1.7' }}>의류, 신발, 가방, 전자기기(노트북·스마트폰), 완구, 일반 서적, 가전제품</p>
              </div>
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '16px' }}>
                <p style={{ fontWeight: '700', color: '#c2410c', marginBottom: '8px' }}>⚠️ 일반통관 주요 품목</p>
                <p style={{ fontSize: '13px', color: '#ea580c', lineHeight: '1.7' }}>영양제·건강기능식품, 의약품, 식품, 기능성 화장품, 향수</p>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              <strong>주의:</strong> 목록통관과 일반통관 품목을 한 박스에 함께 받으면 전체가 일반통관으로 처리됩니다.
              예를 들어 의류($180)와 영양제($10)를 함께 받으면 $190 전체가 일반통관 기준($150)을 초과하여 관세가 부과됩니다.
            </p>
          </section>

          {/* 3. 계산 방법 */}
          <section id="calculate" style={{ marginTop: '48px' }}>
            <h2>3. 관세 계산 방법</h2>
            <p>면세 한도를 초과한 경우 관세와 부가세를 계산해야 합니다. 공식은 간단합니다.</p>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', margin: '20px 0' }}>
              <p style={{ fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>📐 관세 계산 공식</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                <div style={{ background: 'white', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>STEP 1</span>
                  <p style={{ margin: '4px 0 0', fontWeight: '600' }}>과세가격 = (상품가 + 현지 배송비) × 환율</p>
                </div>
                <div style={{ background: 'white', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>STEP 2</span>
                  <p style={{ margin: '4px 0 0', fontWeight: '600' }}>관세 = 과세가격 × 관세율 (품목별 0~13%)</p>
                </div>
                <div style={{ background: 'white', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>STEP 3</span>
                  <p style={{ margin: '4px 0 0', fontWeight: '600' }}>부가세 = (과세가격 + 관세) × 10%</p>
                </div>
                <div style={{ background: 'var(--primary)', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>총 세금</span>
                  <p style={{ margin: '4px 0 0', fontWeight: '700', color: 'white' }}>총 납부세액 = 관세 + 부가세</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', margin: '20px 0' }}>
              <p style={{ fontWeight: '700', marginBottom: '12px' }}>실제 계산 예시: 알리에서 의류 $200 구매</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                <p>• 과세가격: $200 × 1,460원 = 292,000원</p>
                <p>• 관세(13%): 292,000 × 13% = 37,960원</p>
                <p>• 부가세(10%): (292,000 + 37,960) × 10% = 32,996원</p>
                <p style={{ fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>• 총 세금: 70,956원</p>
              </div>
            </div>

            {/* 계산기 링크 CTA */}
            <div style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: '16px', padding: '28px', textAlign: 'center', border: '2px solid var(--primary)' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', marginBottom: '8px' }}>
                직접 계산하기 귀찮으신가요?
              </p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                상품 가격과 배송비만 입력하면 관세·부가세를 자동으로 계산해드립니다.<br />
                실시간 환율도 자동 반영됩니다.
              </p>
              <Link href="/" style={{ display: 'inline-block', padding: '14px 36px', background: 'var(--primary)', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '16px', textDecoration: 'none' }}>
                관세계산기 바로 사용하기 →
              </Link>
            </div>
          </section>
        </article>

        {/* 관련 페이지 */}
        <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { href: '/china-direct', label: '알리·테무 관세계산기' },
            { href: '/us', label: '미국 직구 관세계산기' },
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
