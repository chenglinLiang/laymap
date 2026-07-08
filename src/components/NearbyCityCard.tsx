import Link from "next/link";
import type { City } from "@/lib/types";
import type { Lang } from "@/lib/i18n";
import { cityName, listField, provinceName } from "@/lib/select";
import Hero from "./Hero";

export default function NearbyCityCard({
  city,
  lang,
}: {
  city: City;
  lang: Lang;
}) {
  const tag = listField(city, "tags", lang)[0] ?? city.city_en;
  return (
    <Link
      href={`/${lang}/city/${city.id}`}
      className="shrink-0 w-44 rounded-tile overflow-hidden bg-card shadow-card transition-transform duration-300 active:scale-[0.98]"
    >
      <Hero cityId={city.id} province={city.province} city={city.city} size="card" />
      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold truncate">
            {cityName(city, lang)}
          </h4>
          <span className="text-xs font-semibold text-forest tabular-nums shrink-0">
            {city.overall_score.toFixed(1)}
          </span>
        </div>
        <p className="text-[11px] text-mute truncate mt-0.5">
          {provinceName(city, lang)} · {tag}
        </p>
      </div>
    </Link>
  );
}
