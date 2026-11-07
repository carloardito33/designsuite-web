import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import "../gestione/gestione.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Check-in online · Designsuite",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F0EEEA" };

export default function CheckinLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={jost.variable}>
      <body className="g-body">{children}</body>
    </html>
  );
}
