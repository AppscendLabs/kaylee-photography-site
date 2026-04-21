"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FEATURED_WORKS } from "@/lib/constants";

export default function FeaturedWorks() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto z-10 relative bg-[#F8F8F6]">
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
        {FEATURED_WORKS.map((work) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: work.delay }}
            className={[work.colSpan, work.offsetClass, "flex flex-col gap-4"]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={`${work.aspectRatio} overflow-hidden bg-neutral-200 relative`}>
              <Image
                src={work.src}
                alt={work.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex justify-between items-center text-sm font-light">
              <h3 className="uppercase tracking-widest">{work.title}</h3>
              <span className="text-neutral-500">{work.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
