export type Lang = "en" | "zh";

export const LANGS: Lang[] = ["en", "zh"];
export const DEFAULT_LANG: Lang = "en";

export function isLang(x: string | undefined | null): x is Lang {
  return x === "en" || x === "zh";
}

// ─── UI string dictionary ──────────────────────────────────────────────

type Entry = { en: string; zh: string };

export const STR: Record<string, Entry> = {
  brand: { en: "Travel · Retire · Slow Living", zh: "旅居 · 养老 · 慢生活" },
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
  noSaved: {
    en: "No saved cities yet. Tap the heart on any card.",
    zh: "还没有收藏的城市，点一下卡片上的红心吧。",
  },
  savedTitle: { en: "Saved", zh: "我的收藏" },
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
  chip_rent: { en: "Rent", zh: "租金" },
  chip_climate: { en: "Climate", zh: "气候" },
  chip_longterm: { en: "Long-stay", zh: "长居" },
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
  // ─── About page ──────────────────────────────────────────────────────
  about_hero_badge: { en: "About", zh: "关于我们" },
  about_hero_title: {
    en: "Looking for a city to live in — not just to visit.",
    zh: "寻找一座适合生活，而不仅仅适合旅行的城市。",
  },
  about_hero_subtitle: {
    en: "A quiet collection of cities across China for slow travel, long-term living, and a softer kind of retirement.",
    zh: "这里记录着适合旅居、慢生活与养老的城市，希望帮助更多人找到属于自己的理想归宿。",
  },
  about_cta_explore: { en: "Explore Cities", zh: "探索城市" },
  about_cta_start: { en: "Start Exploring", zh: "开始探索" },
  about_mission_title: { en: "Our Beginning", zh: "我们的初心" },
  about_mission_intro: {
    en: "This project began with a simple wish — to make space for a calmer kind of life.",
    zh: "这个项目始于一个朴素的愿望 —— 为更从容的生活方式留出一点空间。",
  },
  about_mission_p1: {
    en: "Modern life moves fast. We wanted to build a quiet place that helps people step away from that pace for a while, and discover cities where life can slow down, breathe, and find its own rhythm again.",
    zh: "现代生活的节奏很快。我们想在这里留下一个安静的角落，帮助人们短暂地离开那种紧张感，去发现那些能让生活慢下来、深呼吸、找回自己节奏的小城。",
  },
  about_mission_bullet1_title: { en: "A pause from the rush", zh: "暂别匆忙" },
  about_mission_bullet1: {
    en: "Help people step away from the pressure of fast-paced modern life, and discover places where they can slow down, recharge, and enjoy a more peaceful rhythm.",
    zh: "帮助人们暂时离开快节奏生活的压力，去发现那些可以慢下来、休养生息、享受更从容节奏的地方。",
  },
  about_mission_bullet2_title: { en: "A softer retirement", zh: "更柔软的养老" },
  about_mission_bullet2: {
    en: "Help families and older adults find cities with pleasant climates, clean air, good healthcare, and comfortable environments for a happier retirement.",
    zh: "帮助家庭与长辈找到气候宜人、空气清新、医疗便利、生活舒适的城市，让养老这件事变得更安心、更幸福。",
  },
  about_values_title: { en: "What we believe", zh: "我们在乎的事" },
  about_values_sub: {
    en: "Three small principles behind every report.",
    zh: "每一份报告背后的三个小小坚持。",
  },
  about_value1_title: { en: "Slow Living", zh: "慢生活" },
  about_value1: {
    en: "Helping people rediscover a slower, healthier way of living.",
    zh: "帮助人们重新找回更慢、更健康的生活方式。",
  },
  about_value2_title: { en: "Better Places", zh: "更宜居的地方" },
  about_value2: {
    en: "Finding cities that are pleasant to live in — not just to visit.",
    zh: "寻找真正适合居住的城市，而不仅仅是适合旅行的地方。",
  },
  about_value3_title: { en: "Real Information", zh: "真实的信息" },
  about_value3: {
    en: "Every report is carefully organized from publicly available sources, and presented in a structured, objective, and easy-to-understand way.",
    zh: "每一份报告都来自公开资料，认真整理，以结构化、客观、易读的方式呈现。",
  },
  about_quote: {
    en: "We believe the value of a city isn't in how busy it is — but in whether it makes life a little easier, and the days a little more unhurried.",
    zh: "我们相信，一座城市的价值，不只是它有多繁华，而是它能否让生活变得更加轻松，让日子过得更加从容。",
  },
  about_closing_title: {
    en: "May everyone find a place that feels like home.",
    zh: "愿每个人，都能找到属于自己的理想归宿。",
  },
  about_closing_sub: {
    en: "Whether it's a short escape, a new chapter of retirement, or simply a slower way of living.",
    zh: "无论是一次短暂的逃离，一段全新的养老生活，还是仅仅一种更慢的生活方式。",
  },
  about_scroll: { en: "Scroll", zh: "向下滑动" },
  footer_home: { en: "Home", zh: "首页" },
  footer_cities: { en: "Cities", zh: "城市" },
  footer_map: { en: "Map", zh: "地图" },
  footer_about: { en: "About", zh: "关于" },
  footer_copyright: {
    en: "Made quietly, for people who want to slow down.",
    zh: "为想要慢下来的人们，安静地制作。",
  },
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
