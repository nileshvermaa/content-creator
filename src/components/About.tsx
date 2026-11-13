import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { about, site } from "@/lib/data";

const glance = [
  ["Base", site.location],
  ["Currently", "MBA @ IIT Patna"],
  ["Focus", "Content × Strategy"],
  ["Status", "Open to roles & collabs"],
];

export default function About() {
  return (
    <section id="about" className="relative overflow-x-clip">
      <Image
        src="/decor/peonies.jpg"
        alt=""
        width={633}
        height={929}
        className="decor -right-4 top-6 w-36 sm:w-52 lg:right-[max(0px,calc(50vw-46rem))] lg:w-80"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <SectionHead kicker="About me" title="hello!" hand="the story so far" />

      <div className="mt-14 grid gap-12 md:grid-cols-12">
        <article className="md:col-span-7">
          <Reveal>
            <h3 className="font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Every brand has a story.{" "}
              <em className="font-normal text-rose">I make people watch it.</em>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg leading-relaxed">{about.intro}</p>
            <p className="mt-4 text-lg leading-relaxed">{about.philosophy}</p>
          </Reveal>

          <dl className="mt-10 grid grid-cols-2 border-y-2 border-ink sm:grid-cols-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse justify-end border-line px-4 py-5 odd:border-r sm:border-r sm:last:border-r-0"
              >
                <dt className="mt-2 text-sm leading-snug text-muted">{stat.label}</dt>
                <dd className="font-poster text-4xl text-rose">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </article>

        <aside className="md:col-span-5 md:pt-24">
          <Reveal delay={0.15} className="relative mx-auto max-w-sm">
            <figure className="polaroid relative -rotate-2">
              <span className="tape -top-3 left-6 -rotate-6" aria-hidden />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/pragati-garden.jpg"
                  alt="Pragati Srivastava in a red tee, posing under a tree in a garden"
                  fill
                  sizes="(min-width: 768px) 360px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-hand text-2xl">
                golden hour, obviously
              </figcaption>
            </figure>
            <dl className="relative -mt-6 ml-auto w-[88%] rotate-1 bg-paper-soft p-5 shadow-[0_10px_30px_-12px_rgba(29,21,18,0.5)]">
              <p className="font-script text-4xl leading-none text-rose">At a glance</p>
              {glance.map(([k, v]) => (
                <div key={k} className="mt-2 flex justify-between gap-4 border-t border-line pt-2 text-sm">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </aside>
      </div>
      </div>
    </section>
  );
}
