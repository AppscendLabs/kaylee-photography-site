"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutTeaser() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="py-24 md:py-32 px-6 bg-[#1A1A1A] text-[#F8F8F6] flex flex-col items-center text-center"
    >
      <h2 className="text-3xl md:text-5xl font-serif mb-8 max-w-3xl leading-snug">
        &ldquo;Photography is the story I fail to put into words. It is an exploration of light,
        emotion, and human connection.&rdquo;
      </h2>
      <p className="text-sm tracking-widest uppercase text-white/50 mb-12">— Kaylee Light</p>
      <Link
        href="/book"
        className="px-8 py-4 border border-white/30 hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm"
      >
        Inquire Now
      </Link>
    </motion.section>
  );
}
