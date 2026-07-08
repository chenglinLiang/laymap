"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { t, type Lang } from "@/lib/i18n";
import BottomNav from "@/components/BottomNav";

type Props = { lang: Lang };

// Reused peaceful landscapes from the existing city image set.
const HERO_IMG = "/cities/BV1hxg8zVE8i.jpg"; // 阳朔 — karst rivers, morning light
const CLOSING_IMG = "/cities/BV1GucuzwEFm.jpg"; // 普洱 — Yunnan mountains, tea country

export default function AboutClient({ lang }: Props) {
  return (
    <main className="min-h-screen pb-28 bg-bg text-ink">
      <LanguageSwitcher lang={lang} />
      <Hero lang={lang} />
      <Mission lang={lang} />
      <Values lang={lang} />
      <Quote lang={lang} />
      <Closing lang={lang} />
      <Footer lang={lang} />
      <BottomNav lang={lang} />
    </main>
  );
}

/* ------------------------------------------------------------------ */

function LanguageSwitcher({ lang }: { lang: Lang }) {
  const otherLang: Lang = lang === "en" ? "zh" : "en";
  return (
    <Link
      href={`/${otherLang}/about`}
      className="fixed top-3 right-3 z-50 glass rounded-full h-9 px-3 flex items-center gap-1 text-[11px] font-semibold text-ink/80 shadow-card hover:shadow-floaty transition-shadow"
      style={{ top: "max(env(safe-area-inset-top), 12px)" }}
      aria-label={`Switch to ${otherLang.toUpperCase()}`}
    >
      <span className="text-sm leading-none">🌐</span>
      <span className="uppercase">{otherLang}</span>
    </Link>
  );
}

/* ----------------------------- Hero -------------------------------- */

function Hero({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax on scroll: image drifts slower than content.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const y = window.scrollY;
        // Only parallax while hero is in view.
        if (y > el.offsetHeight + el.offsetTop) return;
        const img = el.querySelector<HTMLImageElement>("[data-hero-img]");
        if (img) img.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="relative w-full h-[86vh] min-h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ transform: "scale(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
      </div>

      <Fade className="absolute inset-x-0 bottom-0 px-6 pb-20 pt-24 text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-[34px] sm:text-[48px] leading-[1.15] font-semibold tracking-tight">
            {t(lang, "about_hero_title")}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] sm:text-base leading-relaxed text-white/85">
            {t(lang, "about_hero_subtitle")}
          </p>
          <Link
            href={`/${lang}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-semibold shadow-floaty transition-transform active:scale-[0.97] hover:-translate-y-0.5"
          >
            {t(lang, "about_cta_explore")}
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </Fade>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
        <span className="text-[10px] uppercase tracking-[0.2em]">
          {t(lang, "about_scroll")}
        </span>
        <span className="block h-8 w-px bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

/* ---------------------------- Mission ------------------------------ */

function Mission({ lang }: { lang: Lang }) {
  return (
    <section className="px-4 -mt-10 relative z-10">
      <Fade className="mx-auto max-w-2xl rounded-card bg-card p-7 sm:p-10 shadow-floaty">
        <SectionLabel>{t(lang, "about_mission_title")}</SectionLabel>
        <p className="mt-4 text-[20px] sm:text-[24px] leading-snug font-medium text-ink">
          {t(lang, "about_mission_intro")}
        </p>
        <p className="mt-5 text-[15px] leading-[1.85] text-ink/75">
          {t(lang, "about_mission_p1")}
        </p>

        <div className="mt-7 space-y-4">
          <Bullet
            emoji="🌿"
            title={t(lang, "about_mission_bullet1_title")}
            body={t(lang, "about_mission_bullet1")}
            accent="forest"
          />
          <Bullet
            emoji="🏡"
            title={t(lang, "about_mission_bullet2_title")}
            body={t(lang, "about_mission_bullet2")}
            accent="sky"
          />
        </div>
      </Fade>
    </section>
  );
}

function Bullet({
  emoji,
  title,
  body,
  accent,
}: {
  emoji: string;
  title: string;
  body: string;
  accent: "forest" | "sky";
}) {
  const bar =
    accent === "forest"
      ? "bg-forest"
      : "bg-sky";
  const chip =
    accent === "forest"
      ? "bg-forest-soft text-forest-deep"
      : "bg-sky-soft text-sky";
  return (
    <div className="relative pl-4">
      <span className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full ${bar}`} />
      <div className="flex items-start gap-3">
        <span className={`shrink-0 h-9 w-9 rounded-tile flex items-center justify-center text-base ${chip}`}>
          {emoji}
        </span>
        <div>
          <p className="text-[15px] font-semibold text-ink">{title}</p>
          <p className="mt-1 text-[14px] leading-[1.75] text-ink/70">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Values ------------------------------ */

function Values({ lang }: { lang: Lang }) {
  const cards = [
    { emoji: "🌿", title: t(lang, "about_value1_title"), body: t(lang, "about_value1"), accent: "forest" as const },
    { emoji: "🏡", title: t(lang, "about_value2_title"), body: t(lang, "about_value2"), accent: "sky" as const },
    { emoji: "❤️", title: t(lang, "about_value3_title"), body: t(lang, "about_value3"), accent: "orange" as const },
  ];
  return (
    <section className="px-4 mt-20">
      <div className="mx-auto max-w-2xl">
        <Fade>
          <SectionLabel>{t(lang, "about_values_title")}</SectionLabel>
          <p className="mt-2 text-[14px] text-mute">{t(lang, "about_values_sub")}</p>
        </Fade>

        <div className="mt-6 grid gap-4">
          {cards.map((c) => (
            <Fade key={c.title}>
              <ValueCard {...c} />
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  emoji,
  title,
  body,
  accent,
}: {
  emoji: string;
  title: string;
  body: string;
  accent: "forest" | "sky" | "orange";
}) {
  const ring =
    accent === "forest"
      ? "from-forest-soft/80"
      : accent === "sky"
      ? "from-sky-soft/80"
      : "from-orange-soft/80";
  const chip =
    accent === "forest"
      ? "bg-forest-soft text-forest-deep"
      : accent === "sky"
      ? "bg-sky-soft text-sky"
      : "bg-orange-soft text-orange";
  return (
    <div
      className={`group relative rounded-card bg-card p-6 shadow-card hover:shadow-floaty transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
    >
      <div
        className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${ring} to-transparent blur-2xl opacity-70`}
      />
      <div className="relative flex items-start gap-4">
        <span className={`shrink-0 h-12 w-12 rounded-tile flex items-center justify-center text-xl ${chip}`}>
          {emoji}
        </span>
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold text-ink">{title}</h3>
          <p className="mt-1.5 text-[14px] leading-[1.75] text-ink/70">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Quote ------------------------------- */

function Quote({ lang }: { lang: Lang }) {
  return (
    <section className="px-6 mt-24">
      <Fade className="mx-auto max-w-2xl text-center">
        <span className="block text-forest text-5xl leading-none font-serif select-none">“</span>
        <p className="mt-4 text-[22px] sm:text-[26px] leading-[1.55] font-medium tracking-tight text-ink">
          {t(lang, "about_quote")}
        </p>
        <div className="mt-8 mx-auto h-px w-12 bg-ink/15" />
      </Fade>
    </section>
  );
}

/* ---------------------------- Closing ------------------------------ */

function Closing({ lang }: { lang: Lang }) {
  return (
    <section className="relative mt-24 w-full overflow-hidden">
      <div className="relative h-[520px] sm:h-[560px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOSING_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/65" />
      </div>
      <Fade className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <div className="mx-auto max-w-xl">
          <h2 className="text-[26px] sm:text-[32px] leading-[1.3] font-semibold tracking-tight">
            {t(lang, "about_closing_title")}
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/85">
            {t(lang, "about_closing_sub")}
          </p>
          <Link
            href={`/${lang}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full glass-dark text-white px-6 py-3 text-sm font-semibold shadow-floaty transition-transform active:scale-[0.97] hover:-translate-y-0.5"
          >
            {t(lang, "about_cta_start")}
            <span className="text-base leading-none">→</span>
          </Link>
        </div>
      </Fade>
    </section>
  );
}

/* ----------------------------- Footer ------------------------------ */

function Footer({ lang }: { lang: Lang }) {
  const links = [
    { label: t(lang, "footer_home"), href: `/${lang}` },
    { label: t(lang, "footer_cities"), href: `/${lang}` },
    { label: t(lang, "footer_map"), href: `/${lang}` },
    { label: t(lang, "footer_about"), href: `/${lang}/about` },
  ];
  return (
    <footer className="px-6 mt-16">
      <div className="mx-auto max-w-2xl pt-8 border-t border-black/[0.06]">
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] text-mute hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-center text-[12px] text-mute/80">
          © {new Date().getFullYear()} · {t(lang, "footer_copyright")}
        </p>
      </div>
    </footer>
  );
}

/* --------------------------- Helpers ------------------------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-forest">
      <span className="h-1 w-1 rounded-full bg-forest" />
      {children}
    </span>
  );
}

/**
 * Fade-up on scroll-into-view. Uses IntersectionObserver — falls back to
 * visible if IO is unavailable or reduced motion is preferred.
 */
function Fade({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {children}
    </div>
  );
}
