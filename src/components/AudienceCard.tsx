import type { ReactNode } from "react";

type Variant = "good" | "avoid";

type Props = {
  variant: Variant;
  emoji: string;
  title: string;
  children?: ReactNode;
};

export default function AudienceCard({ variant, emoji, title, children }: Props) {
  const isGood = variant === "good";
  return (
    <div
      className={`rounded-tile p-4 flex flex-col gap-2 ${
        isGood ? "bg-white shadow-card" : "bg-black/[0.025]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-2xl leading-none">{emoji}</span>
        <span
          className={`text-sm font-semibold ${
            isGood ? "text-ink" : "text-mute"
          }`}
        >
          {title}
        </span>
      </div>
      {children && (
        <p className={`text-xs leading-relaxed ${isGood ? "text-mute" : "text-mute/80"}`}>
          {children}
        </p>
      )}
    </div>
  );
}
