"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import KawaiiCat from "./KawaiiCat";
import { about, site } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v)).padStart(2, "0") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return (
    <span
      ref={ref}
      className="font-(family-name:--font-display) text-6xl font-extrabold text-rose"
    >
      00{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      {/* a cat naps on the section divider */}
      <KawaiiCat
        variant="sleep"
        className="absolute -top-10 right-8 w-24 text-ink md:right-16 md:w-28"
      />

      <Reveal>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose">
          01 — The Story
        </p>
      </Reveal>

      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Reveal delay={0.1}>
            <h2 className="font-(family-name:--font-display) text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Every brand has a story.{" "}
              <span className="text-gradient">I make people watch it.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{about.intro}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{about.philosophy}</p>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.15 * i}>
                <div className="border-l-[3px] border-ink pl-5">
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-3 text-sm leading-snug text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* polaroid identity card */}
        <Reveal delay={0.25} className="self-center">
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="relative rotate-2 rounded-3xl border-[3px] border-ink bg-paper p-5 shadow-[10px_12px_0_0_rgba(255,61,143,0.35)] transition-transform duration-500"
          >
            <div className="absolute -top-3 left-8 z-10 flex items-center gap-2 rounded-full bg-rose px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper">
              <span className="size-1.5 animate-pulse rounded-full bg-paper" />
              Now recording
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/pragati.jpg"
                alt="Pragati Srivastava"
                fill
                sizes="(min-width: 768px) 480px, 92vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
              <p className="font-(family-name:--font-display) absolute bottom-4 left-5 text-3xl font-extrabold text-paper">
                P<span className="text-rose">.</span>S
              </p>
            </div>
            <div className="mt-6 space-y-4 px-2 pb-2 text-sm">
              <div className="flex justify-between border-b border-line pb-3">
                <span className="text-muted">Base</span>
                <span className="font-medium">{site.location}</span>
              </div>
              <div className="flex justify-between border-b border-line pb-3">
                <span className="text-muted">Currently</span>
                <span className="font-medium">MBA @ IIT Patna</span>
              </div>
              <div className="flex justify-between border-b border-line pb-3">
                <span className="text-muted">Focus</span>
                <span className="font-medium">Content × Strategy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Status</span>
                <span className="flex items-center gap-2 font-medium">
                  <span className="size-2 animate-pulse rounded-full bg-rose" />
                  Open to collabs
                </span>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
