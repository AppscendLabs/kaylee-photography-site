"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_WORKS } from "@/lib/constants";

export default function FeaturedWorks() {
  const [w0, w1, w2, w3] = FEATURED_WORKS;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 w-full max-w-[1600px] mx-auto z-10 relative bg-[#F8F8F6]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        <h2 className="text-4xl md:text-6xl font-serif max-w-2xl leading-tight">
          Curated moments of{" "}
          <span className="italic text-neutral-500">authenticity</span> and grace.
        </h2>
        <Link
          href="/works"
          className="group flex items-center gap-4 text-sm uppercase tracking-widest pb-2 border-b border-black/20 hover:border-black transition-colors"
        >
          View full portfolio
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
        {/* Item 1 — large portrait left */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: w0.delay }}
          className="md:col-span-7 flex flex-col gap-4"
        >
          <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
            <img
              src={w0.src}
              alt={w0.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="flex justify-between items-center text-sm font-light">
            <h3 className="uppercase tracking-widest">{w0.title}</h3>
            <span className="text-neutral-500">{w0.category}</span>
          </div>
        </motion.div>

        {/* Item 2 — smaller portrait right, offset down */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: w1.delay }}
          className="md:col-span-5 md:mt-32 flex flex-col gap-4"
        >
          <div className="aspect-[3/4] overflow-hidden bg-neutral-200">
            <img
              src={w1.src}
              alt={w1.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="flex justify-between items-center text-sm font-light">
            <h3 className="uppercase tracking-widest">{w1.title}</h3>
            <span className="text-neutral-500">{w1.category}</span>
          </div>
        </motion.div>

        {/* Item 3 — wide landscape */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: w2.delay }}
          className="md:col-span-6 md:mt-12 flex flex-col gap-4"
        >
          <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
            <img
              src={w2.src}
              alt={w2.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="flex justify-between items-center text-sm font-light">
            <h3 className="uppercase tracking-widest">{w2.title}</h3>
            <span className="text-neutral-500">{w2.category}</span>
          </div>
        </motion.div>

        {/* Item 4 — portrait right, pulled up */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: w3.delay }}
          className="md:col-span-4 md:col-start-8 md:-mt-24 flex flex-col gap-4"
        >
          <div className="aspect-[3/4] overflow-hidden bg-neutral-200">
            <img
              src={w3.src}
              alt={w3.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="flex justify-between items-center text-sm font-light">
            <h3 className="uppercase tracking-widest">{w3.title}</h3>
            <span className="text-neutral-500">{w3.category}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
