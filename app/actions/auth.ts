"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

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
    // Constant-time response to prevent user enumeration
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
