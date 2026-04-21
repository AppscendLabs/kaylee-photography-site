import type { Metadata } from "next";
import PackageCard from "@/components/packages/PackageCard";
import CustomQuote from "@/components/packages/CustomQuote";
import PackagesHeader from "@/components/packages/PackagesHeader";
import { PACKAGES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Investment",
  description:
    "Photography packages and pricing by Kaylee Light — portraits from $450, family sessions from $650, and event coverage from $1,200.",
};

export default function PackagesPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto min-h-screen bg-[#F8F8F6]">
      <PackagesHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {PACKAGES.map((pkg, i) => (
          <PackageCard key={pkg.name} pkg={pkg} index={i} />
        ))}
      </div>
      <CustomQuote />
    </div>
  );
}
