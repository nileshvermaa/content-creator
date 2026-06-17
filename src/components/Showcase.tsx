"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import KawaiiCat from "./KawaiiCat";
import Boopable from "./Boopable";
import { showcase, brandCollabs } from "@/lib/data";

function TiltCard({ item, delay }: { item: (typeof showcase)[number]; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal delay={delay}>
      <motion.a
        ref={ref}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="group relative block h-full overflow-hidden rounded-3xl border-[3px] border-ink bg-paper p-8 transition-shadow duration-500 hover:shadow-[10px_12px_0_0_rgba(255,61,143,0.35)] md:p-10"
      >
        {/* pink wash on hover */}
        <div className="absolute inset-0 bg-blush opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="font-(family-name:--font-display) text-sm font-bold text-muted">
              {item.index}
            </span>
            <span className="rounded-full bg-ink px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper transition-colors duration-300 group-hover:bg-rose">
              {item.platform}
            </span>
          </div>

          <h3 className="font-(family-name:--font-display) mt-10 text-3xl font-bold tracking-tight">
            {item.title}
          </h3>
          <p className="mt-4 flex-1 leading-relaxed text-muted">{item.description}</p>

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rose-deep">
            {item.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function Showcase() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose">
          03 — Featured Work
        </p>
      </Reveal>
      <div className="flex items-end justify-between gap-6">
        <Reveal delay={0.1}>
          <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Two platforms. <span className="text-gradient">One point of view.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="hidden shrink-0 md:block">
          <Boopable>
            <KawaiiCat variant="sit" className="w-20 text-ink" />
          </Boopable>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {showcase.map((item, i) => (
          <TiltCard key={item.title} item={item} delay={0.12 * i} />
        ))}
      </div>

      {/* brand collaborations strip */}
      <Reveal delay={0.1}>
        <div className="mt-16 rounded-3xl border-[3px] border-ink bg-paper p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose">
            Trusted by brands
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {brandCollabs.map((b) => (
              <a
                key={b.name}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-ink/15 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose hover:shadow-[5px_6px_0_0_rgba(255,61,143,0.25)]"
              >
                <span>
                  <span className="font-(family-name:--font-display) block text-lg font-bold">
                    {b.name}
                  </span>
                  <span className="block text-xs text-muted">{b.note}</span>
                </span>
                <span className="text-sm text-muted transition-colors duration-300 group-hover:text-rose">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
