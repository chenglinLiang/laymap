import type { Lang } from "./i18n";
import type { City } from "./types";

// Per-language field selectors with graceful fallback to whichever variant exists.
// If the requested language is missing, fall back to the other one rather than show blanks.

export function cityName(c: City, lang: Lang): string {
  return lang === "zh" ? c.city || c.city_en : c.city_en || c.city;
}

export function provinceName(c: City, lang: Lang): string {
  return lang === "zh" ? c.province || c.province_en : c.province_en || c.province;
}

export function oneLiner(c: City, lang: Lang): string {
  if (lang === "zh") return c.one_liner || c.one_liner_en || c.summary_sentence || "";
  return c.one_liner_en || c.summary_sentence || c.one_liner || "";
}

export function listField(
  c: City,
  field: "pros" | "cons" | "good_for" | "avoid_for" | "tips" | "tags",
  lang: Lang
): string[] {
  const enKey = `${field}_en` as keyof City;
  const enVal = c[enKey];
  const zhVal = c[field];
  if (lang === "zh") {
    if (Array.isArray(zhVal) && zhVal.length) return zhVal as string[];
    if (Array.isArray(enVal) && enVal.length) return enVal as string[];
    return [];
  }
  if (Array.isArray(enVal) && enVal.length) return enVal as string[];
  if (Array.isArray(zhVal) && zhVal.length) return zhVal as string[];
  return [];
}
