import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validations";
import { sendBookingNotification } from "@/lib/email";
import { z } from "zod";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = result.data;

  // Look up the deposit amount for this session type
  const packageKey = derivePackageKey(data.sessionType);
  const packageSetting = await prisma.packageSetting.findUnique({
    where: { packageKey },
  });
  const depositAmount = packageSetting?.depositCents ?? 25000;

  const booking = await prisma.bookingRequest.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      sessionDate: new Date(data.sessionDate),
      sessionTime: data.sessionTime,
      sessionType: data.sessionType,
      message: data.message,
      depositAmount,
    },
  });

  // Notify Kaylee — awaited so it completes before the serverless function shuts down
  try {
    await sendBookingNotification({
      clientName: `${booking.firstName} ${booking.lastName}`,
      clientEmail: booking.email,
      sessionType: booking.sessionType,
      sessionDate: booking.sessionDate,
      sessionTime: booking.sessionTime,
      message: booking.message,
    });
  } catch (err) {
    console.error("Booking notification email failed:", err);
  }

  return NextResponse.json({ id: booking.id }, { status: 201 });
}

function derivePackageKey(sessionType: string): string {
  const lower = sessionType.toLowerCase();
  if (lower.includes("portrait")) return "portrait";
  if (lower.includes("family")) return "family";
  if (lower.includes("event")) return "event";
  return "custom";
}
