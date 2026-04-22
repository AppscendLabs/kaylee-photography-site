"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PORTFOLIO_IMAGES } from "@/lib/constants";
import type { PortfolioImage } from "@/types";
import { cn } from "@/lib/utils";

// SSR-disabled: ResponsiveMasonry uses window.innerWidth — renders 1 col on server,
// 3 on client, causing a hydration mismatch that breaks the layout.
const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((m) => m.ResponsiveMasonry),
  { ssr: false }
);
const Masonry = dynamic(
  () => import("react-responsive-masonry").then((m) => m.default),
  { ssr: false }
);

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h1 className="text-5xl md:text-8xl font-serif mb-6">Selected Works</h1>
        <div className="flex flex-wrap gap-4 text-sm tracking-widest uppercase">
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
      </motion.div>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        gutterBreakPoints={{ 0: "1rem", 750: "2rem" } as unknown as { [key: number]: number }}
        style={{ width: "100%" }}
      >
        <Masonry>
          {filtered.map((image, i) => (
            <motion.div
              key={`${image.src}-${activeFilter}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="overflow-hidden group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover bg-neutral-200 hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
