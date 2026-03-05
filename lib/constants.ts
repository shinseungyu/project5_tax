// 환율 API 엔드포인트
export const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";

// 면세 한도 (USD)
export const DUTY_FREE_LIMIT_US = 200; // 미국 직구
export const DUTY_FREE_LIMIT_OTHER = 150; // 기타 국가 직구

// 부가가치세율
export const VAT_RATE = 0.1; // 10%

// 품목별 관세율
export const PRODUCT_CATEGORIES = [
  { id: "clothing", label: "의류/신발", dutyRate: 0.13, description: "의류, 신발, 가방 등" },
  { id: "electronics", label: "전자제품", dutyRate: 0.08, description: "스마트폰, 노트북, 태블릿 등" },
  { id: "cosmetics", label: "화장품", dutyRate: 0.065, description: "스킨케어, 메이크업 등" },
  { id: "food", label: "식품", dutyRate: 0.08, description: "건강식품, 간식 등" },
  { id: "vitamins", label: "건강보조제/의약품", dutyRate: 0.08, description: "비타민, 영양제, 보충제, 소화제, 파스 등" },
  { id: "perfume", label: "향수", dutyRate: 0.07, description: "향수, 디퓨저 등" },
  { id: "toys", label: "완구/취미", dutyRate: 0.08, description: "장난감, 피규어 등" },
  { id: "books", label: "서적", dutyRate: 0, description: "도서, 잡지 등" },
  { id: "sports", label: "스포츠용품", dutyRate: 0.08, description: "운동기구, 스포츠웨어 등" },
  { id: "other", label: "기타", dutyRate: 0.08, description: "기타 품목" },
] as const;

// 비타민 최대 병 수 (6병 초과 시 경고)
export const VITAMIN_BOTTLE_LIMIT = 6;

// 출발국가 옵션
export const ORIGIN_COUNTRIES = [
  { id: "us", label: "미국", currency: "USD", symbol: "$", dutyFreeLimit: DUTY_FREE_LIMIT_US },
  { id: "jp", label: "일본", currency: "JPY", symbol: "¥", dutyFreeLimit: DUTY_FREE_LIMIT_OTHER },
  { id: "cn", label: "중국", currency: "CNY", symbol: "¥", dutyFreeLimit: DUTY_FREE_LIMIT_OTHER },
] as const;
