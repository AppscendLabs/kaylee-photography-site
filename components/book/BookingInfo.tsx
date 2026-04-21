"use client";

import { motion } from "framer-motion";

export default function BookingInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="md:w-1/3 flex flex-col justify-between"
    >
      <div>
        <h1 className="text-4xl md:text-6xl font-serif mb-6">Let&apos;s Connect</h1>
        <p className="font-light text-neutral-600 mb-8 leading-relaxed">
          I accept a limited number of commissions each year to ensure the highest quality
          experience for every client. Please select a date for an initial consultation or a direct
          booking session.
        </p>

        <div className="space-y-6 mt-12 hidden md:block border-t border-black/10 pt-12">
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-2">Location</h3>
            <p className="font-light text-sm">
              Available Worldwide.
              <br />
              Based in New York City.
            </p>
          </div>
          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold mb-2">
              Direct Inquiry
            </h3>
            <a
              href="mailto:hello@kayleelight.com"
              className="font-light text-sm hover:underline"
            >
              hello@kayleelight.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
