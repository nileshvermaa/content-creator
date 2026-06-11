"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcons";
import KawaiiCat from "./KawaiiCat";
import LocalTime from "./LocalTime";
import { site, socials } from "@/lib/data";

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-paper">
      {/* pink glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 size-[55vw] -translate-x-1/2 rounded-full bg-rose/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-44">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose">
            06 — Roll Credits
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-(family-name:--font-display) text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[1.02] tracking-tight">
            Let&apos;s create something
            <br />
            <span className="text-rose">worth watching.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/60">
            {site.availability}. Whether it&apos;s a brand campaign, a content
            strategy, or a story that needs telling — my inbox is open.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.a
            href={`mailto:${site.email}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-paper px-9 py-5 text-base font-semibold text-ink transition-colors duration-300 hover:bg-rose hover:text-paper"
          >
            {site.email}
            <span aria-hidden>↗</span>
          </motion.a>
        </Reveal>

        {/* a cat watches the credits roll */}
        <KawaiiCat
          variant="peek"
          className="absolute bottom-[7.5rem] right-6 w-24 text-paper/70 md:right-16 md:w-32"
        />

        <div className="mt-24 flex flex-col gap-10 border-t border-paper/15 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-(family-name:--font-display) text-2xl font-bold">
              Prags<span className="text-rose">.</span>pov
            </p>
            <p className="mt-2 text-sm text-paper/60">
              {site.role} — {site.location}
            </p>
            <p className="mt-3 text-xs text-paper/50">
              <LocalTime />
            </p>
          </div>

          <ul className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-paper/20 px-5 py-3.5 transition-all duration-300 hover:border-rose hover:bg-paper/5"
                >
                  <SocialIcon
                    name={s.label}
                    className="size-5 text-paper/60 transition-colors duration-300 group-hover:text-rose"
                  />
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-paper/50">
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

        <p className="mt-14 text-xs text-paper/40">
          © {new Date().getFullYear()} {site.name}. Crafted with a cinematic eye, an
          unreasonable love for good stories, and several imaginary cats.
        </p>
      </div>
    </footer>
  );
}
