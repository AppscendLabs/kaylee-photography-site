import type { Metadata } from "next";
import WorksGallery from "@/components/works/WorksGallery";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "Browse the full photography portfolio of Kaylee Light — portraits, families, events, and lifestyle sessions.",
};

export default function WorksPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 w-full max-w-[1600px] mx-auto min-h-screen bg-[#F8F8F6]">
      <WorksGallery />
    </div>
  );
}
