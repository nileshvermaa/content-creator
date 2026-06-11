"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { showcase } from "@/lib/data";

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
        className="group relative block h-full overflow-hidden rounded-3xl border border-line bg-ink-soft p-8 transition-colors duration-500 hover:border-transparent md:p-10"
      >
        {/* gradient wash on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-15`}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="font-(family-name:--font-display) text-sm font-bold text-muted">
              {item.index}
            </span>
            <span
              className={`rounded-full bg-gradient-to-r ${item.accent} px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white`}
            >
              {item.platform}
            </span>
          </div>

          <h3 className="font-(family-name:--font-display) mt-10 text-3xl font-bold tracking-tight">
            {item.title}
          </h3>
          <p className="mt-4 flex-1 leading-relaxed text-muted">{item.description}</p>

          <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
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
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose">
          03 — Featured Work
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Two platforms. <span className="text-gradient">One point of view.</span>
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {showcase.map((item, i) => (
          <TiltCard key={item.title} item={item} delay={0.12 * i} />
        ))}
      </div>
    </section>
  );
}
