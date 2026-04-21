import type { Metadata } from "next";
import BookingInfo from "@/components/book/BookingInfo";
import BookingWizard from "@/components/book/BookingWizard";

export const metadata: Metadata = {
  title: "Book & Connect",
  description:
    "Schedule a photography session with Kaylee Light. Select your date, time, and package to get started.",
};

export default function BookPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen bg-[#F8F8F6] flex flex-col md:flex-row gap-16">
      <BookingInfo />
      <div className="md:w-2/3">
        <BookingWizard />
      </div>
    </div>
  );
}
