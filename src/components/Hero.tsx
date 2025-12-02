"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WebglBackground } from "./WebglBackground";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <WebglBackground />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/10" />
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl rounded-3xl bg-black/55 backdrop-blur-md border border-white/10 p-6 md:p-8"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-orange-300 mb-4">
              The Orange Code
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
              Master Cultural Intelligence for the UAE and GCC
            </h1>
            <p className="text-sm md:text-base text-slate-200 mb-6">
              Learn how communication, trust, and leadership actually work in a
              region where more than two hundred nationalities meet. Build the
              awareness that helps you connect with confidence and grow faster
              in the Gulf.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/#contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-orange-400 text-slate-950 font-medium text-sm md:text-base hover:bg-orange-300 transition"
                >
                  Start Your Transformation
                </motion.button>
              </Link>
              <Link href="/why-cultural-intelligence">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full border border-white/40 text-sm md:text-base hover:bg-white/10 transition"
                >
                  Why Cultural Intelligence Matters
                </motion.button>
              </Link>
            </div>
            <p className="mt-4 text-xs md:text-sm text-slate-300">
              Understand people. Unlock opportunity in the UAE, the Gulf Region.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

