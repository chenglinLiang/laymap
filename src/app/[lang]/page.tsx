import { notFound } from "next/navigation";
import { isLang, t, type Lang } from "@/lib/i18n";
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

  return (
    <HomeClient
      lang={lang}
      placeholder={t(lang, "searchPlaceholder")}
      brand={t(lang, "brand")}
      tagline={t(lang, "tagline")}
      resetLabel={t(lang, "reset")}
      noResults={t(lang, "noResults")}
      noSaved={t(lang, "noSaved")}
    />
  );
}
