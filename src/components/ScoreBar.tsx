"use client";

import { useEffect, useRef, useState } from "react";
import { band } from "@/lib/types";

type Props = {
  label: string;
  emoji: string;
  score: number;
};

export default function ScoreBar({ label, emoji, score }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pct = (Math.max(0, Math.min(10, score)) / 10) * 100;
  const b = band(score);
  const color =
    b === "great"
      ? "bg-forest"
      : b === "good"
      ? "bg-sky"
      : b === "ok"
      ? "bg-orange"
      : "bg-[#D26650]";

  return (
    <div ref={ref} className="py-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{emoji}</span>
          <span className="text-sm font-medium text-ink">{label}</span>
        </div>
        <span className="text-sm font-semibold tabular-nums text-ink">
          {score.toFixed(1)}
        </span>
      </div>
      <div className="h-2 rounded-full bg-black/[0.05] overflow-hidden">
        <div
          className={`h-full rounded-full ${color} origin-left`}
          style={{
            width: visible ? `${pct}%` : "0%",
            transition: "width 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}
