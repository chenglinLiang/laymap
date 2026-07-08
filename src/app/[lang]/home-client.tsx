"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cities } from "@/lib/cities";
import { applyFilters } from "@/lib/filters";
import { t, tf, type Lang } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import CityCard from "@/components/CityCard";
import BottomNav from "@/components/BottomNav";

type Props = {
  lang: Lang;
  placeholder: string;
  brand: string;
  tagline: string;
  resetLabel: string;
  noResults: string;
  noSaved: string;
};

export default function HomeClient({
  lang,
  placeholder,
  brand,
  tagline,
  resetLabel,
  noResults,
  noSaved,
}: Props) {
  const placesN = tf(lang, "places");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { favorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [favOnly, setFavOnly] = useState(false);

  // Hide top bar on scroll-down, reveal on scroll-up.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      // Ignore tiny scrolls and the very top of the page.
      if (y < 24) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drive the "Saved" tab via the URL hash so it survives reload and works
  // when entering from the bottom nav on another route.
  useEffect(() => {
    setMounted(true);
    const apply = () => setFavOnly(window.location.hash === "#saved");
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const list = useMemo(() => {
    const base = applyFilters(cities, selected, query, lang);
    if (favOnly && mounted) {
      return base.filter((c) => favorites.has(c.id));
    }
    return base;
  }, [selected, query, lang, favOnly, mounted, favorites]);

  const otherLang: Lang = lang === "en" ? "zh" : "en";

  return (
    <main className="min-h-screen pb-28">
      {/* Floating language switcher (top-right) */}
      <Link
        href={`/${otherLang}`}
        className="fixed top-3 right-3 z-50 glass rounded-full h-9 px-3 flex items-center gap-1 text-[11px] font-semibold text-ink/80 shadow-card hover:shadow-floaty transition-shadow"
        style={{ top: "max(env(safe-area-inset-top), 12px)" }}
        aria-label={`Switch to ${otherLang.toUpperCase()}`}
      >
        <span className="text-sm leading-none">🌐</span>
        <span className="uppercase">{otherLang}</span>
      </Link>

      <header className="px-4 pt-12 pb-4 text-center">
        <h1 className="text-[28px] font-semibold tracking-tight text-ink">
          {favOnly ? t(lang, "savedTitle") : brand}
        </h1>
        <p className="text-[13px] text-mute mt-1">
          {favOnly ? placesN(list.length) : tagline}
        </p>
      </header>

      <div
        className={`sticky top-0 z-30 pt-2 pb-3 -mt-2 bg-bg/85 backdrop-blur-xl transition-transform duration-300 ${
          hidden ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
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
          {(selected.size > 0 || query || favOnly) && (
            <button
              onClick={() => {
                setSelected(new Set());
                setQuery("");
                if (favOnly) {
                  // Clear the hash and notify any listeners (e.g. BottomNav)
                  // since pushState does not fire hashchange on its own.
                  window.history.pushState(null, "", `/${lang}`);
                  setFavOnly(false);
                  window.dispatchEvent(new HashChangeEvent("hashchange"));
                }
              }}
              className="text-xs text-forest font-medium"
            >
              {resetLabel}
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">{favOnly ? "♡" : "🗺️"}</div>
            <p className="text-sm text-mute">{favOnly ? noSaved : noResults}</p>
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
