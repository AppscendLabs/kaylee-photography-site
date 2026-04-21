"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <section
      ref={container}
      className="h-screen w-full relative overflow-hidden flex items-center justify-center"
    >
      {/* Container is 120% tall so the image can travel during parallax without revealing a gap */}
      <motion.div style={{ y }} className="absolute z-0 inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="https://images.unsplash.com/photo-1660018322139-0e58555df00d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc2NjU5MzQyfDA&ixlib=rb-4.1.0&q=80&w=2000"
          alt="Editorial fashion photography hero"
          fill
          priority
          className="object-cover object-center brightness-75"
          sizes="100vw"
        />
      </motion.div>

      <div className="z-10 text-center text-white px-6 mt-20 mix-blend-difference">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tight mb-6"
        >
          Capturing <br /> Elegance
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-sm md:text-lg tracking-[0.2em] uppercase font-light max-w-xl mx-auto"
        >
          Portrait, Family & Event Photography by Kaylee Light
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-4 mix-blend-difference"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50 animate-pulse" />
      </motion.div>
    </section>
  );
}
