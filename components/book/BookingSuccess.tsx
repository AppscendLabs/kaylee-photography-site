"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface BookingSuccessProps {
  onReset: () => void;
}

export default function BookingSuccess({ onReset }: BookingSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center py-20"
    >
      <CheckCircle2 className="w-16 h-16 text-green-700 mb-6" strokeWidth={1} />
      <h2 className="text-3xl font-serif mb-4">Request Received</h2>
      <p className="font-light text-neutral-600 max-w-sm mb-8">
        Thank you for reaching out. I&apos;ll review your preferred time and get back to you within
        48 hours to confirm the details and deposit.
      </p>
      <button
        onClick={onReset}
        className="uppercase tracking-widest text-xs border-b border-black pb-1 hover:text-neutral-500 transition-colors"
      >
        Make another booking
      </button>
    </motion.div>
  );
}
