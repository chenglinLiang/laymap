"use client";

import { useEffect, useMemo, useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import {
  SUPPORTED_CURRENCIES,
  useExchangeRates,
  type Currency,
} from "@/lib/exchangeRates";

type Props = { lang: Lang };

const CURRENCY_KEY = "tangping:fx_currency_v1";

// Currencies worth a lot per unit (JPY/KRW) show fewer decimals.
const DECIMALS: Record<string, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  AUD: 2,
  CAD: 2,
  JPY: 0,
  KRW: 0,
};

function loadSavedCurrency(): Currency {
  if (typeof window === "undefined") return "USD";
  try {
    const v = window.localStorage.getItem(CURRENCY_KEY);
    if (v && (SUPPORTED_CURRENCIES as readonly string[]).includes(v)) {
      return v as Currency;
    }
  } catch {
    /* ignore */
  }
  return "USD";
}

export default function FxCalculator({ lang }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("100");
  const [target, setTarget] = useState<Currency>("USD");
  const { rates, updated, status } = useExchangeRates();

  // Restore last-used target currency on mount.
  useEffect(() => {
    setTarget(loadSavedCurrency());
  }, []);

  // Persist target currency whenever it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(CURRENCY_KEY, target);
    } catch {
      /* ignore */
    }
  }, [target]);

  const rate = rates?.[target] ?? null;
  const amountNum = parseFloat(amount);
  const result = useMemo(() => {
    if (!rate || !isFinite(amountNum)) return null;
    const value = amountNum * rate;
    const decimals = DECIMALS[target] ?? 2;
    return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }, [rate, amountNum, target, lang]);

  const amountDisplay = useMemo(() => {
    if (!isFinite(amountNum)) return "0";
    return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-US", {
      maximumFractionDigits: 2,
    }).format(amountNum);
  }, [amountNum, lang]);

  const updatedDisplay = useMemo(() => {
    if (!updated) return "";
    try {
      return new Date(updated).toLocaleDateString(
        lang === "zh" ? "zh-CN" : "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      );
    } catch {
      return updated;
    }
  }, [updated, lang]);

  return (
    <>
      {/* Floating button (bottom-right, above BottomNav) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-3 z-50 glass rounded-full h-10 w-10 flex items-center justify-center shadow-card hover:shadow-floaty transition-shadow"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
        aria-label={t(lang, "fx_title")}
        aria-expanded={open}
      >
        <span className="text-lg leading-none">💱</span>
      </button>

      {/* Popup */}
      {open && (
        <>
          {/* invisible backdrop to catch outside clicks */}
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
            style={{ background: "transparent" }}
          />
          <div
            role="dialog"
            aria-label={t(lang, "fx_title")}
            className="fixed right-3 z-50 w-[260px] glass rounded-tile p-4 shadow-floaty"
            style={{ bottom: "calc(env(safe-area-inset-bottom) + 140px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-semibold text-ink">
                {t(lang, "fx_title")}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-mute text-base leading-none hover:text-ink transition-colors px-1"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Amount input */}
            <label className="block text-[10px] font-medium uppercase tracking-wider text-mute mb-1">
              {t(lang, "fx_amount")}
            </label>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-mute">¥</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 min-w-0 bg-white/70 border border-black/[0.06] rounded-chip px-2.5 py-1.5 text-[14px] font-medium text-ink outline-none focus:border-forest/40"
              />
            </div>

            {/* Currency chips */}
            <label className="block text-[10px] font-medium uppercase tracking-wider text-mute mb-1.5">
              {t(lang, "fx_to")}
            </label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {SUPPORTED_CURRENCIES.map((c) => {
                const active = c === target;
                return (
                  <button
                    key={c}
                    onClick={() => setTarget(c)}
                    className={`px-2.5 py-1 rounded-chip text-[11px] font-semibold transition-colors ${
                      active
                        ? "bg-forest text-bg"
                        : "bg-white/70 text-ink/70 border border-black/[0.06] hover:border-forest/30"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Result */}
            <div className="rounded-chip bg-white/60 border border-black/[0.05] px-3 py-2.5">
              {status === "loading" ? (
                <p className="text-[12px] text-mute">{t(lang, "fx_loading")}</p>
              ) : result ? (
                <>
                  <p className="text-[10px] text-mute uppercase tracking-wider mb-0.5">
                    ¥{amountDisplay} CNY
                  </p>
                  <p className="text-[20px] font-semibold text-ink leading-tight">
                    {result} {target}
                  </p>
                </>
              ) : (
                <p className="text-[12px] text-ink/60">{t(lang, "fx_error")}</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-mute">
              <span>{t(lang, "fx_disclaimer")}</span>
              {updatedDisplay && (
                <span>
                  {t(lang, "fx_updated")} {updatedDisplay}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
