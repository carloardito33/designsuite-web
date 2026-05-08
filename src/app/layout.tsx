import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Designsuite — Affitti di Design a Milano e in Salento",
    template: "%s | Designsuite",
  },
  description:
    "Ville con piscina in Salento e appartamenti di design a Milano. Quattro proprietà selezionate per un soggiorno che non dimenticherai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={jost.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
