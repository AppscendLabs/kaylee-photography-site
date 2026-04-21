"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Package } from "@/types";

interface PackageCardProps {
  pkg: Package;
  index: number;
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border border-neutral-200 bg-white p-8 md:p-12 flex flex-col hover:border-black transition-colors duration-500"
    >
      <h3 className="text-2xl font-serif mb-2">{pkg.name}</h3>
      <p className="text-sm tracking-widest uppercase mb-6 text-neutral-500">{pkg.price}</p>
      <p className="font-light text-neutral-600 mb-8 min-h-[80px]">{pkg.desc}</p>

      <ul className="flex flex-col gap-4 mb-12 flex-grow">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm font-light">
            <CheckCircle2 className="w-5 h-5 text-neutral-300 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/book"
        className="text-center w-full py-4 border border-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-colors"
      >
        Inquire Now
      </Link>
    </motion.div>
  );
}
