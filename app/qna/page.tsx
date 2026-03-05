"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Link from 'next/link';

export default function QnaPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      q: "Q. 면세 한도는 '물건값'만 계산하나요?",
      a: "아닙니다. 관세청이 기준으로 삼는 과세가격은 물건값에 '현지 내 배송비'와 '현지에서 발생한 세금(Sales Tax 등)'을 모두 더한 금액입니다. 예를 들어 미국에서 $190짜리 물건을 샀더라도, 미국 내 배송비가 $15 발생했다면 총 결제액이 $205가 되어 면세 한도($200)를 초과하므로 관부가세가 부과됩니다."
    },
    {
      id: 2,
      q: "Q. 가족 이름으로 각각 주문하면 합산과세를 피할 수 있나요?",
      a: "네, 맞습니다! 같은 쇼핑몰에서 같은 날 주문했고, 심지어 같은 비행기로 한국에 들어왔더라도, '받는 사람 성명'과 '개인통관고유부호'가 각각(예: 본인, 배우자, 부모님) 다르면 별개의 수입 건으로 인정되어 각각 면세 혜택을 받을 수 있습니다."
    },
    {
      id: 3,
      q: "Q. 개인통관고유부호는 꼭 필요한가요?",
      a: "네, 100% 필수입니다. 관세청이 모든 개인 수입 물품을 관리하기 위해 도입한 제도로, 직구 시 수령인 정보와 일치하는 개인통관고유부호를 입력하지 않으면 세관을 통과(반출)할 수 없습니다. 모바일 관세청 앱(APP)이나 유니패스 사이트에서 무료로 1분 만에 발급받을 수 있습니다."
    },
    {
      id: 4,
      q: "Q. 배송대행지(배대지) 배송비도 세금 계산에 포함되나요?",
      a: "포함되지 않습니다. 세금 계산 기준이 되는 총액($150 또는 $200)에는 쇼핑몰에 결제한 금액까지만 포함됩니다. 배대지에서 한국 집까지 보내주는 '국제 배송비'는 물품의 과세 여부를 결정하는 면세 한도 계산에 들어가지 않습니다."
    },
    {
      id: 5,
      q: "Q. 직구로 산 물건을 당근마켓이나 중고나라에 팔아도 되나요?",
      a: "원칙적으로 '불법'입니다. 면세로 들여온 해외 직구 물품은 '자가 사용'을 목적으로 세금을 면제받은 것이기 때문에, 되파는 행위는 '관세법 위반(밀수입죄 등)'으로 처벌받을 수 있습니다. 단, 자신이 사용할 목적으로 샀으나 사이즈 미스 등의 명백한 이유로 부득이하게 재판매할 경우 개봉하거나 사용한 중고 물품에 한해 제한적으로 허용(전자기기 제외)되는 경우가 있으나 매우 까다롭습니다."
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>직구 세금 Q&A (자주 묻는 질문)</h1>
          <p className={styles.subtitle}>
            초보 직구족이 가장 많이 헷갈려 하는 관세/부가세 궁금증 총정리
          </p>
        </header>

        <article className={styles.guideSection} style={{ marginTop: '32px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className={styles.faqCard}
                style={{
                   background: 'var(--bg-card)', 
                   border: '1px solid var(--border-color)', 
                   borderRadius: '8px', 
                   overflow: 'hidden',
                   boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div 
                  onClick={() => toggleFaq(faq.id)}
                  style={{ 
                    padding: '20px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    background: openId === faq.id ? 'var(--bg-page)' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                >
                  <h3 style={{ margin: '0', fontSize: '16px', color: 'var(--text-primary)', fontWeight: '600' }}>
                    {faq.q}
                  </h3>
                  <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>
                    {openId === faq.id ? '−' : '+'}
                  </span>
                </div>
                
                {openId === faq.id && (
                  <div style={{ 
                    padding: '20px', 
                    borderTop: '1px solid var(--border-color)', 
                    background: 'var(--bg-card)',
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    animation: 'fadeIn 0.2s ease-in'
                  }}>
                    <strong style={{ color: 'var(--primary)', marginRight: '8px', fontSize: '16px' }}>A.</strong>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <section className={styles.guideCallout} style={{ marginTop: '40px' }}>
             <h4 style={{ fontSize: '16px', fontWeight: '600' }}>💡 더 이상 직구 세금이 두렵지 않다면?</h4>
             <p style={{ marginTop: '8px' }}>
               궁금증이 모두 풀리셨나요? 이제 수백 곳이 넘는 글로벌 해외 쇼핑몰에서 안심하고 쇼핑을 즐길 시간입니다. 장바구니에 물건을 담기 전에 관세계산기로 미리 최종 비용을 확인해 보는 습관을 만들어 보세요!
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
