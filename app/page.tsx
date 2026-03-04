"use client";

import { useState, useMemo } from "react";
import { Calculator, AlertTriangle, CircleCheck, RefreshCw, AlertCircle } from "lucide-react";
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
  const [priceUSD, setPriceUSD] = useState<string>("");
  const [shippingUSD, setShippingUSD] = useState<string>("");
  const [bottleCount, setBottleCount] = useState<string>("");

  const selectedCategory = PRODUCT_CATEGORIES.find((c) => c.id === category);
  const selectedOrigin = ORIGIN_COUNTRIES.find((c) => c.id === origin);

  const result = useMemo(() => {
    const price = parseFloat(priceUSD) || 0;
    const shipping = parseFloat(shippingUSD) || 0;
    const totalUSD = price + shipping;

    if (!rate || totalUSD <= 0) {
      return null;
    }

    const dutyFreeLimit = selectedOrigin?.dutyFreeLimit ?? 150;

    if (totalUSD <= dutyFreeLimit) {
      return {
        isDutyFree: true,
        totalUSD,
        totalKRW: Math.round(totalUSD * rate),
        dutyFreeLimit,
      };
    }

    const dutyRate = selectedCategory?.dutyRate ?? 0.08;
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
      totalUSD,
      totalKRW,
      dutyRate,
      customsDuty,
      vat,
      totalTax,
      totalCost,
      dutyFreeLimit,
    };
  }, [priceUSD, shippingUSD, rate, selectedCategory, selectedOrigin]);

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
                    (${country.dutyFreeLimit} 이하 면세)
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
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} (관세율 {(cat.dutyRate * 100).toFixed(1)}%)
                </option>
              ))}
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
            💡 <strong>주의:</strong> 통관 기준에 맞춰 모든 금액은 반드시 <strong>달러(USD)</strong> 환산 금액으로 기재해 주세요.
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="price">
                상품 가격 (USD)
              </label>
              <input
                id="price"
                type="number"
                className={styles.input}
                placeholder="0.00"
                min="0"
                step="0.01"
                value={priceUSD}
                onChange={(e) => setPriceUSD(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="shipping">
                배송비 (USD)
              </label>
              <input
                id="shipping"
                type="number"
                className={styles.input}
                placeholder="0.00"
                min="0"
                step="0.01"
                value={shippingUSD}
                onChange={(e) => setShippingUSD(e.target.value)}
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
                <p className={styles.resultRowLabel}>상품+배송 (USD)</p>
                <p className={styles.resultRowValue}>
                  ${result.totalUSD.toFixed(2)}
                </p>
              </div>
              <div className={styles.resultRow}>
                <p className={styles.resultRowLabel}>원화 환산</p>
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
              총 ${result.totalUSD.toFixed(2)} (면세 한도 ${result.dutyFreeLimit} 이하)
              {" "}— 약 {result.totalKRW?.toLocaleString("ko-KR")}원
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
          <h2>해외 직구 관세 및 부가세 완벽 가이드: 계산 방법부터 면세 한도까지</h2>
          <p>
            해외 직구를 이용할 때 가장 고민되는 부분은 단연 <strong>&apos;관세와 부가세&apos;</strong>입니다. 쇼핑몰 결제 금액 외에 추가로 납부해야 하는 세금을 정확히 알지 못하면, 자칫 배보다 배꼽이 더 큰 상황이 발생할 수 있습니다. 본 가이드에서는 초보 직구족도 쉽게 이해할 수 있는 관세 계산법과 주의사항을 정리해 드립니다.
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
            <h3>3. 세금 계산의 핵심, &apos;과세가격&apos;이란?</h3>
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
      </div>
    </div>
  );
}
