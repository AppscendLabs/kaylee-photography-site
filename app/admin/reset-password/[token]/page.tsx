"use client";

import { useActionState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";
import { resetPassword } from "@/app/actions/auth";

const initialState = { error: undefined, success: undefined };

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [state, formAction, isPending] = useActionState(resetPassword, initialState);

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 border border-neutral-200 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">New Password</h1>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Kaylee Light Photography
          </p>
        </div>

        {state?.success ? (
          <div className="text-center">
            <p className="text-sm font-light text-neutral-600 leading-relaxed mb-6">
              Your password has been updated. You can now log in with your new password.
            </p>
            <Link
              href="/admin"
              className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors inline-block"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form action={formAction} className="flex flex-col gap-6">
            <input type="hidden" name="token" value={token} />

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs uppercase tracking-widest text-neutral-500">
                New Password
              </label>
              <input
                id="password"
                name="password"
                required
                type="password"
                minLength={8}
                autoComplete="new-password"
                className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirm" className="text-xs uppercase tracking-widest text-neutral-500">
                Confirm Password
              </label>
              <input
                id="confirm"
                name="confirm"
                required
                type="password"
                minLength={8}
                autoComplete="new-password"
                className="border-b border-neutral-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-light"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-600 font-light" role="alert">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors mt-2 disabled:opacity-70"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
