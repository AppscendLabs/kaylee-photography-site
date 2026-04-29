"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { sendPasswordResetEmail } from "@/lib/email";

export async function loginAdmin(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    await bcrypt.compare(password, "$2b$12$invalidhashfortimingprotection000000000000000000000");
    return { error: "Invalid credentials." };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { error: "Invalid credentials." };
  }

  await createSession({ userId: user.id, email: user.email, name: user.name });
  revalidatePath("/admin");
  return { success: true };
}

export async function logoutAdmin(): Promise<void> {
  await deleteSession();
  revalidatePath("/admin");
}

export async function requestPasswordReset(
  _prev: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get("email")?.toString().trim() ?? "";
  if (!email) return { error: "Email is required." };

  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to prevent email enumeration
  if (!user) return { success: true };

  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt },
  });

  const siteUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  await sendPasswordResetEmail(email, `${siteUrl}/admin/reset-password/${token}`);

  return { success: true };
}

export async function resetPassword(
  _prev: { error?: string; success?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const token = formData.get("token")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirm = formData.get("confirm")?.toString() ?? "";

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const record = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired. Please request a new one." };
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.update({ where: { id: record.userId }, data: { password: hashed } });
  await prisma.passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } });

  return { success: true };
}
