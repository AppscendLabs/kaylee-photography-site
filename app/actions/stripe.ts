"use server";

import { redirect } from "next/navigation";
import { stripe, formatCents } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function createCheckoutSession(bookingId: string): Promise<void> {
  const booking = await prisma.bookingRequest.findUnique({ where: { id: bookingId } });
  if (!booking) throw new Error("Booking not found.");

  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: booking.email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Photography Deposit — ${booking.sessionType}`,
            description: `Session on ${new Intl.DateTimeFormat("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(booking.sessionDate)} at ${booking.sessionTime}`,
          },
          unit_amount: booking.depositAmount,
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/pay/${bookingId}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pay/${bookingId}`,
    metadata: { bookingId },
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL.");

  redirect(session.url);
}

export async function sendDepositLink(bookingId: string): Promise<{ error?: string }> {
  const session = await getSession();
  if (!session) return { error: "Unauthorized." };

  const booking = await prisma.bookingRequest.findUnique({ where: { id: bookingId } });
  if (!booking) return { error: "Booking not found." };
  if (booking.status !== "APPROVED") return { error: "Booking must be approved first." };

  const { sendDepositEmail } = await import("@/lib/email");
  await sendDepositEmail({
    clientName: `${booking.firstName} ${booking.lastName}`,
    clientEmail: booking.email,
    sessionType: booking.sessionType,
    sessionDate: booking.sessionDate,
    sessionTime: booking.sessionTime,
    depositCents: booking.depositAmount,
    bookingId: booking.id,
  });

  return {};
}
