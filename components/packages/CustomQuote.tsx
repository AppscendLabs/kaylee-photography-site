"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CustomQuote() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mt-32 text-center"
    >
      <h2 className="text-3xl font-serif mb-4">A La Carte & Custom Quotes</h2>
      <p className="text-neutral-600 max-w-xl mx-auto font-light mb-8">
        Need something specific? Let&apos;s curate a package tailored specifically to your vision.
        Travel is included for destinations within 100 miles.
      </p>
      <Link
        href="/book"
        className="inline-block border-b border-black pb-1 uppercase tracking-widest text-sm hover:text-neutral-500 hover:border-neutral-500 transition-colors"
      >
        Contact for Custom Proposal
      </Link>
    </motion.div>
  );
}
