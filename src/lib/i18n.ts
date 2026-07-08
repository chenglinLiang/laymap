export type Lang = "en" | "zh";

export const LANGS: Lang[] = ["en", "zh"];
export const DEFAULT_LANG: Lang = "en";

export function isLang(x: string | undefined | null): x is Lang {
  return x === "en" || x === "zh";
}

// ─── UI string dictionary ──────────────────────────────────────────────

type Entry = { en: string; zh: string };

export const STR: Record<string, Entry> = {
  brand: { en: "Tangping", zh: "躺平" },
  tagline: {
    en: "China's calmest places to live",
    zh: "寻找中国最宜居的安静小城",
  },
  searchPlaceholder: {
    en: "Search city or province...",
    zh: "搜索城市或省份...",
  },
  reset: { en: "Reset", zh: "重置" },
  noResults: {
    en: "No places match your filters.",
    zh: "没有符合筛选条件的城市。",
  },
  back: { en: "Back", zh: "返回" },
  sourceVideo: { en: "Source video", zh: "原视频" },
  viewReport: { en: "View Report →", zh: "查看报告 →" },
  recommendedMonths: { en: "Recommended", zh: "推荐" },
  avoidMonths: { en: "Avoid", zh: "避开" },
  neutralMonths: { en: "Neutral", zh: "一般" },
  // Sections
  sec_scores: { en: "Dimension Scores", zh: "维度评分" },
  sec_scores_sub: {
    en: "How this place measures up",
    zh: "各项指标的综合评估",
  },
  sec_pros: { en: "Pros", zh: "优势" },
  sec_pros_sub: { en: "Why people love it", zh: "为什么大家喜欢这里" },
  sec_cons: { en: "Cons", zh: "劣势" },
  sec_cons_sub: { en: "Trade-offs to know about", zh: "需要权衡的方面" },
  sec_good_for: { en: "Who should come", zh: "适合谁" },
  sec_good_for_sub: { en: "You'll fit right in", zh: "你会很合适" },
  sec_avoid_for: { en: "Who should avoid", zh: "不适合谁" },
  sec_avoid_for_sub: {
    en: "Might not be your scene",
    zh: "可能不太合适",
  },
  sec_months: { en: "Best Months", zh: "最佳月份" },
  sec_months_sub: { en: "When to go", zh: "什么时候去" },
  sec_cost: { en: "Cost Snapshot", zh: "物价快照" },
  sec_cost_sub: { en: "What things actually cost", zh: "实际生活成本" },
  sec_tips: { en: "Things to Know", zh: "避坑提醒" },
  sec_tips_sub: { en: "Read before you go", zh: "出发前必读" },
  sec_tags: { en: "Tags", zh: "标签" },
  sec_nearby: { en: "Nearby Similar Cities", zh: "相似城市" },
  sec_nearby_sub: { en: "You might also like", zh: "你也许会喜欢" },
  // Score bars
  sc_natural_env: { en: "Natural Environment", zh: "自然环境" },
  sc_cost_of_living: { en: "Cost of Living", zh: "物价水平" },
  sc_rent: { en: "Rent", zh: "租金" },
  sc_transportation: { en: "Transportation", zh: "交通便利度" },
  sc_healthcare: { en: "Healthcare", zh: "医疗保障" },
  sc_climate: { en: "Climate", zh: "气候" },
  sc_long_term_live: { en: "Long-term Living", zh: "长居适宜度" },
  // Score chips (short labels)
  chip_air: { en: "Air", zh: "空气" },
  chip_cost: { en: "Cost", zh: "物价" },
  chip_medical: { en: "Medical", zh: "医疗" },
  chip_traffic: { en: "Traffic", zh: "交通" },
  // Cost labels
  cost_rent: { en: "Monthly Rent", zh: "月租金" },
  cost_meals: { en: "Meals", zh: "餐饮" },
  cost_house: { en: "House Price", zh: "房价" },
  cost_utilities: { en: "Utilities", zh: "水电" },
  // Bottom nav
  nav_explore: { en: "Explore", zh: "探索" },
  nav_search: { en: "Search", zh: "搜索" },
  nav_saved: { en: "Saved", zh: "收藏" },
  nav_about: { en: "About", zh: "关于" },
  // Filter chips
  f_cheap_rent: { en: "Cheap Rent", zh: "低租金" },
  f_great_air: { en: "Clean Air", zh: "好空气" },
  f_warm_winter: { en: "Warm Winter", zh: "暖冬" },
  f_cool_summer: { en: "Cool Summer", zh: "凉夏" },
  f_healthcare: { en: "Good Healthcare", zh: "医疗好" },
  f_hsr: { en: "High-speed Rail", zh: "通高铁" },
  f_nature: { en: "Nature", zh: "自然" },
  f_pet: { en: "Pet Friendly", zh: "可养宠" },
  f_internet: { en: "Fast Internet", zh: "网速好" },
};

export function t<L extends Lang>(lang: L, key: keyof typeof STR): string {
  const entry = STR[key];
  if (!entry) return String(key);
  return entry[lang];
}

// Formatters (kept separate from STR because they're functions, not strings)
export const FMT = {
  citiesCount: {
    en: (n: number) => `${n} cities`,
    zh: (n: number) => `${n} 座城市`,
  },
  places: {
    en: (n: number) => `${n} ${n === 1 ? "place" : "places"}`,
    zh: (n: number) => `${n} 个地点`,
  },
} as const;

export function tf<L extends Lang>(
  lang: L,
  key: keyof typeof FMT
): (n: number) => string {
  return FMT[key][lang];
}

// Pick the right field variant given lang. Falls back to the other language
// if the requested one is missing.
export function pick<L extends Lang>(
  lang: L,
  zh: string | undefined | null,
  en: string | undefined | null
): string {
  if (lang === "zh") return zh || en || "";
  return en || zh || "";
}
