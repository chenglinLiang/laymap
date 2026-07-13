"use client";

import { useEffect, useState } from "react";

export const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "JPY",
  "KRW",
  "GBP",
  "AUD",
  "CAD",
] as const;

export type Currency = (typeof SUPPORTED_CURRENCIES)[number];

const API_URL = "https://open.er-api.com/v6/latest/CNY";
const CACHE_KEY = "tangping:fx_rates_v1";
const TTL_MS = 24 * 60 * 60 * 1000; // 24h

type Stored = { rates: Record<string, number>; updated: string };

type State = {
  rates: Record<string, number> | null;
  updated: string | null;
  status: "loading" | "ok" | "stale" | "error";
};

function readCache(): Stored | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.rates || !parsed.updated) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: Stored) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Fetches CNY→target rates from open.er-api.com (free, no key).
 * Uses a 24h localStorage cache; falls back to stale cache on network failure.
 */
export function useExchangeRates(): State {
  const [state, setState] = useState<State>({
    rates: null,
    updated: null,
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    const cached = readCache();
    const cacheAge = cached ? Date.now() - new Date(cached.updated).getTime() : Infinity;

    // If cache is fresh, skip the network entirely.
    if (cached && cacheAge < TTL_MS) {
      setState({ rates: cached.rates, updated: cached.updated, status: "ok" });
      return;
    }

    // Show stale cache immediately while we refresh.
    if (cached) {
      setState({ rates: cached.rates, updated: cached.updated, status: "stale" });
    }

    (async () => {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rates = json?.rates as Record<string, number> | undefined;
        if (!rates) throw new Error("Missing rates in response");
        const updated: string =
          json?.time_last_update_utc
            ? String(json.time_last_update_utc)
            : new Date().toUTCString();
        const picked: Record<string, number> = {};
        for (const c of SUPPORTED_CURRENCIES) {
          if (typeof rates[c] === "number") picked[c] = rates[c];
        }
        if (Object.keys(picked).length === 0) throw new Error("No target currencies");
        writeCache({ rates: picked, updated });
        if (!cancelled) {
          setState({ rates: picked, updated, status: "ok" });
        }
      } catch {
        if (!cancelled) {
          setState((prev) => ({
            rates: prev.rates,
            updated: prev.updated,
            status: prev.rates ? "stale" : "error",
          }));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
