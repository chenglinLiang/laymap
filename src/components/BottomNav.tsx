"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "@/lib/i18n";

type Props = { lang: Lang };

export default function BottomNav({ lang }: Props) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  const items = [
    { href: `/${lang}`, emoji: "🏠", labelKey: "nav_explore" as const, active: isHome },
    { href: `/${lang}#saved`, emoji: "♡", labelKey: "nav_saved" as const, active: false },
    { href: `/${lang}#about`, emoji: "✦", labelKey: "nav_about" as const, active: false },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 glass border-t border-black/[0.05]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto max-w-md grid grid-cols-3 px-2 py-2">
        {items.map((it) => (
          <Link
            key={it.labelKey}
            href={it.href}
            className={`flex flex-col items-center gap-0.5 py-1.5 rounded-tile transition-colors ${
              it.active ? "text-forest" : "text-mute"
            }`}
          >
            <span className="text-lg leading-none">{it.emoji}</span>
            <span className="text-[10px] font-medium">{t(lang, it.labelKey)}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
