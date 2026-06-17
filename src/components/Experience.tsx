"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-y-[3px] border-ink bg-blush/40"
    >
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose">
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
            className="absolute left-0 top-0 hidden h-full w-[3px] origin-top rounded bg-ink md:block"
          />

          <div className="space-y-8 md:space-y-0">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={0.1 * i}>
                <article className="group relative grid gap-4 rounded-3xl p-6 transition-all duration-500 hover:bg-paper hover:shadow-[8px_9px_0_0_rgba(255,61,143,0.25)] md:grid-cols-[180px_1fr] md:gap-12 md:p-10 md:pl-16">
                  {/* timeline node */}
                  <span className="absolute -left-[7px] top-12 hidden size-4 rounded-full border-[3px] border-ink bg-rose md:block" />

                  <div className="pt-1">
                    <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted">
                      {job.period}
                    </p>
                    {job.period.includes("Present") && (
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-rose px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-paper">
                        <span className="size-1.5 animate-pulse rounded-full bg-paper" />
                        Currently working
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-(family-name:--font-display) text-2xl font-bold md:text-3xl">
                      {job.role}
                    </h3>
                    <p className="mt-1 font-medium text-rose-deep">
                      {job.company} · <span className="text-muted">{job.place}</span>
                    </p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border-2 border-ink/15 px-3.5 py-1.5 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-rose/50 group-hover:text-ink"
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
      </div>
    </section>
  );
}
