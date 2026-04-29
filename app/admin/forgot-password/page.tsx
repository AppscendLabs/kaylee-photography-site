"use client";

import { useActionState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { requestPasswordReset } from "@/app/actions/auth";

const initialState = { error: undefined, success: undefined };

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, initialState);

  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 border border-neutral-200 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">Reset Password</h1>
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Kaylee Light Photography
          </p>
        </div>

        {state?.success ? (
          <div className="text-center">
            <p className="text-sm font-light text-neutral-600 leading-relaxed mb-6">
              If that email is registered, you&apos;ll receive a reset link shortly. Check your inbox.
            </p>
            <Link
              href="/admin"
              className="text-xs uppercase tracking-widest text-neutral-400 border-b border-transparent hover:border-neutral-400 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form action={formAction} className="flex flex-col gap-6">
            <p className="text-sm font-light text-neutral-500">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-500">
                Email Address
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

            {state?.error && (
              <p className="text-sm text-red-600 font-light" role="alert">{state.error}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors mt-2 disabled:opacity-70"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center">
              <Link
                href="/admin"
                className="text-xs uppercase tracking-widest text-neutral-400 border-b border-transparent hover:border-neutral-400 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
