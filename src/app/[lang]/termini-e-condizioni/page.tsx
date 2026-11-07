import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { TerminiIt } from "./TerminiIt";
import { TerminiEn } from "./TerminiEn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = getDictionary(lang).meta;
  return { title: m.termsTitle, description: m.termsDescription };
}

export default async function TerminiCondizioniPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return lang === "en" ? <TerminiEn /> : <TerminiIt />;
}
