"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  lang: string;
  label: string;
};

/**
 * Back arrow used in the detail-page header.
 *
 * Prefers `router.back()` so the browser restores the previous scroll
 * position on the home list (matching the phone system-back gesture).
 * Falls back to a hard navigation to `/${lang}` if there's no previous
 * history entry (e.g. user landed on the detail page directly).
 */
export default function BackButton({ lang, label }: Props) {
  const router = useRouter();
  const [canBack, setCanBack] = useState(false);

  useEffect(() => {
    // history.length === 1 means this is the first entry in the tab.
    setCanBack(window.history.length > 1);
  }, []);

  const handleClick = () => {
    if (canBack) {
      router.back();
    } else {
      router.push(`/${lang}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white text-lg"
    >
      ‹
    </button>
  );
}
