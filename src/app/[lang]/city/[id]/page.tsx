import { notFound } from "next/navigation";
import { cities, getCity, getNearby } from "@/lib/cities";
import Hero from "@/components/Hero";
import ScoreRing from "@/components/ScoreRing";
import ScoreBar from "@/components/ScoreBar";
import ProConCard from "@/components/ProConCard";
import AudienceCard from "@/components/AudienceCard";
import MonthsTimeline, { MonthLegend } from "@/components/MonthsTimeline";
import CostRow from "@/components/CostRow";
import TipsTimeline, { categorizeTip } from "@/components/TipsTimeline";
import NearbyCityCard from "@/components/NearbyCityCard";
import FavoriteButton from "@/components/FavoriteButton";
import BackButton from "@/components/BackButton";
import BottomNav from "@/components/BottomNav";
import { isLang, t, type Lang } from "@/lib/i18n";
import {
  cityName,
  costValue,
  listField,
  oneLiner,
  provinceName,
} from "@/lib/select";

export function generateStaticParams() {
  const langs = ["en", "zh"] as const;
  return langs.flatMap((lang) =>
    cities.map((c) => ({ lang, id: c.id }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const city = getCity(params.id);
  if (!city) return { title: "Not found" };
  return {
    title: `${city.city}`,
    description: city.one_liner,
  };
}

const AUDIENCE_EMOJI = ["👴", "💻", "📷", "🎨", "🧘", "🌿", "👨‍👩‍👧", "🐕"];
const AVOID_EMOJI = ["🌃", "🛍", "🏙", "🎉", "🚗", "🛰"];
const PRO_EMOJI = ["🌿", "💰", "🏥", "🌸", "🚄", "📶", "🏖", "🏔", "🥬", "🌊", "❄️", "☕"];
const CON_EMOJI = ["⚠️", "🚌", "🌙", "🛒", "🚧", "📡", "🥶", "🚑"];

export default function CityDetailPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang as Lang;
  const city = getCity(params.id);
  if (!city) notFound();
  const nearby = getNearby(city);

  const pros = listField(city, "pros", lang);
  const cons = listField(city, "cons", lang);
  const goodFor = listField(city, "good_for", lang);
  const avoidFor = listField(city, "avoid_for", lang);
  const tips = listField(city, "tips", lang);
  const tags = listField(city, "tags", lang);

  return (
    <main className="min-h-screen bg-bg pb-28">
      {/* Hero */}
      <div className="relative">
        <Hero cityId={city.id} province={city.province} city={city.city} size="hero" />
        <div
          className="absolute top-0 inset-x-0 px-4 flex items-center justify-between"
          style={{ paddingTop: "max(env(safe-area-inset-top), 48px)" }}
        >
          <BackButton lang={lang} label={t(lang, "back")} />
          <FavoriteButton cityId={city.id} chipClassName="glass" />
        </div>
      </div>

      {/* Title block */}
      <section className="px-5 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-mute">
          {provinceName(city, lang)} · {lang === "zh" ? city.province_en : city.province_en}
        </p>
        <div className="flex items-start justify-between gap-4 mt-1.5">
          <h1 className="text-[32px] font-semibold tracking-tight leading-tight">
            {cityName(city, lang)}
          </h1>
          <ScoreRing score={city.overall_score} size={72} stroke={6} />
        </div>
        <p className="text-[15px] text-ink/80 leading-relaxed mt-3">
          {oneLiner(city, lang)}
        </p>
      </section>

      {/* Section 1: Dimension Scores */}
      <Section title={t(lang, "sec_scores")} subtitle={t(lang, "sec_scores_sub")}>
        <ScoreBar label={t(lang, "sc_natural_env")} emoji="🌿" score={city.scores.natural_env} />
        <ScoreBar label={t(lang, "sc_cost_of_living")} emoji="💰" score={city.scores.cost_of_living} />
        <ScoreBar label={t(lang, "sc_rent")} emoji="🏠" score={city.scores.rent} />
        <ScoreBar label={t(lang, "sc_transportation")} emoji="🚄" score={city.scores.transportation} />
        <ScoreBar label={t(lang, "sc_healthcare")} emoji="🏥" score={city.scores.healthcare} />
        <ScoreBar label={t(lang, "sc_climate")} emoji="🌤" score={city.scores.climate} />
        <ScoreBar label={t(lang, "sc_long_term_live")} emoji="🛋" score={city.scores.long_term_live} />
      </Section>

      {/* Section 2: Pros */}
      {pros.length > 0 && (
        <Section title={t(lang, "sec_pros")} subtitle={t(lang, "sec_pros_sub")}>
          <div className="grid grid-cols-1 gap-2">
            {pros.map((p, i) => (
              <ProConCard key={i} variant="pro" emoji={PRO_EMOJI[i % PRO_EMOJI.length]}>
                {p}
              </ProConCard>
            ))}
          </div>
        </Section>
      )}

      {/* Section 3: Cons */}
      {cons.length > 0 && (
        <Section title={t(lang, "sec_cons")} subtitle={t(lang, "sec_cons_sub")}>
          <div className="grid grid-cols-1 gap-2">
            {cons.map((c, i) => (
              <ProConCard key={i} variant="con" emoji={CON_EMOJI[i % CON_EMOJI.length]}>
                {c}
              </ProConCard>
            ))}
          </div>
        </Section>
      )}

      {/* Section 4: Who should come */}
      {goodFor.length > 0 && (
        <Section title={t(lang, "sec_good_for")} subtitle={t(lang, "sec_good_for_sub")}>
          <div className="grid grid-cols-2 gap-2.5">
            {goodFor.map((g, i) => (
              <AudienceCard
                key={i}
                variant="good"
                emoji={AUDIENCE_EMOJI[i % AUDIENCE_EMOJI.length]}
                title={g}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Section 5: Who should avoid */}
      {avoidFor.length > 0 && (
        <Section title={t(lang, "sec_avoid_for")} subtitle={t(lang, "sec_avoid_for_sub")}>
          <div className="grid grid-cols-1 gap-2">
            {avoidFor.map((a, i) => (
              <AudienceCard
                key={i}
                variant="avoid"
                emoji={AVOID_EMOJI[i % AVOID_EMOJI.length]}
                title={a}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Section 6: Best Months */}
      <Section title={t(lang, "sec_months")} subtitle={t(lang, "sec_months_sub")}>
        <MonthsTimeline
          recommended={city.best_months.recommended}
          avoid={city.best_months.avoid}
          lang={lang}
        />
        <MonthLegend lang={lang} />
      </Section>

      {/* Section 7: Cost Snapshot */}
      <Section title={t(lang, "sec_cost")} subtitle={t(lang, "sec_cost_sub")}>
        <div className="grid grid-cols-2 gap-2.5">
          <CostRow emoji="🏠" label={t(lang, "cost_rent")} value={costValue(city, "monthly_rent", lang)} />
          <CostRow emoji="🍚" label={t(lang, "cost_meals")} value={costValue(city, "meals", lang)} />
          <CostRow emoji="🔑" label={t(lang, "cost_house")} value={costValue(city, "house_price", lang)} />
        </div>
      </Section>

      {/* Section 8: Things to Know */}
      {tips.length > 0 && (
        <Section title={t(lang, "sec_tips")} subtitle={t(lang, "sec_tips_sub")}>
          <TipsTimeline
            items={tips.map((tip) => ({ text: tip, kind: categorizeTip(tip) }))}
          />
        </Section>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <Section title={t(lang, "sec_tags")}>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-chip bg-white border border-black/[0.06] text-[11px] text-ink/70 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Nearby similar cities */}
      {nearby.length > 0 && (
        <Section title={t(lang, "sec_nearby")} subtitle={t(lang, "sec_nearby_sub")}>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
            {nearby.map((n) => (
              <NearbyCityCard key={n.id} city={n} lang={lang} />
            ))}
          </div>
        </Section>
      )}

      <BottomNav lang={lang} />
    </main>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-6 border-t border-black/[0.04]">
      <div className="mb-3.5">
        <h2 className="text-[19px] font-semibold tracking-tight text-ink">{title}</h2>
        {subtitle && <p className="text-[12px] text-mute mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
