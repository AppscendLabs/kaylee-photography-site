"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";

interface PayButtonProps {
  bookingId: string;
  depositFormatted: string;
}

export default function PayButton({ bookingId, depositFormatted }: PayButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handlePay() {
    startTransition(async () => {
      await createCheckoutSession(bookingId);
    });
  }

  return (
    <button
      onClick={handlePay}
      disabled={isPending}
      className="w-full bg-black text-white py-4 px-8 uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isPending ? "Redirecting to Checkout..." : `Pay ${depositFormatted} Deposit`}
    </button>
  );
}
