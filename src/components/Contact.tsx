"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { site, socials } from "@/lib/data";
import SocialIcon from "./SocialIcons";

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[60vw] -translate-x-1/2 rounded-full bg-violet/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-0 size-[40vw] rounded-full bg-rose/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-44">
        <Reveal>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose">
            05 — Roll Credits
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-(family-name:--font-display) text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[1.02] tracking-tight">
            Let&apos;s create something
            <br />
            <span className="text-gradient">worth watching.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {site.availability}. Whether it&apos;s a brand campaign, a content
            strategy, or a story that needs telling — my inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.a
            href={`mailto:${site.email}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-rose via-violet to-amber p-px"
          >
            <span className="flex items-center gap-3 rounded-full bg-ink px-9 py-5 text-base font-semibold transition-colors duration-300 hover:bg-transparent">
              {site.email}
              <span aria-hidden>↗</span>
            </span>
          </motion.a>
        </Reveal>

        <div className="mt-24 flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-(family-name:--font-display) text-2xl font-bold">
              Prags<span className="text-rose">.</span>pov
            </p>
            <p className="mt-2 text-sm text-muted">
              {site.role} — {site.location}
            </p>
          </div>

          <ul className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-line px-5 py-3.5 transition-all duration-300 hover:border-rose/60 hover:bg-ink-soft"
                >
                  <SocialIcon
                    name={s.label}
                    className="size-5 text-muted transition-colors duration-300 group-hover:text-rose"
                  />
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-muted">
                      {s.label}
                    </span>
                    <span className="block text-sm transition-colors duration-300 group-hover:text-rose">
                      {s.handle}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-14 text-xs text-muted/60">
          © {new Date().getFullYear()} {site.name}. Crafted with a cinematic eye and an
          unreasonable love for good stories.
        </p>
      </div>
    </footer>
  );
}
