"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

async function requireAuth() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized.");
}

export async function blockDate(date: Date, reason?: string): Promise<{ error?: string }> {
  await requireAuth();
  const normalized = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  await prisma.blockedDate.upsert({
    where: { date: normalized },
    update: { reason: reason ?? null },
    create: { date: normalized, reason: reason ?? null },
  });
  revalidatePath("/admin");
  return {};
}

export async function unblockDate(date: Date): Promise<{ error?: string }> {
  await requireAuth();
  const normalized = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  await prisma.blockedDate.deleteMany({ where: { date: normalized } });
  revalidatePath("/admin");
  return {};
}

export async function updateWorkingDay(dayOfWeek: number, isActive: boolean): Promise<{ error?: string }> {
  await requireAuth();
  await prisma.workingDay.update({ where: { dayOfWeek }, data: { isActive } });
  revalidatePath("/admin");
  return {};
}

export async function addTimeSlot(time: string): Promise<{ error?: string }> {
  await requireAuth();
  const count = await prisma.availableTimeSlot.count();
  await prisma.availableTimeSlot.create({ data: { time, isActive: true, sortOrder: count } });
  revalidatePath("/admin");
  return {};
}

export async function removeTimeSlot(time: string): Promise<{ error?: string }> {
  await requireAuth();
  await prisma.availableTimeSlot.delete({ where: { time } });
  revalidatePath("/admin");
  return {};
}

export async function toggleTimeSlot(time: string, isActive: boolean): Promise<{ error?: string }> {
  await requireAuth();
  await prisma.availableTimeSlot.update({ where: { time }, data: { isActive } });
  revalidatePath("/admin");
  return {};
}
