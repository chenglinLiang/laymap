"use client";

import type { Lang } from "@/lib/i18n";

type Props = {
  value: string;
  onChange: (v: string) => void;
  lang: Lang;
  placeholder: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mute text-sm pointer-events-none">
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full glass rounded-tile pl-10 pr-9 py-3 text-[15px] font-medium text-ink placeholder:text-mute/70 outline-none border border-white/40 focus:border-forest/30 focus:bg-white/90 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-mute hover:bg-black/[0.05]"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// suppress unused-prop warning for lang (kept for future per-lang styling)
void (null as unknown as Lang);
