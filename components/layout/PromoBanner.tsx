"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const EXPIRY = new Date("2026-07-26T00:00:00.000Z");
const STORAGE_KEY = "promo-banner-dismissed";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() >= EXPIRY) return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="bg-[#1A1A1A] text-[#F8F8F6] px-10 py-3 flex items-center justify-center gap-4 relative">
      <p className="text-xs font-light tracking-wide text-center leading-relaxed">
        To celebrate my launch, I&apos;m offering{" "}
        <span className="font-medium">50% off all sessions</span>{" "}for a limited time.
        I&apos;d love to work with you.{" "}
        <Link
          href="/packages"
          className="underline underline-offset-2 hover:opacity-70 transition-opacity whitespace-nowrap"
        >
          View packages →
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#F8F8F6]/60 hover:text-[#F8F8F6] transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
