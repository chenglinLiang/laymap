import type { Lang } from "./i18n";
import type { City } from "./types";

export type FilterChip = {
  id: string;
  emoji: string;
  labelKey:
    | "f_cheap_rent"
    | "f_great_air"
    | "f_warm_winter"
    | "f_cool_summer"
    | "f_healthcare"
    | "f_hsr"
    | "f_nature"
    | "f_pet"
    | "f_internet";
  test: (c: City) => boolean;
};

export const FILTERS: FilterChip[] = [
  {
    id: "cheap_rent",
    emoji: "🏠",
    labelKey: "f_cheap_rent",
    test: (c) => c.scores.rent >= 8,
  },
  {
    id: "great_air",
    emoji: "🌿",
    labelKey: "f_great_air",
    test: (c) => c.scores.natural_env >= 8,
  },
  {
    id: "warm_winter",
    emoji: "☀️",
    labelKey: "f_warm_winter",
    test: (c) => [12, 1, 2].some((m) => c.best_months.recommended.includes(m)),
  },
  {
    id: "cool_summer",
    emoji: "❄️",
    labelKey: "f_cool_summer",
    test: (c) =>
      ![7, 8].some((m) => c.best_months.avoid.includes(m)) &&
      (c.tags.some((tag) => /避暑|cool|19℃|22℃|夏/.test(tag)) ||
        [7, 8].some((m) => c.best_months.recommended.includes(m))),
  },
  {
    id: "healthcare",
    emoji: "🏥",
    labelKey: "f_healthcare",
    test: (c) => c.scores.healthcare >= 8,
  },
  {
    id: "hsr",
    emoji: "🚄",
    labelKey: "f_hsr",
    test: (c) => c.scores.transportation >= 7,
  },
  {
    id: "nature",
    emoji: "🏞",
    labelKey: "f_nature",
    test: (c) => c.scores.natural_env >= 8,
  },
  {
    id: "pet",
    emoji: "🐶",
    labelKey: "f_pet",
    test: (c) =>
      c.pros.some((p) => /宠物|狗|猫/.test(p)) ||
      (c.pros_en?.some((p) => /pet|dog|cat/i.test(p)) ?? false),
  },
  {
    id: "internet",
    emoji: "📶",
    labelKey: "f_internet",
    test: (c) =>
      c.pros.some((p) => /网速|网络|光纤|5G/.test(p)) ||
      (c.pros_en?.some((p) => /internet|fiber|5g/i.test(p)) ?? false),
  },
];

export function applyFilters(
  list: City[],
  selected: Set<string>,
  query: string,
  lang: Lang
): City[] {
  const q = query.trim().toLowerCase();
  return list.filter((c) => {
    if (q) {
      const haystack = [
        c.city,
        c.city_en,
        c.province,
        c.province_en,
        ...(c.tags || []),
        ...(c.tags_en ?? []),
        c.one_liner,
        c.summary_sentence,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    for (const id of selected) {
      const chip = FILTERS.find((f) => f.id === id);
      if (chip && !chip.test(c)) return false;
    }
    return true;
  });
}
