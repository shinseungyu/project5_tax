"use client";

import { useState, useEffect } from "react";
import { EXCHANGE_RATE_API } from "@/lib/constants";

export interface ExchangeRates {
  KRW: number;
  JPY: number;
  CNY: number;
}

interface ExchangeRateResult {
  rate: number | null;
  rates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export function useExchangeRate(): ExchangeRateResult {
  const [rate, setRate] = useState<number | null>(null);
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRate() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(EXCHANGE_RATE_API);
        if (!res.ok) throw new Error("환율 정보를 가져오지 못했습니다.");

        const data = await res.json();
        if (!cancelled) {
          const krwRate = data.rates?.KRW;
          const jpyRate = data.rates?.JPY;
          const cnyRate = data.rates?.CNY;
          if (!krwRate || !jpyRate || !cnyRate) throw new Error("환율 정보를 찾을 수 없습니다.");

          setRate(krwRate);
          setRates({ KRW: krwRate, JPY: jpyRate, CNY: cnyRate });
          setLastUpdated(data.time_last_update_utc ?? null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRate();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, rates, loading, error, lastUpdated };
}
