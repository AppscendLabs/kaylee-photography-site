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

  // Default deposit amounts (50% of package price)
  const packageDefaults = [
    { packageKey: "portrait", label: "The Portrait Session", depositCents: 22500 },
    { packageKey: "family", label: "The Family Collection", depositCents: 32500 },
    { packageKey: "event", label: "The Event Coverage", depositCents: 60000 },
    { packageKey: "custom", label: "Custom / Other", depositCents: 25000 },
  ];

  for (const p of packageDefaults) {
    await prisma.packageSetting.upsert({
      where: { packageKey: p.packageKey },
      update: {},
      create: p,
    });
    console.log(`✓ Package: ${p.label} → $${(p.depositCents / 100).toFixed(2)} deposit`);
  }

  console.log("\n✅ Seed complete.");
  console.log("⚠️  Change passwords after first login via the admin panel.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
