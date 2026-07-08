import type { ReactNode } from "react";

type Variant = "pro" | "con";

type Props = {
  variant: Variant;
  emoji?: string;
  children: ReactNode;
};

export default function ProConCard({ variant, emoji, children }: Props) {
  const isPro = variant === "pro";
  return (
    <div
      className={`rounded-tile p-3.5 flex gap-2.5 items-start ${
        isPro ? "bg-forest-soft" : "bg-orange-soft"
      }`}
    >
      {emoji && (
        <span className="text-lg leading-none mt-0.5 shrink-0">{emoji}</span>
      )}
      <p
        className={`text-[13px] leading-snug ${
          isPro ? "text-forest-deep" : "text-[#A85916]"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
