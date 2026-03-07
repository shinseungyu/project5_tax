"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Link from 'next/link';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>직구 면세 한도 & 관세 가이드</h1>
          <p className={styles.subtitle}>
            국가별 면세 기준과 주의해야 할 통관 규정을 확인하세요.
          </p>
        </header>
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
          <button
            onClick={() => setActiveTab("tab1")}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === "tab1" ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === "tab1" ? 'white' : 'var(--text-secondary)',
              fontWeight: activeTab === "tab1" ? '600' : '500',
              cursor: 'pointer',
              boxShadow: activeTab === "tab1" ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            목록통관 vs 일반통관 기준
          </button>
          <button
            onClick={() => setActiveTab("tab2")}
            style={{
               padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === "tab2" ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === "tab2" ? 'white' : 'var(--text-secondary)',
              fontWeight: activeTab === "tab2" ? '600' : '500',
              cursor: 'pointer',
              boxShadow: activeTab === "tab2" ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            합산과세 피하는 법
          </button>
          <button
            onClick={() => setActiveTab("tab3")}
            style={{
               padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === "tab3" ? 'var(--primary)' : 'var(--bg-card)',
              color: activeTab === "tab3" ? 'white' : 'var(--text-secondary)',
              fontWeight: activeTab === "tab3" ? '600' : '500',
              cursor: 'pointer',
              boxShadow: activeTab === "tab3" ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            주요 품목별 관/부가세율 표
          </button>
        </div>

        {/* Tab Content */}
        <article className={styles.guideSection} style={{ marginTop: '0', paddingTop: '16px', borderTop: 'none' }}>
          {activeTab === "tab1" && (
            <section style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
              <h2>목록통관 vs 일반통관, 1분 만에 완벽 정리</h2>
              <p>해외직구를 시작할 때 가장 먼저 알아야 할 핵심 개념입니다. 내가 구매하는 품목이 어디에 속하느냐에 따라 면세 한도가 달라집니다.</p>
              
              <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead style={{ background: 'var(--bg-card)', borderBottom: '2px solid var(--border-color)' }}>
                    <tr>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)', width: '25%' }}>구분</th>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)', width: '35%' }}>목록통관</th>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)', width: '40%' }}>일반통관</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-secondary)' }}>미국 발송 한도</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600' }}>$200 이하 면세</td>
                      <td style={{ padding: '12px 16px', color: 'var(--danger)', fontWeight: '600' }}>$150 이하 면세</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-page)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-secondary)' }}>기타 국가 한도<br/><span style={{fontSize: '11px'}}>(유럽, 일본, 중국 등)</span></td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '500' }}>$150 이하 면세</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: '500' }}>$150 이하 면세</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-secondary)' }}>대표 품목</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>의류, 신발, 가방, 완구 일부, 서적</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>의약품, 건강식품류, 향수, 입에 닿는 모든 것</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.guideCallout} style={{ background: 'var(--danger-light)', border: '1px solid var(--danger-border)' }}>
                <h4 style={{ color: 'var(--danger)' }}>🚨 주의! 세금 폭탄 맞기 쉬운 '일반통관' 예외 품목 LIST</h4>
                <p style={{ marginBottom: '12px' }}>미국 아마존 등에서 $200 이하로 샀더라도, <strong>아래 품목이 장바구니에 단 1개라도 포함</strong>되면 전체 주문 건이 '일반통관($150 한도)'으로 강등되어 세금을 내야 합니다.</p>
                <ul style={{ margin: '0', paddingLeft: '20px', color: 'var(--danger)' }}>
                  <li><strong>비타민 및 건강보조제:</strong> 영양제, 다이어트 보충제, 오메가3 등</li>
                  <li><strong>향수:</strong> 금액 한도와 별개로 용량(60ml 이하 1병) 제한 있음</li>
                  <li><strong>가공식품 (먹는 것 전부):</strong> 과자, 젤리, 초콜릿, 커피, 차, 소스류 등</li>
                  <li><strong>의약외품/일반의약품:</strong> 파스, 연고, 반창고, 렌즈 세척액 등</li>
                  <li><strong>화장품 일부:</strong> 기능성 화장품, 태반/스테로이드 함유 화장품</li>
                  <li><strong>그 외:</strong> 주류, 담배, 야생동물 관련 제품 등</li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === "tab2" && (
            <section style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
              <h2>합산과세 피하는 법 (입항일 주의사항)</h2>
              <p>직구족들이 가장 흔하게 겪는 실수이자, 가장 억울하게 세금을 내게 되는 원인 1위가 바로 <strong>'합산과세'</strong>입니다.</p>
              
              <div style={{ background: 'var(--bg-page)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', margin: '20px 0' }}>
                <h3 style={{ marginTop: '0', fontSize: '16px', color: 'var(--primary)' }}>⚠️ 합산과세란?</h3>
                <p style={{ margin: '8px 0 0', fontSize: '15px' }}>서로 다른 날, 서로 다른 쇼핑몰에서 물건을 주문했더라도 <strong>비행기나 배가 한국에 도착하는 날(입항일)이 같으면</strong> 모든 결제 금액을 하나로 합쳐서 세금을 매기는 제도입니다.</p>
              </div>

              <h3>억울한 세금을 피하는 가장 안전한 가이드</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: '0' }}>
                <li style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>📦</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>1. 무조건 '통관 완료' 후 다음 주문하기</strong>
                    <span style={{ fontSize: '14px' }}>먼저 주문한 첫 번째 물건이 한국 세관을 무사히 통과하여 **'통관 완료(반출)'** 상태가 된 것을 확인한 후에 다음 물건을 결제하거나 배송 대행지에 배송 요청을 하세요.</span>
                  </div>
                </li>
                <li style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ fontSize: '20px' }}>✈️</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px', color: 'var(--text-primary)', marginBottom: '4px' }}>2. 출발 국가가 같다면 특히 주의!</strong>
                    <span style={{ fontSize: '14px' }}>미국 아마존에서 산 물건 1개($150)와 미국 이베이에서 산 물건 1개($100)가 같은 날 한국에 들어오면 총합 $250이 되어 세금 폭탄을 맞습니다. (단, 출발 국가가 다르면 합산되지 않습니다. 예: 미국 $150 + 일본 $100 = 합산 안됨)</span>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {activeTab === "tab3" && (
            <section style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
              <h2>주요 품목별 직구 관세 및 부가세율 표</h2>
              <p>면세 한도를 초과했을 때 부과되는 세금은 품목마다 다릅니다. 직구족들이 가장 많이 구매하는 필수 품목들의 세율을 한눈에 확인하세요.</p>
              
              <div style={{ overflowX: 'auto', margin: '24px 0', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '14px' }}>
                  <thead style={{ background: 'var(--bg-card)', borderBottom: '2px solid var(--border-color)' }}>
                    <tr>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)' }}>결제 품목</th>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)' }}>관세율</th>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--text-primary)' }}>부가세율</th>
                      <th style={{ padding: '12px 16px', fontWeight: '600', color: 'var(--primary)', background: 'var(--primary-light)' }}>총 세율 (대략)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-primary)' }}>의류 및 패션잡화</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>13%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>10%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600', background: 'var(--primary-light)' }}>약 25%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-page)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-primary)' }}>신발 (스니커즈 등)</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>13%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>10%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600', background: 'var(--primary-light)' }}>약 25%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-primary)' }}>전자제품 (스마트폰/PC)</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>0%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>10%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600', background: 'var(--primary-light)' }}>10%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-page)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-primary)' }}>가구 / 완구 / 서적</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>0~8%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>0~10%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600', background: 'var(--primary-light)' }}>0~18%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--text-primary)' }}>가방 및 지갑</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>8%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>10%</td>
                      <td style={{ padding: '12px 16px', color: 'var(--primary)', fontWeight: '600', background: 'var(--primary-light)' }}>약 18.8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={styles.guideCallout}>
                <h4>💡 명심하세요! "관세만 내면 끝나는 게 아닙니다"</h4>
                <p style={{ margin: '8px 0', lineHeight: '1.6' }}>많은 직구 초보자들이 '관세 13%'만 생각하고 예산을 짜다가 세금 고지서를 받고 당황합니다.<br/>한국 세관에 세금을 낼 때는 항상 <strong>'관세 + 부가세(10%)'</strong> 두 가지 항목이 청구된다는 공식을 기억해야 합니다.</p>
                
                <div style={{ background: 'var(--bg-card)', padding: '12px 16px', borderRadius: '6px', marginTop: '12px', border: '1px dashed var(--primary)' }}>
                  <strong style={{ color: 'var(--primary)' }}>✅ 세금 폭탄 피하는 공식 (의류 13% 기준)</strong>
                  <br/>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>1단계 (관세 대상액) = 과세가격 × 관세율(13%)</span><br/>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>2단계 (부가세 대상액) = (과세가격 + 관세) × 부가세율(10%)</span><br/>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '600' }}>총 결제 세금 = 관세 + 부가세 (최종적으로 원금의 약 25% 부과됨)</span>
                </div>
              </div>
            </section>
          )}

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
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
        </article>
      </div>

      {/* 정책 링크 푸터 */}
      <footer style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a href="/privacy-policy" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>개인정보 처리방침</a>
          <a href="/terms-of-service" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>이용약관</a>
          <a href="/cookie-policy" style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'none' }}>쿠키 정책</a>
        </nav>
        <p style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
          © 2026 newsioo.com · 문의: tlsfkaus0711@gmail.com
        </p>
      </footer>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
