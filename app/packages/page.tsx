import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import PackageCard from "@/components/packages/PackageCard";
import CustomQuote from "@/components/packages/CustomQuote";
import PackagesHeader from "@/components/packages/PackagesHeader";
import { PACKAGES } from "@/lib/constants";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Investment",
  description:
    "Photography packages and pricing by Kaylee Light — portraits, family sessions, and event coverage.",
};

const PROMO_EXPIRY = new Date("2026-07-26T00:00:00.000Z");

export default async function PackagesPage() {
  const settings = await prisma.packageSetting.findMany();
  const priceMap = Object.fromEntries(settings.map((s) => [s.packageKey, s.priceCents]));
  const isPromoActive = new Date() < PROMO_EXPIRY;

  const packages = PACKAGES.map((pkg) => {
    const key = pkg.name.toLowerCase().replace(/\s+/g, "-").replace("the-", "").split("-")[0];
    const priceCents = priceMap[key] ?? 0;
    return { ...pkg, priceCents };
  });

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen bg-[#F8F8F6]">
      <PackagesHeader isPromoActive={isPromoActive} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {packages.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} isPromoActive={isPromoActive} />
        ))}
      </div>
      <CustomQuote />
    </div>
  );
}
