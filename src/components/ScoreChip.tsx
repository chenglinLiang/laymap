import { band } from "@/lib/types";

type Props = {
  emoji: string;
  label: string;
  score: number;
};

export default function ScoreChip({ emoji, label, score }: Props) {
  const b = band(score);
  const cls =
    b === "great"
      ? "bg-forest-soft text-forest-deep"
      : b === "good"
      ? "bg-sky-soft text-[#2C5F8C]"
      : b === "ok"
      ? "bg-orange-soft text-[#A85916]"
      : "bg-[#FBE3DF] text-[#A23F2E]";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-chip text-[11px] font-medium ${cls}`}
    >
      <span className="text-[12px] leading-none">{emoji}</span>
      <span className="opacity-80">{label}</span>
      <span className="font-semibold tabular-nums">{score.toFixed(1)}</span>
    </span>
  );
}
