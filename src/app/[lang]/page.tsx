import { notFound } from "next/navigation";
import { cities } from "@/lib/cities";
import { isLang, t, tf, type Lang } from "@/lib/i18n";
import HomeClient from "./home-client";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang as Lang;

  // Pre-compute static strings; the client imports the formatter directly
  // (server components can't pass functions across the boundary).
  const placeholder = t(lang, "searchPlaceholder");
  const citiesCountStr = tf(lang, "citiesCount")(cities.length);

  return (
    <HomeClient
      lang={lang}
      placeholder={placeholder}
      citiesCountStr={citiesCountStr}
      brand={t(lang, "brand")}
      tagline={t(lang, "tagline")}
      resetLabel={t(lang, "reset")}
      noResults={t(lang, "noResults")}
    />
  );
}
