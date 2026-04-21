"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PORTFOLIO_IMAGES } from "@/lib/constants";
import type { PortfolioImage } from "@/types";
import { cn } from "@/lib/utils";

type Filter = "all" | PortfolioImage["category"];

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Portraits", value: "portraits" },
  { label: "Families", value: "families" },
  { label: "Events", value: "events" },
];

export default function WorksGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? PORTFOLIO_IMAGES
        : PORTFOLIO_IMAGES.filter((img) => img.category === activeFilter),
    [activeFilter]
  );

  return (
    <>
      <div className="flex flex-wrap gap-4 text-sm tracking-widest uppercase mb-16 md:mb-24">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={cn(
              "pb-1 transition-colors",
              activeFilter === value
                ? "text-black border-b border-black"
                : "text-neutral-400 hover:text-black"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {filtered.map((image, i) => (
          <motion.div
            key={`${image.src}-${activeFilter}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            className="break-inside-avoid overflow-hidden group cursor-pointer relative"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover bg-neutral-200 group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
