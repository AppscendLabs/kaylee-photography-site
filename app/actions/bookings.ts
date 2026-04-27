"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { sendDepositEmail } from "@/lib/email";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized.");
  return session;
}

export async function approveBooking(id: string): Promise<{ error?: string }> {
  await requireAuth();
  await prisma.bookingRequest.update({ where: { id }, data: { status: "APPROVED" } });
  revalidatePath("/admin");
  return {};
}

export async function declineBooking(id: string): Promise<{ error?: string }> {
  await requireAuth();
  await prisma.bookingRequest.update({ where: { id }, data: { status: "DECLINED" } });
  revalidatePath("/admin");
  return {};
}

export async function sendDepositLink(bookingId: string): Promise<{ error?: string }> {
  await requireAuth();

  const booking = await prisma.bookingRequest.findUnique({ where: { id: bookingId } });
  if (!booking) return { error: "Booking not found." };
  if (booking.status !== "APPROVED") return { error: "Booking must be approved first." };
  if (booking.paymentStatus === "DEPOSIT_PAID") return { error: "Deposit already paid." };

  await sendDepositEmail({
    clientName: `${booking.firstName} ${booking.lastName}`,
    clientEmail: booking.email,
    sessionType: booking.sessionType,
    sessionDate: booking.sessionDate,
    sessionTime: booking.sessionTime,
    depositCents: booking.depositAmount,
    bookingId: booking.id,
  });

  revalidatePath("/admin");
  return {};
}

export async function updatePackagePrice(
  packageKey: string,
  priceCents: number
): Promise<{ error?: string }> {
  await requireAuth();

  if (priceCents < 100 || priceCents > 1_000_000_00) {
    return { error: "Price must be between $1.00 and $100,000.00." };
  }

  await prisma.packageSetting.update({
    where: { packageKey },
    data: { priceCents },
  });

  revalidatePath("/admin");
  revalidatePath("/packages");
  return {};
}

export async function updatePackageDeposit(
  packageKey: string,
  depositCents: number
): Promise<{ error?: string }> {
  await requireAuth();

  if (depositCents < 100 || depositCents > 1_000_000_00) {
    return { error: "Deposit must be between $1.00 and $100,000.00." };
  }

  await prisma.packageSetting.update({
    where: { packageKey },
    data: { depositCents },
  });

  revalidatePath("/admin");
  return {};
}
