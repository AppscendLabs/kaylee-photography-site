import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const [blockedDates, workingDays, timeSlots, confirmedBookings] = await Promise.all([
    prisma.blockedDate.findMany({ select: { date: true } }),
    prisma.workingDay.findMany({ orderBy: { dayOfWeek: "asc" } }),
    prisma.availableTimeSlot.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.bookingRequest.findMany({
      where: { status: { in: ["PENDING", "APPROVED"] } },
      select: { sessionDate: true, sessionTime: true },
    }),
  ]);

  return NextResponse.json({
    blockedDates: blockedDates.map((d) => d.date.toISOString()),
    disabledDays: workingDays.filter((d) => !d.isActive).map((d) => d.dayOfWeek),
    timeSlots: timeSlots.map((t) => t.time),
    bookedSlots: confirmedBookings.map((b) => ({
      date: b.sessionDate.toISOString(),
      time: b.sessionTime,
    })),
  });
}
