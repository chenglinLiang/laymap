"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { t, type Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function BottomNav({ lang }: Props) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const apply = () => setHash(window.location.hash);
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const onHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const onAbout = pathname === `/${lang}/about`;
  const isSaved = onHome && hash === "#saved";
  const isExplore = onHome && !isSaved;

  const items = [
    { href: `/${lang}#home`, emoji: "🏠", labelKey: "nav_explore" as const, active: isExplore },
    { href: `/${lang}#saved`, emoji: isSaved ? "❤️" : "♡", labelKey: "nav_saved" as const, active: isSaved },
    { href: `/${lang}/about`, emoji: "✦", labelKey: "nav_about" as const, active: onAbout },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 glass border-t border-black/[0.05]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-md grid grid-cols-3 px-2 py-2">
        {items.map((it) => {
          const isHashItem = it.href.includes("#");
          return (
            <Link
              key={it.labelKey}
              href={it.href}
              onClick={(e) => {
                // Next.js App Router does not fire a native `hashchange`
                // when only the hash changes on the same pathname, so the
                // in-page filter switch would silently no-op until reload.
                // Force the URL update + dispatch the event ourselves when
                // we're already on the home route.
                if (isHashItem && onHome) {
                  e.preventDefault();
                  window.history.pushState(null, "", it.href);
                  setHash(window.location.hash);
                  window.dispatchEvent(new HashChangeEvent("hashchange"));
                }
                // Otherwise let Link perform its normal SPA navigation:
                // from a non-home route it will mount home-client, whose
                // mount effect reads the hash.
              }}
              className={`flex flex-col items-center gap-0.5 py-1.5 rounded-tile transition-colors ${
                it.active ? "text-forest" : "text-mute"
              }`}
            >
              <span className="text-lg leading-none">{it.emoji}</span>
              <span className="text-[10px] font-medium">{t(lang, it.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
