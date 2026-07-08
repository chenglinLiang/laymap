import Link from "next/link";
import type { City } from "@/lib/types";
import { t, type Lang } from "@/lib/i18n";
import { cityName, listField, oneLiner, provinceName } from "@/lib/select";
import Hero from "./Hero";
import ScoreRing from "./ScoreRing";
import ScoreChip from "./ScoreChip";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function monthRange(months: number[]): string {
  if (!months.length) return "—";
  const sorted = [...months].sort((a, b) => a - b);
  return `${MONTHS[sorted[0] - 1]}–${MONTHS[sorted[sorted.length - 1] - 1]}`;
}

export default function CityCard({ city, lang }: { city: City; lang: Lang }) {
  const tags = listField(city, "tags", lang).slice(0, 3);
  return (
    <Link
      href={`/${lang}/city/${city.id}`}
      className="block rounded-card bg-card overflow-hidden shadow-card transition-transform duration-300 active:scale-[0.985] hover:-translate-y-0.5 hover:shadow-floaty"
    >
      <Hero
        cityId={city.id}
        province={city.province}
        city={city.city}
        size="card"
      />
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
          <ScoreChip emoji="🌿" label={t(lang, "chip_air")} score={city.scores.natural_env} />
          <ScoreChip emoji="💰" label={t(lang, "chip_cost")} score={city.scores.cost_of_living} />
          <ScoreChip emoji="🏥" label={t(lang, "chip_medical")} score={city.scores.healthcare} />
          <ScoreChip emoji="🚄" label={t(lang, "chip_traffic")} score={city.scores.transportation} />
        </div>

        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-black/[0.05]">
          <Stat emoji="📅" value={monthRange(city.best_months.recommended)} />
          <Stat emoji="🏠" value={city.cost_snapshot.monthly_rent} />
          <Stat emoji="🔑" value={city.cost_snapshot.house_price} />
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-black/[0.04] text-mute"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
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
