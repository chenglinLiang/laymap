import Link from "next/link";
import type { City, Scores } from "@/lib/types";
import { t, type Lang } from "@/lib/i18n";
import { cityName, oneLiner, provinceName } from "@/lib/select";
import Hero from "./Hero";
import ScoreRing from "./ScoreRing";
import ScoreChip from "./ScoreChip";
import FavoriteButton from "./FavoriteButton";

const MONTHS_EN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS_ZH = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

function monthRange(months: number[], lang: Lang): string {
  if (!months.length) return "—";
  const sorted = [...months].sort((a, b) => a - b);
  const M = lang === "zh" ? MONTHS_ZH : MONTHS_EN;
  return `${M[sorted[0] - 1]}–${M[sorted[sorted.length - 1] - 1]}`;
}

// Maps each score dimension to its emoji + i18n chip label key.
const DIMENSIONS: { key: keyof Scores; emoji: string; label: Parameters<typeof t>[1] }[] = [
  { key: "natural_env", emoji: "🌿", label: "chip_air" },
  { key: "cost_of_living", emoji: "💰", label: "chip_cost" },
  { key: "healthcare", emoji: "🏥", label: "chip_medical" },
  { key: "transportation", emoji: "🚄", label: "chip_traffic" },
  { key: "rent", emoji: "🏠", label: "chip_rent" },
  { key: "climate", emoji: "🌤️", label: "chip_climate" },
  { key: "long_term_live", emoji: "🛋️", label: "chip_longterm" },
];

export default function CityCard({ city, lang }: { city: City; lang: Lang }) {
  const topDims = [...DIMENSIONS]
    .map((d) => ({ ...d, score: city.scores[d.key] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <Link
      href={`/${lang}/city/${city.id}`}
      className="block rounded-card bg-card overflow-hidden shadow-card transition-transform duration-300 active:scale-[0.985] hover:-translate-y-0.5 hover:shadow-floaty"
    >
      <div className="relative">
        <Hero
          cityId={city.id}
          province={city.province}
          city={city.city}
          size="card"
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton cityId={city.id} chipClassName="glass" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[17px] font-semibold leading-tight truncate text-ink">
              {cityName(city, lang)}
            </h3>
            <p className="text-xs text-mute mt-0.5 truncate">
              {provinceName(city, lang)} · {city.city_en}
            </p>
          </div>
          <ScoreRing score={city.overall_score} size={48} stroke={4} />
        </div>

        <p className="text-[13px] leading-relaxed text-ink/75 mt-3 line-clamp-2">
          {oneLiner(city, lang)}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {topDims.map((d) => (
            <ScoreChip key={d.key} emoji={d.emoji} label={t(lang, d.label)} score={d.score} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-black/[0.05]">
          <Stat emoji="📅" value={monthRange(city.best_months.recommended, lang)} />
          <Stat emoji="🏠" value={city.cost_snapshot.monthly_rent} />
          <Stat emoji="🔑" value={city.cost_snapshot.house_price} />
        </div>
      </div>
    </Link>
  );
}

function Stat({ emoji, value }: { emoji: string; value: string }) {
  return (
    <div className="flex items-center gap-1 min-w-0">
      <span className="text-[11px] leading-none">{emoji}</span>
      <span className="text-[11px] font-medium text-mute truncate max-w-[88px]">
        {value}
      </span>
    </div>
  );
}
