"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "tangping:favorites";
const EVENT = "tangping:fav-change";

function read(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function write(s: Set<string>) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...s]));
    // Notify other hook instances in the same tab.
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* ignore quota / private mode errors */
  }
}

/**
 * Local-only favorites. Persists city ids in localStorage and
 * keeps every mounted consumer in sync via a custom event + the
 * native `storage` event (cross-tab).
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    setFavorites(read());
    const onChange = () => setFavorites(read());
    window.addEventListener("storage", onChange);
    window.addEventListener(EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(EVENT, onChange);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const next = new Set(read());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    write(next);
    setFavorites(next);
  }, []);

  const isFav = useCallback((id: string) => favorites.has(id), [favorites]);

  return { favorites, toggle, isFav };
}
