"use client";

import { FILTERS } from "@/lib/filters";
import { t, type Lang } from "@/lib/i18n";

type Props = {
  selected: Set<string>;
  onToggle: (id: string) => void;
  lang: Lang;
};

export default function FilterChips({ selected, onToggle, lang }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
      {FILTERS.map((f) => {
        const isOn = selected.has(f.id);
        return (
          <button
            key={f.id}
            onClick={() => onToggle(f.id)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-chip text-[13px] font-medium transition-colors ${
              isOn
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-ink/80 border border-black/[0.06]"
            }`}
          >
            <span className="text-[13px] leading-none">{f.emoji}</span>
            {t(lang, f.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
