import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import AboutTeaser from "@/components/home/AboutTeaser";

export const metadata: Metadata = {
  title: "Kaylee Light Photography",
  description:
    "Portrait, Family & Event Photography by Kaylee Light. Capturing elegance and authentic human connection.",
};

export default function HomePage() {
  return (
    <div className="relative bg-[#F8F8F6]">
      <HeroSection />
      <FeaturedWorks />
      <AboutTeaser />
    </div>
  );
}
