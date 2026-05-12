import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL("https://designsuite.it"),
    title: {
      default: dict.meta.siteTitleDefault,
      template: dict.meta.siteTitleTemplate,
    },
    description: dict.meta.siteDescription,
    alternates: {
      languages: {
        it: "/",
        en: "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={jost.variable}>
      <body>
        <Header lang={locale} nav={dict.nav} switchLabel={dict.switchLanguage} />
        {children}
        <Footer lang={locale} dict={dict.footer} />
      </body>
    </html>
  );
}
