"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Calculator, AlertTriangle, CircleCheck, RefreshCw, AlertCircle, HelpCircle, PiggyBank, Car } from "lucide-react";
import postsData from "@/data/posts.json";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import {
  PRODUCT_CATEGORIES,
  ORIGIN_COUNTRIES,
  VAT_RATE,
  VITAMIN_BOTTLE_LIMIT,
} from "@/lib/constants";
import styles from "./page.module.css";

export default function Page() {
  const { rate, rates, loading, error } = useExchangeRate();

  const [origin, setOrigin] = useState<string>("us");
  const [category, setCategory] = useState<string>("clothing");
  const [priceLocal, setPriceLocal] = useState<string>("");
  const [shippingLocal, setShippingLocal] = useState<string>("");
  const [bottleCount, setBottleCount] = useState<string>("");

  const selectedCategory = PRODUCT_CATEGORIES.find((c) => c.id === category);
  const selectedOrigin = ORIGIN_COUNTRIES.find((c) => c.id === origin);

  const result = useMemo(() => {
    const price = parseFloat(priceLocal) || 0;
    const shipping = parseFloat(shippingLocal) || 0;
    const totalLocal = price + shipping;

    if (!rates || !rate || totalLocal <= 0) {
      return null;
    }

    const dutyFreeLimit = selectedOrigin?.dutyFreeLimit ?? 150;

    let totalUSD = totalLocal;
    if (selectedOrigin?.id === "jp") {
      totalUSD = totalLocal / rates.JPY;
    } else if (selectedOrigin?.id === "cn") {
      totalUSD = totalLocal / rates.CNY;
    }

    if (totalUSD <= dutyFreeLimit) {
      return {
        isDutyFree: true,
        totalLocal,
        totalUSD,
        totalKRW: Math.round(totalUSD * rate),
        dutyFreeLimit,
      };
    }

    const dutyRate = selectedCategory ? (selectedCategory.dutyRate as any)[origin] ?? 0.08 : 0.08;
    const totalKRW = Math.round(totalUSD * rate);

    // 관세 = 과세가격(총 USD * 환율) * 관세율
    const customsDuty = Math.round(totalKRW * dutyRate);

    // 부가세 = (과세가격 + 관세) * 10%
    const vat = Math.round((totalKRW + customsDuty) * VAT_RATE);

    // 총 납부세액
    const totalTax = customsDuty + vat;

    // 총 예상 비용
    const totalCost = totalKRW + totalTax;

    return {
      isDutyFree: false,
      totalLocal,
      totalUSD,
      totalKRW,
      dutyRate,
      customsDuty,
      vat,
      totalTax,
      totalCost,
      dutyFreeLimit,
    };
  }, [priceLocal, shippingLocal, rate, rates, selectedCategory, selectedOrigin]);

  const showVitaminWarning =
    category === "vitamins" &&
    parseInt(bottleCount) > VITAMIN_BOTTLE_LIMIT;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerIcon}>
            <Calculator size={24} />
          </div>
          <h1 className={styles.title}>관세계산기 - 수입 관세 자동 계산</h1>
          <p className={styles.subtitle}>
            해외 직구 시 예상 관세와 부가세를 간편하게 계산하세요
          </p>
        </header>

        {/* Exchange Rate Status */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>환율 정보</h2>
          {loading && (
            <div className={styles.rateLoading}>
              <div className={styles.spinner} />
              환율 정보를 불러오는 중...
            </div>
          )}
          {error && (
            <div className={styles.rateError}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}
          {rates && !loading && (
            <div className={styles.rateGrid}>
              <div className={styles.rateBadge}>
                <span className={styles.rateCurrency}>USD/KRW</span>
                <span className={styles.rateValue}>{rates.KRW.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.rateBadge}>
                <span className={styles.rateCurrency}>USD/JPY</span>
                <span className={styles.rateValue}>{rates.JPY.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}</span>
              </div>
              <div className={styles.rateBadge}>
                <span className={styles.rateCurrency}>USD/CNY</span>
                <span className={styles.rateValue}>{rates.CNY.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          )}
        </div>

        {/* Origin Country */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>출발 국가</h2>
          <div className={styles.radioGroup}>
            {ORIGIN_COUNTRIES.map((country) => (
              <div key={country.id} className={styles.radioOption}>
                <input
                  type="radio"
                  id={`origin-${country.id}`}
                  name="origin"
                  value={country.id}
                  checked={origin === country.id}
                  onChange={(e) => setOrigin(e.target.value)}
                  className={styles.radioInput}
                />
                <label htmlFor={`origin-${country.id}`} className={styles.radioLabel}>
                  {country.label}
                  <span style={{ fontSize: 12, opacity: 0.7 }}>
                    ({country.id === "us" 
                      ? `$${country.dutyFreeLimit}` 
                      : rates 
                        ? `약 ${(country.dutyFreeLimit * (country.id === "jp" ? rates.JPY : rates.CNY)).toLocaleString("ko-KR", { maximumFractionDigits: 0 })}${country.currency}`
                        : `$${country.dutyFreeLimit}`} 이하 면세)
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product & Price */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>상품 정보</h2>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="category">
              품목 선택
            </label>
            <select
              id="category"
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {PRODUCT_CATEGORIES.map((cat) => {
                const rate = (cat.dutyRate as any)[origin] ?? 0.08;
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.label} (관세율 {(rate * 100).toFixed(1)}%)
                  </option>
                );
              })}
            </select>
          </div>

          {selectedCategory && (
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 16px" }}>
              {selectedCategory.description}
            </p>
          )}

          <div style={{
            fontSize: 13,
            color: "var(--text-primary)",
            marginBottom: 20,
            backgroundColor: "var(--bg-secondary)",
            padding: "10px 14px",
            borderRadius: 8,
            borderLeft: "3px solid var(--primary)"
          }}>
            💡 <strong>안내:</strong> 선택하신 <strong>출발 국가의 현지 통화({selectedOrigin?.label} {selectedOrigin?.currency})</strong>로 입력하시면, 최신 환율을 반영하여 자동으로 달러(USD) 및 원화 세액이 계산됩니다.
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="price">
                상품 가격 ({selectedOrigin?.currency || "USD"})
              </label>
              <input
                id="price"
                type="number"
                className={styles.input}
                placeholder="0"
                min="0"
                step="any"
                value={priceLocal}
                onChange={(e) => setPriceLocal(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="shipping">
                현지 배송비 ({selectedOrigin?.currency || "USD"})
              </label>
              <input
                id="shipping"
                type="number"
                className={styles.input}
                placeholder="0"
                min="0"
                step="any"
                value={shippingLocal}
                onChange={(e) => setShippingLocal(e.target.value)}
              />
            </div>
          </div>

          {/* Vitamin / Medicine bottle count */}
          {category === "vitamins" && (
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="bottles">
                {origin === "jp" ? "의약품/서플리먼트 수량" : origin === "us" ? "건강보조제 병 수" : "수량"}
              </label>
              <input
                id="bottles"
                type="number"
                className={styles.input}
                placeholder="수량 입력"
                min="1"
                value={bottleCount}
                onChange={(e) => setBottleCount(e.target.value)}
              />
            </div>
          )}

          {/* Warnings by Country and Category */}
          {showVitaminWarning && origin === "us" && (
            <div className={styles.warning}>
              <AlertTriangle size={16} className={styles.warningIcon} />
              <p className={styles.warningText}>
                미국발 비타민/건강보조제는 <strong>6병</strong>까지 개인 통관이 가능하며 별도 요건확인이 면제됩니다.<br />
                초과 시 의사 소견서 등 추가 서류가 필요하거나 폐기될 수 있습니다.
              </p>
            </div>
          )}

          {showVitaminWarning && origin === "jp" && (
            <div className={styles.warning}>
              <AlertTriangle size={16} className={styles.warningIcon} />
              <p className={styles.warningText}>
                일본발 일반의약품(위장약, 파스 등) 및 서플리먼트는 자가사용 기준 <strong>6병(개)</strong>까지 통관됩니다.<br />
                수량 초과 시 통관 보류 및 분할/폐기수수료가 발생할 수 있습니다.
              </p>
            </div>
          )}
          
          {showVitaminWarning && origin === "cn" && (
            <div className={styles.warning}>
              <AlertTriangle size={16} className={styles.warningIcon} />
              <p className={styles.warningText}>
                중국발 건강식품 및 의약품류 또한 자가사용 인정 기준인 <strong>6병(개)</strong>을 초과할 경우<br />
                통관이 지연되거나 요건확인 대상이 되어 폐기될 수 있습니다.
              </p>
            </div>
          )}

          {origin === "cn" && category === "electronics" && (
            <div className={styles.warning}>
              <AlertTriangle size={16} className={styles.warningIcon} />
              <p className={styles.warningText}>
                중국발 전자기기(스마트기기 등)는 전파법에 따라 1인당 <strong>모델별 1대</strong>만 적합성평가(인증)가 면제됩니다.<br />
                2대 이상 구매 시 통관이 불가능할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* Banner for Combined Tax Calculator */}
        <div style={{ marginTop: "24px", marginBottom: "24px", background: "linear-gradient(to right, var(--bg-card), var(--bg-page))", borderRadius: "12px", padding: "24px", border: "1px solid var(--border-color)", borderLeft: "4px solid var(--primary)", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div style={{ background: "var(--bg-secondary)", padding: "12px", borderRadius: "50%", color: "var(--primary)" }}>
              <Calculator size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "var(--text-primary)", fontWeight: "600" }}>
                내 직구 택배, 혹시 <span style={{ color: "var(--danger)" }}>합산과세</span> 대상일까?
              </h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                같은 날 여러 택배가 한국에 도착하면 예상치 못한 세금 폭탄을 맞을 수 있습니다. 결제 전 미리 여러 물품의 가격을 합산 계산해 보고 안전한지 확인해 보세요!
              </p>
              <Link href="/combined-tax" style={{ 
                display: "inline-block", 
                padding: "10px 20px", 
                backgroundColor: "var(--primary)", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "6px", 
                fontWeight: "600", 
                fontSize: "14px",
                transition: "background-color 0.2s"
              }}>
                합산과세 실시간 계산기 바로가기
              </Link>
            </div>
          </div>
        </div>

        {/* Banner for Youth Future Savings Calculator */}
        <div style={{ marginBottom: "32px", background: "linear-gradient(to right, #f0f7ff, #ffffff)", borderRadius: "12px", padding: "24px", border: "1px solid #e0e7ff", borderLeft: "4px solid #3b82f6", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div style={{ background: "#eef2ff", padding: "12px", borderRadius: "50%", color: "#3b82f6" }}>
              <PiggyBank size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#1e3a8a", fontWeight: "700" }}>
                💰 3년 만에 2,200만원? <span style={{ color: "#2563eb" }}>청년미래적금</span> 계산기
              </h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
                최고 연 16.9% 수준의 파격적인 수익률! 내가 매달 내는 돈에 정부 지원금까지 합치면 만기 때 얼마를 받을 수 있을지 지금 바로 확인해보세요.
              </p>
              <a href="https://www.fundfinpro.com/" target="_blank" rel="noopener noreferrer" style={{ 
                display: "inline-block", 
                padding: "10px 20px", 
                backgroundColor: "#2563eb", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "6px", 
                fontWeight: "600", 
                fontSize: "14px",
                transition: "background-color 0.2s"
              }}>
                만기 수령액 계산해보기 👉
              </a>
            </div>
          </div>
        </div>

        {/* Banner for Car Installment Calculator */}
        <div style={{ marginBottom: "32px", background: "linear-gradient(to right, #fdf4ff, #ffffff)", borderRadius: "12px", padding: "24px", border: "1px solid #fce7f3", borderLeft: "4px solid #ec4899", boxShadow: "var(--shadow-md)" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div style={{ background: "#fdf2f8", padding: "12px", borderRadius: "50%", color: "#ec4899" }}>
              <Car size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#831843", fontWeight: "700" }}>
                🚗 새 차 살 때 필수! <span style={{ color: "#db2777" }}>자동차 할부계산기</span>
              </h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
                복잡한 신차 할부 이자부터 선수금 비율에 따른 예상 월 납입금까지 한 번에! 호갱 당하지 않고 스마트하게 차량을 구입하기 전에 조건을 꼭 계산해 보세요.
              </p>
              <a href="https://www.carpaypro.com/" target="_blank" rel="noopener noreferrer" style={{ 
                display: "inline-block", 
                padding: "10px 20px", 
                backgroundColor: "#db2777", 
                color: "white", 
                textDecoration: "none", 
                borderRadius: "6px", 
                fontWeight: "600", 
                fontSize: "14px",
                transition: "background-color 0.2s"
              }}>
                내 차 할부금 계산해보기 👉
              </a>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && !result.isDutyFree && (
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <p className={styles.resultLabel}>총 예상 비용</p>
              <p className={styles.resultTotal}>
                {result.totalCost?.toLocaleString("ko-KR")}
                <span className={styles.resultTotalSuffix}>원</span>
              </p>
            </div>
            <div className={styles.resultBody}>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel}>상품+배송 ({selectedOrigin?.currency || "USD"})</p>
                <p className={styles.resultRowValue}>
                  {selectedOrigin?.symbol || "$"}{result.totalLocal.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel}>달러 환산액 (CIF 과세가격)</p>
                <p className={styles.resultRowValue}>
                  ${result.totalUSD.toFixed(2)}
                </p>
              </div>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel}>원화 환산 (CIF 과세가격)</p>
                <p className={styles.resultRowValue}>
                  {result.totalKRW?.toLocaleString("ko-KR")}원
                </p>
              </div>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel}>
                  관세 ({((result.dutyRate ?? 0) * 100).toFixed(1)}%)
                </p>
                <p className={styles.resultRowValue}>
                  {result.customsDuty?.toLocaleString("ko-KR")}원
                </p>
              </div>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel}>
                  부가세 (10%)
                </p>
                <p className={styles.resultRowValue}>
                  {result.vat?.toLocaleString("ko-KR")}원
                </p>
              </div>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel} style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  총 세금
                </p>
                <p className={styles.resultRowValue} style={{ color: "var(--primary)" }}>
                  {result.totalTax?.toLocaleString("ko-KR")}원
                </p>
              </div>
            </div>
          </div>
        )}

        {result && result.isDutyFree && (
          <div className={styles.dutyFreeCard}>
            <div className={styles.dutyFreeIcon}>
              <CircleCheck size={24} />
            </div>
            <p className={styles.dutyFreeTitle}>면세 대상입니다</p>
            <p className={styles.dutyFreeDesc}>
              총 {selectedOrigin?.symbol || "$"}{result.totalLocal.toLocaleString("ko-KR", { maximumFractionDigits: 2 })} (약 ${result.totalUSD.toFixed(2)})<br />
              면세 한도 {selectedOrigin?.id === "us" 
                ? `$${result.dutyFreeLimit}` 
                : rates 
                  ? `약 ${(result.dutyFreeLimit * (selectedOrigin?.id === "jp" ? rates.JPY : rates.CNY)).toLocaleString("ko-KR", { maximumFractionDigits: 0 })}${selectedOrigin?.currency}`
                  : `$${result.dutyFreeLimit}`} 이하로 관부가세가 부과되지 않습니다.<br />
              <span style={{ fontSize: 13, marginTop: 4, display: "inline-block", color: "var(--text-primary)" }}>
                예상 원화 결제액: 약 {result.totalKRW?.toLocaleString("ko-KR")}원
              </span>
            </p>
          </div>
        )}

        {/* Footer */}
        <p className={styles.footerInfo}>
          본 계산기는 참고용이며, 실제 관세 및 부가세는 관세청 기준에 따라 달라질 수 있습니다.
          정확한 세액은 관세청(customs.go.kr)에서 확인하세요.
        </p>

        {/* SEO Guide Section */}
        <article className={styles.guideSection}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', lineHeight: '1.4' }}>해외 직구 관세 및 부가세 완벽 가이드: 계산 방법부터 면세 한도까지</h2>
          <p>
            해외 직구를 이용할 때 가장 고민되는 부분은 단연 <strong>&apos;관세와 부가세&apos;</strong>입니다.
            아마존, 이베이, 알리익스프레스, 테무 등 글로벌 쇼핑몰에서 마음에 드는 상품을 발견했을 때,
            쇼핑몰 결제 금액 외에 <strong>추가로 납부해야 하는 세금</strong>을 미리 알지 못하면
            예상치 못한 세금 고지서를 받고 당황하는 상황이 생깁니다.
            특히 면세 한도($150~$200)를 조금만 초과해도 관세와 부가세가 한꺼번에 부과되기 때문에,
            <strong> 사전에 정확히 계산해보는 습관</strong>이 절약의 핵심입니다.
            본 가이드에서는 관세와 부가세의 차이, 국가별 면세 한도, 합산과세 주의사항까지
            초보 직구족도 쉽게 이해할 수 있도록 핵심만 정리해 드립니다.
          </p>

          <section>
            <h3>1. 관세와 부가세, 무엇이 다른가요?</h3>
            <ul>
              <li><strong>관세(Customs Duty):</strong> 국가 재정 수입 및 국내 산업 보호를 위해 수입 물품에 부과되는 세금입니다. 품목별로 세율(기본 8~13% 등)이 다르게 적용됩니다.</li>
              <li><strong>부가세(Value Added Tax):</strong> 수입 물품에 대해 부과되는 부가가치세로, 보통 <strong>(과세가격 + 관세)의 10%</strong>가 적용됩니다.</li>
            </ul>
          </section>

          <section>
            <h3>2. 국가별 면세 한도 (목록통관 vs 일반통관)</h3>
            <p>가장 먼저 확인해야 할 것은 내가 구매하려는 물품이 면세 범위 안에 있는지입니다.</p>
            <ul>
              <li><strong>미국 직구:</strong> 목록통관 물품에 한해 총 결제 금액 $200 이하까지 면세됩니다.</li>
              <li><strong>유럽/일본/중국(알리, 테무 등) 직구:</strong> 국가와 상관없이 총 결제 금액 $150 이하여야 관세가 면제됩니다.</li>
            </ul>
            <p className={styles.warningText}>
              <strong>주의사항:</strong> 비타민, 의약품, 향수 등 &apos;일반통관&apos; 품목은 미국에서 오더라도 $150 기준이 적용되니 반드시 확인이 필요합니다.
            </p>
          </section>

          <section>
            <h3>3. 세금 계산의 핵심, &apos;과세가격(CIF)&apos;이란?</h3>
            <p>
              많은 분이 물건값만 생각하시지만, 관세청에서 기준삼는 가격은 <strong>물품 가액 + 현지 배송비 + 현지 세금(Sales Tax) + 선편요금</strong>의 합계입니다. 실제 배송비가 아닌 관세청 고시 무게별 선편요금이 더해지므로, 계산기를 통해 미리 예측해 보는 것이 정확합니다.
            </p>
          </section>

          <section>
            <h3>4. 직구 시 가장 주의해야 할 &apos;합산과세&apos;</h3>
            <p>
              각각 다른 날 주문했더라도 입항일(한국에 들어오는 날짜)이 같다면 물품 금액이 모두 합산되어 과세될 수 있습니다. 면세 한도를 아슬아슬하게 맞춘 여러 개의 택배가 같은 날 세관에 도착하지 않도록 배송 간격을 조절하는 지혜가 필요합니다.
            </p>
          </section>

          <section>
            <h3>5. 품목별 주요 관세율 예시</h3>
            <ul>
              <li><strong>의류 및 신발:</strong> 관세 13% + 부가세 10% (약 23~25%)</li>
              <li><strong>전자기기(노트북, 스마트폰):</strong> 관세 0% + 부가세 10% (부가세만 납부)</li>
              <li><strong>향수:</strong> 60ml 초과 시 관세/부가세 및 개별소비세 부과</li>
              <li><strong>가방 및 잡화:</strong> 관세 8% + 부가세 10% (약 18~20%)</li>
            </ul>
          </section>

          <section className={styles.guideCallout}>
            <h4>💡 정확한 계산이 필요하신가요?</h4>
            <p>
              환율은 매일 변동하며 품목마다 세부 규정이 다릅니다. 저희 관세계산기는 실시간 고시환율을 적용하여 가장 정확한 예상 세액을 산출해 드립니다. 지금 바로 상단의 계산기에 구매 예정인 물품의 가격을 입력하고 세금 폭탄을 미연에 방지해 보세요!
            </p>
          </section>
        </article>

        {/* FAQ Section */}
        <article style={{ marginTop: "40px", paddingTop: "40px", borderTop: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
            <HelpCircle size={28} color="var(--primary)" />
            직구족이 가장 많이 묻는 BEST 3
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "var(--bg-card)", padding: "20px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <h3 style={{ fontSize: "16px", margin: "0 0 8px 0", color: "var(--text-primary)" }}>
                <span style={{ color: "var(--primary)", marginRight: "8px" }}>Q.</span>
                달러가 아닌 엔화나 위안화로 결제하면 어떻게 계산하나요?
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                <strong>A.</strong> 세관에서는 물건이 한국에 도착하는 날(입항일)의 '과세환율'을 기준으로 모든 금액을 확인합니다. 본 계산기에서 출발 국가를 일본이나 중국으로 선택하시면 현지 통화로 편리하게 입력하면서 예상되는 달러 환산액을 미리 확인할 수 있습니다.
              </p>
            </div>

            <div style={{ background: "var(--bg-card)", padding: "20px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <h3 style={{ fontSize: "16px", margin: "0 0 8px 0", color: "var(--text-primary)" }}>
                <span style={{ color: "var(--primary)", marginRight: "8px" }}>Q.</span>
                배대지(배송대행지) 요금도 세금 부과 기준(과세가격)에 포함되나요?
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                <strong>A.</strong> 아닙니다. 면세 한도($150 또는 $200)를 계산할 때나 세금을 책정할 때, 여러분이 배대지에 지불하는 국제 배송비는 포함되지 않습니다. 오직 접속하신 해외 쇼핑몰에 지불한 총 금액(물건값 + 현지 배송비 + 현지 세금)이 기준이 됩니다.
              </p>
            </div>

            <div style={{ background: "var(--bg-card)", padding: "20px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              <h3 style={{ fontSize: "16px", margin: "0 0 8px 0", color: "var(--text-primary)" }}>
                <span style={{ color: "var(--primary)", marginRight: "8px" }}>Q.</span>
                목록통관과 일반통관의 차이가 무엇인가요?
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                <strong>A.</strong> <strong>목록통관</strong>은 의류, 신발 등 위험성이 낮은 물품을 서류만으로 빠르게 통관시키는 제도입니다(미국 $200 면세). <strong>일반통관</strong>은 영양제, 의약품, 식품 등 세관의 직접 확인이 필요한 품목으로, 전 세계 어디서 오든 무조건 $150가 면세 한도입니다. 일반통관 품목이 하나라도 섞여 있다면 전체 택배가 일반통관($150 한도)으로 취급되니 주의하세요.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/qna" style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.2s"
            }}>
              더 많은 Q&A 보러가기 👉
            </Link>
          </div>
        </article>

        {/* 게시판 최신 글 섹션 */}
        <article style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>📋 직구 정보 게시판</h2>
            <Link href="/board" style={{ fontSize: '13px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>전체 글 보기 →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(postsData as any[]).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3).map((post: any) => (
              <Link key={post.id} href={`/board?id=${post.id}`} style={{ textDecoration: 'none', display: 'block', padding: '16px 20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '999px', fontWeight: '600' }}>{post.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.date}</span>
                </div>
                <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{post.title}</p>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{post.summary}</p>
              </Link>
            ))}
          </div>
        </article>

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
      </div>
    </div>
  );
}
