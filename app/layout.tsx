import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kaylee Light Photography",
    template: "%s | Kaylee Light Photography",
  },
  description:
    "Portrait, Family & Event Photography by Kaylee Light. Based in New York City, available worldwide.",
  keywords: ["photography", "portrait", "family", "events", "New York", "Kaylee Light"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kaylee Light Photography",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="bg-[#F8F8F6] text-[#1A1A1A] font-sans font-light antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
