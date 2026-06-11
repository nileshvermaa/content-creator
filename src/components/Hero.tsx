"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { site, socials } from "@/lib/data";
import SocialIcon from "./SocialIcons";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 3D backdrop */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* soft vignette so type stays readable over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#07070d_88%)]" />

      {/* giant outlined backdrop word */}
      <div
        aria-hidden
        className="text-stroke pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-(family-name:--font-display) text-[26vw] font-extrabold leading-none tracking-tight"
      >
        POV
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-muted"
        >
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-rose" />
          {site.role}
        </motion.p>

        <h1 className="font-(family-name:--font-display) text-[clamp(2.5rem,10.5vw,8.5rem)] font-extrabold leading-[0.95] tracking-tight">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            {site.firstName}
          </motion.span>
          <motion.span
            className="text-gradient block"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease }}
          >
            {site.lastName}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          {site.tagline} I craft scroll-stopping stories and manage digital media
          that turns audiences into communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group relative overflow-hidden rounded-full bg-cream px-8 py-4 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-105"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-cream">
              View my work
            </span>
            <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-rose to-violet transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-8 py-4 text-sm font-semibold text-cream transition-colors duration-300 hover:border-rose hover:text-rose"
          >
            Let&apos;s collaborate
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 flex flex-wrap items-center gap-3"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} — ${s.handle}`}
              className="group flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-rose/60 hover:text-cream"
            >
              <SocialIcon name={s.label} className="size-4 transition-colors duration-300 group-hover:text-rose" />
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mx-auto mb-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-rose to-transparent"
        />
      </motion.div>
    </section>
  );
}
