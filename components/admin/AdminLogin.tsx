"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { loginAdmin } from "@/app/actions/auth";

const initialState = { error: undefined, success: undefined };

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 border border-neutral-200 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">Kaylee Light</h1>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Client &amp; Schedule Portal
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              autoComplete="email"
              className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-widest text-neutral-500"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              required
              type="password"
              autoComplete="current-password"
              className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600 font-light" role="alert">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors mt-4 disabled:opacity-70"
          >
            {isPending ? "Verifying..." : "Access Portal"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-neutral-400 border-b border-transparent hover:border-neutral-400 transition-colors"
          >
            Return to Site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
