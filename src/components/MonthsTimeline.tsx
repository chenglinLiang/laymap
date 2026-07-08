import { MONTH_LABELS, MONTH_LABELS_ZH } from "@/lib/types";
import { t, type Lang } from "@/lib/i18n";

type Props = {
  recommended: number[];
  avoid: number[];
  lang: Lang;
};

const TEMP_TAG: Record<number, string> = {
  1: "5°", 2: "8°", 3: "13°", 4: "18°", 5: "23°", 6: "26°",
  7: "28°", 8: "27°", 9: "23°", 10: "18°", 11: "12°", 12: "7°",
};

export default function MonthsTimeline({ recommended, avoid, lang }: Props) {
  const recSet = new Set(recommended);
  const avSet = new Set(avoid);
  const labels = lang === "zh" ? MONTH_LABELS_ZH : MONTH_LABELS;

  return (
    <div className="grid grid-cols-4 gap-2">
      {labels.map((label, i) => {
        const m = i + 1;
        const isRec = recSet.has(m);
        const isAv = avSet.has(m);
        const cls = isRec
          ? "bg-forest text-white border-forest"
          : isAv
          ? "bg-white text-[#D26650] border-[#D26650]/40"
          : "bg-white text-mute border-black/[0.06]";
        return (
          <div
            key={m}
            className={`rounded-tile px-2 py-2.5 text-center border ${cls}`}
          >
            <div className="text-xs font-semibold">{label}</div>
            <div
              className={`text-[10px] mt-0.5 ${
                isRec ? "text-white/80" : "text-mute/70"
              }`}
            >
              {TEMP_TAG[m]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// exported for parent legend
export function MonthLegend({
  lang,
}: {
  lang: Lang;
}) {
  return (
    <div className="flex items-center gap-4 mt-4 text-xs text-mute">
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-forest" />
        {t(lang, "recommendedMonths")}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white ring-1 ring-[#D26650]/40" />
        {t(lang, "avoidMonths")}
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white ring-1 ring-black/10" />
        {t(lang, "neutralMonths")}
      </span>
    </div>
  );
}
