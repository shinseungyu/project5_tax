"use client";

import styles from "../page.module.css";
import Link from 'next/link';

export default function WarningPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>직구 합산과세 주의사항</h1>
          <p className={styles.subtitle}>
            가장 억울하게 세금을 내는 원인 1위, 합산과세 폭탄 피하는 특급 노하우
          </p>
        </header>

        <article className={styles.guideSection} style={{ marginTop: '32px' }}>
          
          <section style={{ animation: 'fadeIn 0.3s ease-in-out', marginBottom: '40px' }}>
            <h2>⚠️ 합산과세란 정확히 무엇인가요?</h2>
            <p>
              쇼핑몰이나 주문한 날짜가 다르더라도, <strong>같은 국가에서 출발한 두 개 이상의 화물이 '같은 날짜에 한국(입항일)'에 도착</strong>할 경우, 세관에서는 이를 하나의 화물로 간주하여 <strong>모든 결제 금액을 합산해 관세와 부가세를 매기는 제도</strong>를 말합니다.
            </p>
            <div className={styles.guideCallout} style={{ background: 'var(--danger-light)', border: '1px solid var(--danger-border)' }}>
               <h4 style={{ color: 'var(--danger)', marginBottom: '8px' }}>🚨 직구 초보 단골 실수 케이스</h4>
               <ul style={{ margin: '0', paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.6' }}>
                 <li>11월 20일: 아마존에서 <strong>$150 의류</strong> 구매 (미국 출발)</li>
                 <li>11월 22일: 폴로 공홈에서 <strong>$100 신발</strong> 구매 (미국 출발)</li>
                 <li><strong style={{ color: 'var(--danger)' }}>결과: 각각 따로 사서 면세 한도($200) 이내였지만, 한국에 11월 26일 같은 날 도착 ➔ 총합 $250로 합산되어 세금 폭탄!</strong></li>
               </ul>
            </div>
          </section>

          <section style={{ animation: 'fadeIn 0.3s ease-in-out', marginBottom: '40px' }}>
            <h2>🚫 합산과세가 무서운 진짜 이유</h2>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 16px 0', fontSize: '15px' }}>
                합산과세 대상이 되면, <strong style={{color: 'var(--primary)'}}>$200을 넘은 초과분(예: $50)에 대해서만 세금을 내는 것이 아닙니다.</strong>
              </p>
              <h3 style={{ marginTop: '0', fontSize: '16px', color: 'var(--danger)' }}>전체 금액 ($250 전체) + 선편 요금</h3>
              <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                이 모든 합산 금액을 과세표준으로 삼아 관세(약 13%)와 부가세(10%)를 몽땅 때려 맞게 됩니다. 직구로 아낀 돈보다 세금을 훨씬 더 많이 내는 배보다 배꼽이 큰 상황이 발생합니다.
              </p>
            </div>
          </section>

          <section style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            <h2>🛡️ 100% 안전하게 합산과세 피하는 3가지 공식</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div style={{ background: 'var(--bg-page)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--success)', display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>1️⃣</span>
                <div>
                  <h3 style={{ marginTop: '0', fontSize: '16px', color: 'var(--text-primary)' }}>무조건 '통관 완료' 후 다음 물건 결제하기</h3>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    가장 안전한 방법입니다. 먼저 주문한 물건이 한국 세관을 무사히 통과하여 <strong>배송 조회에서 '반출(통관 완료)' 처리된 것을 직접 확인</strong>한 후에 다음 물건을 구매하거나 배대지 배송비를 결제하세요.
                  </p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-page)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>2️⃣</span>
                <div>
                  <h3 style={{ marginTop: '0', fontSize: '16px', color: 'var(--text-primary)' }}>출발 국가가 다르면 합산되지 않는다</h3>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <strong>같은 날 한국에 도착하더라도 출발한 나라가 다르면 합산과세 대상이 아닙니다.</strong><br/>
                    (예시: 미국에서 산 영양제 $100 + 일본에서 산 파스 $80 = 같은 날 들어와도 <strong>각각 면세 통과</strong>)
                  </p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-page)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f59e0b', display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '24px' }}>3️⃣</span>
                <div>
                  <h3 style={{ marginTop: '0', fontSize: '16px', color: 'var(--text-primary)' }}>수취인(받는 사람)을 다르게 설정하기</h3>
                  <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    동일한 국가에서 산 물건이 부득이하게 같은 날 들어올 것 같다면, <strong>받는 사람의 이름, 개인통관고유부호, 전화번호, 주소</strong> 중 하나라도 다르면 다른 사람의 화물로 인정되어 합산되지 않습니다. (주로 가족 명의 활용)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.guideCallout} style={{ marginTop: '40px' }}>
             <h4 style={{ fontSize: '16px', fontWeight: '600' }}>💡 합산과세 걱정 없이 스마트하게 쇼핑하세요</h4>
             <p style={{ marginTop: '8px' }}>
               입항일만 하루 이틀 겹치지 않게 조절하면 억울한 세금을 막을 수 있습니다. 구매하기 전 <strong>관세계산기</strong> 탭에서 물품 총액을 면세 한도 이내로 쪼개어 구매하는 계획을 세워보세요!
             </p>
             <div style={{ marginTop: '16px', textAlign: 'center' }}>
               <Link href="/" style={{ 
                 display: 'inline-block', 
                 padding: '12px 24px', 
                 background: 'var(--primary)', 
                 color: 'white', 
                 borderRadius: '8px',
                 textDecoration: 'none',
                 fontWeight: '600',
                 boxShadow: 'var(--shadow-md)'
                }}>
                 관세 계산기 바로가기
               </Link>
             </div>
          </section>

        </article>
      </div>
    </div>
  );
}
