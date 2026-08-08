"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 55%"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  const activeJob = experience[activeIndex];

  return (
    <section id="experience" className="relative border-y-[3px] border-ink bg-blush/40">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose">
            02 &mdash; The Journey
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
            Where strategy met <span className="text-rose">the feed.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Four chapters across pharma, finance, client portfolios, and fitness &mdash; each
            one sharpening the same instinct: make the work useful, then make it memorable.
          </p>
        </Reveal>

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
          <aside className="sticky top-28 hidden lg:block" aria-live="polite">
            <div className="overflow-hidden rounded-2xl border-[3px] border-ink bg-ink p-6 text-paper">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-paper/55">
                Now playing
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeJob.company}
                  initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -7, filter: "blur(3px)" }}
                  transition={{ duration: reducedMotion ? 0 : 0.28, ease }}
                  className="mt-12"
                >
                  <p className="font-(family-name:--font-display) text-6xl font-extrabold leading-none text-rose">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                  <p className="font-(family-name:--font-display) mt-5 text-xl font-bold leading-tight">
                    {activeJob.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/60">{activeJob.period}</p>
                </motion.div>
              </AnimatePresence>
              <div className="mt-10 flex gap-1.5" aria-hidden>
                {experience.map((job, index) => (
                  <motion.span
                    key={job.company}
                    animate={{
                      backgroundColor: index <= activeIndex ? "#ff3d8f" : "rgba(253,249,245,0.18)",
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    className="h-1.5 flex-1 rounded-full"
                  />
                ))}
              </div>
            </div>
          </aside>

          <div ref={timelineRef} className="relative pl-9 sm:pl-12">
            <div className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-ink/15 sm:left-[9px]" />
            <motion.div
              style={{ scaleY: reducedMotion ? 1 : timelineProgress }}
              className="absolute bottom-0 left-[7px] top-0 w-0.5 origin-top bg-rose sm:left-[9px]"
              aria-hidden
            />

            <div>
              {experience.map((job, index) => (
                <motion.article
                  key={job.company}
                  onViewportEnter={() => setActiveIndex(index)}
                  initial={reducedMotion ? false : { opacity: 0.72, y: 16 }}
                  animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.48, margin: "-8% 0px -34% 0px" }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease }}
                  className={`relative grid gap-5 border-b-2 border-ink/10 py-10 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-10 ${
                    job.current ? "rounded-2xl bg-paper/65 px-5 sm:px-7" : ""
                  }`}
                >
                  <motion.span
                    animate={{
                      scale: index <= activeIndex ? 1 : 0.72,
                      backgroundColor: index <= activeIndex ? "#ff3d8f" : "#fdf9f5",
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.25, ease }}
                    className="absolute -left-[2.42rem] top-12 size-4 rounded-full border-[3px] border-ink sm:-left-[2.9rem]"
                    aria-hidden
                  />

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {job.period}
                    </p>
                    {job.current && (
                      <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-paper">
                        <span className="size-1.5 rounded-full bg-rose motion-safe:animate-pulse" />
                        Current chapter
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-(family-name:--font-display) text-2xl font-bold leading-tight text-balance md:text-3xl">
                      {job.role}
                    </h3>
                    <p className="mt-2 font-semibold text-rose-deep">
                      {job.company} <span className="font-normal text-muted">&middot; {job.place}</span>
                    </p>
                    <p className="mt-5 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-ink/70">
                          <span className="mr-1.5 text-rose" aria-hidden>
                            +
                          </span>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
