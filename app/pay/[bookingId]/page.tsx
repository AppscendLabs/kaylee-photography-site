import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatCents } from "@/lib/stripe";
import PayButton from "@/components/pay/PayButton";

interface PageProps {
  params: Promise<{ bookingId: string }>;
}

export const metadata: Metadata = {
  title: "Complete Your Booking Deposit",
  description: "Secure your photography session with Kaylee Light by completing your deposit.",
  robots: { index: false, follow: false },
};

export default async function PayPage({ params }: PageProps) {
  const { bookingId } = await params;
  const booking = await prisma.bookingRequest.findUnique({ where: { id: bookingId } });

  if (!booking || booking.status !== "APPROVED") {
    notFound();
  }

  if (booking.paymentStatus === "DEPOSIT_PAID" || booking.paymentStatus === "FULLY_PAID") {
    return (
      <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-serif mb-4">Deposit Already Received</h1>
          <p className="font-light text-neutral-600">
            Your deposit has already been processed. We look forward to your session!
          </p>
        </div>
      </div>
    );
  }

  const sessionDateFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(booking.sessionDate);

  const depositFormatted = formatCents(booking.depositAmount);

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        {/* Brand header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
            Kaylee Light Photography
          </p>
          <h1 className="text-4xl md:text-5xl font-serif">Complete Your Booking</h1>
        </div>

        {/* Booking details card */}
        <div className="bg-white border border-neutral-200 p-8 md:p-12 mb-6">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-6">
            Session Details
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-light">Client</span>
              <span className="font-medium">
                {booking.firstName} {booking.lastName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-light">Session Type</span>
              <span className="font-medium">{booking.sessionType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-light">Date</span>
              <span className="font-medium">{sessionDateFormatted}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500 font-light">Time</span>
              <span className="font-medium">{booking.sessionTime}</span>
            </div>
            <div className="border-t border-neutral-100 pt-4 flex justify-between">
              <span className="text-neutral-500 font-light text-sm">Deposit Due</span>
              <span className="text-lg font-medium">{depositFormatted}</span>
            </div>
          </div>

          <PayButton bookingId={booking.id} depositFormatted={depositFormatted} />
        </div>

        <p className="text-center text-xs text-neutral-400 font-light leading-relaxed">
          Your payment is securely processed by Stripe. The remaining balance is due on the day of
          your session. Questions?{" "}
          <a href="mailto:hello@kayleelight.com" className="underline hover:text-neutral-600">
            hello@kayleelight.com
          </a>
        </p>
      </div>
    </div>
  );
}
