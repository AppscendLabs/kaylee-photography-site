"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Package } from "@/types";

interface PackageCardProps {
  pkg: Package & { priceCents: number };
  index: number;
  isPromoActive: boolean;
}

export default function PackageCard({ pkg, index, isPromoActive }: PackageCardProps) {
  const fullPrice = pkg.priceCents / 100;
  const discountedPrice = fullPrice * 0.5;

  const format = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="border border-neutral-200 bg-white p-8 md:p-12 flex flex-col hover:border-black transition-colors duration-500 relative"
    >
      {isPromoActive && (
        <div className="absolute top-0 right-0 bg-black text-white text-[10px] uppercase tracking-widest px-3 py-1.5">
          50% Off
        </div>
      )}

      <h3 className="text-2xl font-serif mb-2">{pkg.name}</h3>

      <div className="mb-6">
        {isPromoActive ? (
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-serif">{format(discountedPrice)}</span>
            <span className="text-sm text-neutral-400 line-through tracking-widest">{format(fullPrice)}</span>
          </div>
        ) : (
          <p className="text-sm tracking-widest uppercase text-neutral-500">{format(fullPrice)}</p>
        )}
      </div>

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
