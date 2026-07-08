"use client";

import { useFavorites } from "@/lib/favorites";

type Props = {
  cityId: string;
  /** Tailwind classes for the background chip (e.g. "glass" or "glass-dark"). */
  chipClassName?: string;
  size?: number;
};

/**
 * Heart toggle. Uses the local favorites store. Designed to sit on top of
 * images, so it renders as a circular translucent chip.
 *
 * `onClick` stops propagation so it can live inside a <Link> without
 * triggering navigation.
 */
export default function FavoriteButton({
  cityId,
  chipClassName = "glass",
  size = 22,
}: Props) {
  const { isFav, toggle } = useFavorites();
  const active = isFav(cityId);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(cityId);
      }}
      className={`inline-flex items-center justify-center rounded-full h-9 w-9 shadow-card transition-transform duration-150 active:scale-90 ${chipClassName}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={active ? "#ef4444" : "none"}
        stroke={active ? "#ef4444" : "currentColor"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          color: active ? undefined : "var(--ink)",
          filter: active
            ? "drop-shadow(0 1px 2px rgba(0,0,0,0.25))"
            : undefined,
        }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
