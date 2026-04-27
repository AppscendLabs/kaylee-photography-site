"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 w-full z-50 flex justify-between items-center p-6 md:p-8 mix-blend-difference text-white">
        <Link
          href="/"
          className="text-xl md:text-2xl font-serif font-medium uppercase tracking-widest relative group"
        >
          Kaylee Light
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          aria-label="Open menu"
        >
          <span className="text-sm uppercase tracking-widest hidden sm:block">Menu</span>
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-[#1A1A1A] text-[#F8F8F6] flex flex-col justify-center px-6 md:px-24"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2 hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <span className="text-sm uppercase tracking-widest hidden sm:block">Close</span>
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col gap-6 md:gap-8 mt-12">
              {NAV_LINKS.map((link, i) => (
                <div key={link.path} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.3 + i * 0.1,
                    }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "text-4xl md:text-7xl lg:text-8xl font-serif transition-[transform,opacity] duration-300 ease-out flex items-center gap-6",
                        pathname === link.path
                          ? "-skew-x-6 opacity-100"
                          : "opacity-60 hover:opacity-100 hover:-skew-x-6",
                      ].join(" ")}
                    >
                      <span className="text-sm md:text-xl font-sans font-light opacity-50 block md:w-16">
                        0{i + 1}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            <div className="absolute bottom-6 md:bottom-12 left-6 md:left-24 right-6 md:right-24 flex justify-between items-end text-xs uppercase tracking-widest opacity-60">
              <div className="flex flex-col gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  Instagram
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  Pinterest
                </a>
              </div>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="hover:opacity-100 transition-opacity"
              >
                Client Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
