type TipKind = "warn" | "tip" | "transport" | "medical" | "weather";

type Props = {
  items: { text: string; kind?: TipKind }[];
};

const KIND_META: Record<TipKind, { dot: string; ring: string; emoji: string }> = {
  warn: { dot: "bg-orange", ring: "ring-orange-soft", emoji: "⚠️" },
  tip: { dot: "bg-forest", ring: "ring-forest-soft", emoji: "💡" },
  transport: { dot: "bg-sky", ring: "ring-sky-soft", emoji: "🚉" },
  medical: { dot: "bg-[#D26650]", ring: "ring-[#FBE3DF]", emoji: "🏥" },
  weather: { dot: "bg-[#7CA67C]", ring: "ring-forest-soft", emoji: "🌦" },
};

export default function TipsTimeline({ items }: Props) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.08]" />
      <ul className="space-y-3.5">
        {items.map((item, i) => {
          const kind = item.kind ?? "tip";
          const meta = KIND_META[kind];
          return (
            <li key={i} className="relative">
              <span
                className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full ring-4 ${meta.dot} ${meta.ring}`}
              />
              <div className="flex gap-2 items-start">
                <span className="text-sm leading-none mt-0.5">{meta.emoji}</span>
                <p className="text-[13px] leading-relaxed text-ink/85">
                  {item.text}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Bilingual categorizer — works on either Chinese or English tip text.
export function categorizeTip(text: string): TipKind {
  if (/医|看病|医院|药|clinic|doctor|hospital|medic/i.test(text)) return "medical";
  if (/车|打车|公交|交通|高铁|机场|租电动车|自驾|bus|taxi|train|hsr|airport|drive/i.test(text))
    return "transport";
  if (/雨|台风|湿度|冷|暖|热|降温|结冰|雪|rain|typhoon|humid|cold|warm|hot|snow|freeze/i.test(text))
    return "weather";
  if (/警惕|注意|小心|别|不要|避免|惊|危险|beware|watch|avoid|don't|caution|risk/i.test(text))
    return "warn";
  return "tip";
}
