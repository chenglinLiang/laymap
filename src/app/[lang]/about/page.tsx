import { notFound } from "next/navigation";
import { isLang, t, type Lang } from "@/lib/i18n";
import AboutClient from "./AboutClient";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang as Lang;

  return <AboutClient lang={lang} />;
}
