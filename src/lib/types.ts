export type Scores = {
  natural_env: number;
  cost_of_living: number;
  rent: number;
  transportation: number;
  healthcare: number;
  climate: number;
  long_term_live: number;
};

export type CostSnapshot = {
  monthly_rent: string;
  meals: string;
  house_price: string;
  utilities: string;
};

// English variant. Fields optional to fall back to the Chinese value.
export type CostSnapshotEN = {
  monthly_rent?: string;
  meals?: string;
  house_price?: string;
  utilities?: string;
};

export type BestMonths = {
  recommended: number[];
  avoid: number[];
};

export type City = {
  id: string; // BVID
  is_city: true;
  city: string;
  city_en: string;
  province: string;
  province_en: string;
  one_liner: string;
  one_liner_en?: string;
  summary_sentence: string;
  overall_score: number;
  scores: Scores;
  pros: string[];
  pros_en?: string[];
  cons: string[];
  cons_en?: string[];
  good_for: string[];
  good_for_en?: string[];
  avoid_for: string[];
  avoid_for_en?: string[];
  best_months: BestMonths;
  cost_snapshot: CostSnapshot;
  cost_snapshot_en?: CostSnapshotEN;
  tips: string[];
  tips_en?: string[];
  tags: string[];
  tags_en?: string[];
  source: { bvid: string; url: string; title: string };
  nearby_cities: string[];
};

export type ScoreBand = "great" | "good" | "ok" | "warn";

export function band(score: number): ScoreBand {
  if (score >= 8.5) return "great";
  if (score >= 7) return "good";
  if (score >= 5.5) return "ok";
  return "warn";
}

export const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const MONTH_LABELS_ZH = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];
