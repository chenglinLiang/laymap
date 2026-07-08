"use client";

import { band } from "@/lib/types";

type Props = {
  score: number;
  size?: number;
  stroke?: number;
  showLabel?: boolean;
};

export default function ScoreRing({
  score,
  size = 64,
  stroke = 6,
  showLabel = true,
}: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(10, score)) / 10;
  const offset = c * (1 - pct);

  const b = band(score);
  const color =
    b === "great"
      ? "#2F6B3E"
      : b === "good"
      ? "#4A90D9"
      : b === "ok"
      ? "#E8923C"
      : "#D26650";

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(15,23,42,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-semibold leading-none"
            style={{ color, fontSize: size * 0.28 }}
          >
            {score.toFixed(1)}
          </span>
          <span
            className="text-mute leading-none mt-0.5"
            style={{ fontSize: size * 0.13 }}
          >
            / 10
          </span>
        </div>
      )}
    </div>
  );
}
