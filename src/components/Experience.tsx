"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose">
          02 — The Journey
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Where strategy met <span className="text-gradient">the feed.</span>
        </h2>
      </Reveal>

      <div className="relative mt-20">
        {/* spine */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-rose via-violet to-transparent md:block"
        />

        <div className="space-y-10 md:space-y-0">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={0.1 * i}>
              <article className="group relative grid gap-4 rounded-3xl p-6 transition-colors duration-500 hover:bg-ink-soft md:grid-cols-[180px_1fr] md:gap-12 md:p-10 md:pl-16">
                {/* timeline node */}
                <span className="absolute -left-[5px] top-12 hidden size-2.5 rounded-full bg-rose shadow-[0_0_16px_2px_rgba(255,77,141,0.6)] md:block" />

                <p className="pt-1 text-sm font-medium uppercase tracking-[0.15em] text-muted">
                  {job.period}
                </p>
                <div>
                  <h3 className="font-(family-name:--font-display) text-2xl font-bold md:text-3xl">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-rose">
                    {job.company} · <span className="text-muted">{job.place}</span>
                  </p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted transition-colors duration-300 group-hover:border-violet/40 group-hover:text-cream"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
