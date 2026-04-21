"use client";

import { motion } from "framer-motion";

export default function WorksHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-8"
    >
      <h1 className="text-5xl md:text-8xl font-serif mb-6">Selected Works</h1>
    </motion.div>
  );
}
