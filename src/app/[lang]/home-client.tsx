"use client";

import { useMemo, useState } from "react";
import { cities } from "@/lib/cities";
import { applyFilters } from "@/lib/filters";
import { tf, type Lang } from "@/lib/i18n";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import CityCard from "@/components/CityCard";
import BottomNav from "@/components/BottomNav";

type Props = {
  lang: Lang;
  placeholder: string;
  citiesCountStr: string;
  brand: string;
  tagline: string;
  resetLabel: string;
  noResults: string;
};

export default function HomeClient({
  lang,
  placeholder,
  citiesCountStr,
  brand,
  tagline,
  resetLabel,
  noResults,
}: Props) {
  const placesN = tf(lang, "places");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const list = useMemo(
    () => applyFilters(cities, selected, query, lang),
    [selected, query, lang]
  );

  return (
    <main className="min-h-screen pb-28">
      <header className="px-4 pt-12 pb-4 text-center">
        <h1 className="text-[28px] font-semibold tracking-tight text-ink">
          {brand}
        </h1>
        <p className="text-[13px] text-mute mt-1">{tagline} · {citiesCountStr}</p>
      </header>

      <div className="sticky top-0 z-30 pt-2 pb-3 -mt-2 bg-bg/85 backdrop-blur-xl">
        <div className="px-4">
          <SearchBar value={query} onChange={setQuery} lang={lang} placeholder={placeholder} />
          <div className="mt-2.5">
            <FilterChips selected={selected} onToggle={toggle} lang={lang} />
          </div>
        </div>
      </div>

      <section className="px-4 mt-2">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <p className="text-xs text-mute font-medium">{placesN(list.length)}</p>
          {(selected.size > 0 || query) && (
            <button
              onClick={() => {
                setSelected(new Set());
                setQuery("");
              }}
              className="text-xs text-forest font-medium"
            >
              {resetLabel}
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="text-sm text-mute">{noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {list.map((c) => (
              <CityCard key={c.id} city={c} lang={lang} />
            ))}
          </div>
        )}
      </section>

      <BottomNav lang={lang} />
    </main>
  );
}
