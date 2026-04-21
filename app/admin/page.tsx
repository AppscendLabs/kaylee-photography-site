import type { Metadata } from "next";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import type { BookingRequest, PackageSetting } from "@/types";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Kaylee Light Photography — client and schedule management portal.",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    return <AdminLogin />;
  }

  const [rawBookings, rawSettings] = await Promise.all([
    prisma.bookingRequest.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.packageSetting.findMany({ orderBy: { label: "asc" } }),
  ]);

  // Serialize Prisma Date objects to strings for client components
  const bookings: BookingRequest[] = rawBookings.map((b) => ({
    id: b.id,
    firstName: b.firstName,
    lastName: b.lastName,
    email: b.email,
    sessionDate: b.sessionDate.toISOString(),
    sessionTime: b.sessionTime,
    sessionType: b.sessionType,
    message: b.message,
    status: b.status as BookingRequest["status"],
    paymentStatus: b.paymentStatus as BookingRequest["paymentStatus"],
    depositAmount: b.depositAmount,
    createdAt: b.createdAt.toISOString(),
  }));

  const packageSettings: PackageSetting[] = rawSettings.map((s) => ({
    id: s.id,
    packageKey: s.packageKey,
    label: s.label,
    depositCents: s.depositCents,
  }));

  return (
    <AdminDashboard
      bookings={bookings}
      packageSettings={packageSettings}
      adminName={session.name}
    />
  );
}
