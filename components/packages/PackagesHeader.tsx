"use client";

import { motion } from "framer-motion";

interface PackagesHeaderProps {
  isPromoActive: boolean;
}

export default function PackagesHeader({ isPromoActive }: PackagesHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16 md:mb-24 text-center md:text-left"
    >
      <h1 className="text-5xl md:text-8xl font-serif mb-6">Investment</h1>
      <p className="max-w-2xl text-lg font-light text-neutral-600 md:text-xl">
        I believe your memories deserve to be preserved beautifully. Each collection is carefully
        crafted to offer a holistic storytelling experience.
      </p>
      {isPromoActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 inline-block border border-black px-6 py-3 text-sm font-light"
        >
          To celebrate my launch, I&apos;m offering{" "}
          <span className="font-medium">50% off all sessions</span>{" "}through July 2026. I&apos;d love to work with you.
        </motion.div>
      )}
    </motion.div>
  );
}
