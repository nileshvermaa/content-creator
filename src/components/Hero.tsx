"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site, socials } from "@/lib/data";
import SocialIcon from "./SocialIcons";
import KawaiiCat from "./KawaiiCat";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden bg-paper"
    >
      {/* soft pink wash corners */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-blush blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-[28rem] rounded-full bg-blush blur-3xl" />

      {/* poster corner credits */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute left-6 top-24 text-xs font-semibold tracking-[0.3em] text-muted md:left-10 md:top-28"
      >
        ©2026
      </motion.p>

      {/* center stage: giant word + photo on top */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pt-24 md:pt-20">
        <div className="relative flex w-full items-center justify-center">
          {/* the giant word */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="font-(family-name:--font-display) select-none whitespace-nowrap text-center text-[10vw] font-extrabold leading-none tracking-[-0.05em] text-rose md:text-[11.5vw]"
          >
            P<span className="text-ink">O</span>RTF<span className="text-ink">O</span>LIO
          </motion.h1>

          {/* her photo, in front of the middle letters */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease }}
            className="absolute left-1/2 top-1/2 w-[26vw] min-w-40 max-w-60 -translate-x-1/2 -translate-y-1/2"
          >
            {/* cat peeking over the frame */}
            <KawaiiCat
              variant="peek"
              className="absolute -top-7 right-6 z-10 w-16 text-ink md:-top-8 md:w-20"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-[3px] border-ink bg-paper shadow-[10px_12px_0_0_rgba(255,61,143,0.35)]">
              <Image
                src="/pragati.jpg"
                alt="Pragati Srivastava"
                fill
                priority
                sizes="(min-width: 768px) 240px, 45vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-24 text-center text-[10px] font-semibold uppercase tracking-[0.5em] text-rose md:mt-28 md:text-xs"
        >
          {site.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-5 max-w-md text-center text-sm leading-relaxed text-muted md:text-base"
        >
          {site.tagline} Scroll-stopping stories, managed feeds, and audiences
          that stick around.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#watch"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-all duration-300 hover:bg-rose hover:shadow-[4px_5px_0_0_rgba(22,18,15,0.9)]"
          >
            Watch my work
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-ink px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-rose hover:text-rose"
          >
            Let&apos;s collaborate
          </a>
        </motion.div>
      </div>

      {/* poster footer strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 pb-8 text-[10px] font-semibold uppercase tracking-[0.25em] md:flex-row md:items-end md:justify-between md:px-10 md:text-xs"
      >
        <p className="text-muted">
          Presented by
          <span className="mt-1 block text-sm normal-case tracking-normal text-ink">
            {site.name}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} — ${s.handle}`}
              className="flex items-center gap-1.5 py-1.5 text-muted underline-offset-4 transition-colors duration-300 hover:text-rose hover:underline"
            >
              <SocialIcon name={s.label} className="size-3.5" />
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
