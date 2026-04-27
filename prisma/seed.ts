import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const SALT_ROUNDS = 12;

  // Admin users — change these passwords after first login
  const users = [
    { email: "kmlbug02@gmail.com", name: "Kaylee Light", password: "ChangeMe!Kaylee1" },
    { email: "appscendlabs@gmail.com", name: "Tyler", password: "ChangeMe!Tyler1" },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, SALT_ROUNDS);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { email: u.email, name: u.name, password: hashed },
    });
    console.log(`✓ User: ${u.email}`);
  }

  // Default deposit amounts (~50% of package price)
  const packageDefaults = [
    { packageKey: "portrait", label: "The Portrait Session", priceCents: 45000, depositCents: 22500 },
    { packageKey: "family",   label: "The Family Collection", priceCents: 65000, depositCents: 32500 },
    { packageKey: "event",    label: "The Event Coverage",    priceCents: 120000, depositCents: 60000 },
    { packageKey: "custom",   label: "Custom / Other",        priceCents: 50000, depositCents: 25000 },
  ];

  for (const p of packageDefaults) {
    await prisma.packageSetting.upsert({
      where: { packageKey: p.packageKey },
      update: { priceCents: p.priceCents },
      create: p,
    });
    console.log(`✓ Package: ${p.label} → $${(p.depositCents / 100).toFixed(2)} deposit`);
  }

  // Test bookings — covers every status combo so the admin panel looks real
  const bookings = [
    {
      firstName: "Emily",
      lastName: "Chen",
      email: "emily.chen@example.com",
      sessionDate: new Date("2026-05-10T00:00:00.000Z"),
      sessionTime: "02:00 PM",
      sessionType: "portrait",
      message: "Looking for natural light portraits for my professional headshots. I prefer outdoor locations with greenery.",
      status: "PENDING",
      paymentStatus: "UNPAID",
      depositAmount: 22500,
    },
    {
      firstName: "Marcus",
      lastName: "Johnson",
      email: "marcus.j@example.com",
      sessionDate: new Date("2026-05-18T00:00:00.000Z"),
      sessionTime: "11:30 AM",
      sessionType: "family",
      message: "Family of four including two kids (ages 5 and 8). Would love a mix of posed and candid shots at a park.",
      status: "PENDING",
      paymentStatus: "UNPAID",
      depositAmount: 32500,
    },
    {
      firstName: "Sarah",
      lastName: "Okafor",
      email: "sarah.okafor@example.com",
      sessionDate: new Date("2026-05-24T00:00:00.000Z"),
      sessionTime: "04:30 PM",
      sessionType: "event",
      message: "Corporate product launch event, approximately 200 guests. Need full coverage from setup through networking.",
      status: "APPROVED",
      paymentStatus: "UNPAID",
      depositAmount: 60000,
    },
    {
      firstName: "James",
      lastName: "Rivera",
      email: "james.rivera@example.com",
      sessionDate: new Date("2026-06-03T00:00:00.000Z"),
      sessionTime: "09:00 AM",
      sessionType: "portrait",
      message: "Engagement shoot for me and my partner. We want something romantic and editorial.",
      status: "APPROVED",
      paymentStatus: "DEPOSIT_PAID",
      depositAmount: 22500,
    },
    {
      firstName: "Priya",
      lastName: "Nair",
      email: "priya.nair@example.com",
      sessionDate: new Date("2026-04-12T00:00:00.000Z"),
      sessionTime: "11:30 AM",
      sessionType: "custom",
      message: "Maternity shoot at 32 weeks. Interested in both studio-style and outdoor looks.",
      status: "APPROVED",
      paymentStatus: "DEPOSIT_PAID",
      depositAmount: 25000,
    },
    {
      firstName: "Derek",
      lastName: "Walsh",
      email: "derek.walsh@example.com",
      sessionDate: new Date("2026-04-05T00:00:00.000Z"),
      sessionTime: "02:00 PM",
      sessionType: "family",
      message: "Annual family photos with grandparents visiting from out of town.",
      status: "DECLINED",
      paymentStatus: "UNPAID",
      depositAmount: 32500,
    },
  ];

  for (const b of bookings) {
    await prisma.bookingRequest.upsert({
      where: {
        // Upsert by a combination we can reliably identify — use email+sessionDate
        // Since there's no unique constraint on those, we create only, skip on re-run
        // by catching duplicates via a synthetic unique check below
        id: `seed-${b.email.split("@")[0]}`,
      },
      update: {},
      create: { id: `seed-${b.email.split("@")[0]}`, ...b },
    });
    console.log(`✓ Booking: ${b.firstName} ${b.lastName} (${b.status})`);
  }

  // Working days — Mon through Sat active, Sunday off
  const workingDays = [
    { dayOfWeek: 0, isActive: false }, // Sunday
    { dayOfWeek: 1, isActive: true },  // Monday
    { dayOfWeek: 2, isActive: true },  // Tuesday
    { dayOfWeek: 3, isActive: true },  // Wednesday
    { dayOfWeek: 4, isActive: true },  // Thursday
    { dayOfWeek: 5, isActive: true },  // Friday
    { dayOfWeek: 6, isActive: true },  // Saturday
  ];

  for (const d of workingDays) {
    await prisma.workingDay.upsert({
      where: { dayOfWeek: d.dayOfWeek },
      update: {},
      create: d,
    });
  }
  console.log("✓ Working days seeded");

  // Default time slots
  const timeSlots = [
    { time: "09:00 AM", sortOrder: 0 },
    { time: "11:30 AM", sortOrder: 1 },
    { time: "02:00 PM", sortOrder: 2 },
    { time: "04:30 PM", sortOrder: 3 },
  ];

  for (const t of timeSlots) {
    await prisma.availableTimeSlot.upsert({
      where: { time: t.time },
      update: {},
      create: { ...t, isActive: true },
    });
  }
  console.log("✓ Time slots seeded");

  console.log("\n✅ Seed complete.");
  console.log("⚠️  Change admin passwords after first login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
