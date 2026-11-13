import Image from "next/image";
import { site, heroLabels } from "@/lib/data";
import { hasResume } from "@/lib/resume";

/** Hand-drawn curly arrow. Drawn pointing up-left; flipped with CSS for the other corners. */
function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`hidden w-24 shrink-0 text-rose md:block lg:w-32 ${className}`}
    >
      <path d="M116 50C92 54 70 44 66 30c-3-11 10-17 15-8 5 10-9 20-26 16C40 35 24 26 8 12" />
      <path d="M22 8 7 11l5 15" />
    </svg>
  );
}

const labelBase =
  "flex items-center justify-center gap-2 font-hand text-2xl leading-none text-ink md:text-4xl lg:text-[2.6rem]";

export default function Hero() {
  return (
    <header id="home" className="relative overflow-hidden px-6 pb-20 pt-24 md:px-10 md:pb-28">
      {/* collage: crumpled newspaper in the corner, a street lamp on the ground line */}
      <Image
        src="/decor/newspaper.jpg"
        alt=""
        width={736}
        height={952}
        priority
        className="decor -right-6 top-10 w-28 sm:w-64 lg:w-[22rem]"
      />
      <Image
        src="/decor/lamp.jpg"
        alt=""
        width={503}
        height={1038}
        className="decor -bottom-2 left-2 hidden w-40 lg:block xl:left-[4%] xl:w-48"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="kicker flex gap-8 border-t border-ink pt-3 text-muted">
          <span>{site.location}</span>
          <span className="text-rose">Open to work</span>
        </div>

        <p className="mt-10 -rotate-2 text-center font-script text-4xl md:text-7xl">
          Hi, I&apos;m {site.firstName} —
        </p>
        <h1 className="text-center font-poster text-[clamp(4.2rem,21vw,17rem)] lowercase leading-[0.85] tracking-[-0.03em] text-rose">
          <span className="sr-only">{site.name} — </span>
          portfolio
        </h1>

        {/* photo in the middle, a handwritten label off each corner */}
        <div className="relative mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-x-4 gap-y-4 md:-mt-[4vw] md:grid-cols-[1fr_auto_1fr] md:grid-rows-2 md:gap-x-3 md:gap-y-24">
          <figure className="polaroid relative col-span-2 w-[min(74vw,21rem)] rotate-2 justify-self-center md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/pragati.jpg"
                alt="Pragati Srivastava smiling at a café table in Lucknow"
                fill
                priority
                sizes="(min-width: 768px) 336px, 74vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-hand text-2xl">
              that&apos;s me!
            </figcaption>
          </figure>

          <p className={`${labelBase} md:col-start-1 md:row-start-1 md:justify-end md:self-end`}>
            {heroLabels.topLeft}
            <Arrow />
          </p>
          <p className={`${labelBase} md:col-start-3 md:row-start-1 md:justify-start md:self-end`}>
            <Arrow className="-scale-x-100" />
            {heroLabels.topRight}
          </p>
          <p className={`${labelBase} md:col-start-1 md:row-start-2 md:justify-end md:self-start`}>
            {heroLabels.bottomLeft}
            <Arrow className="-scale-y-100" />
          </p>
          <p className={`${labelBase} md:col-start-3 md:row-start-2 md:justify-start md:self-start`}>
            <Arrow className="-scale-100" />
            {heroLabels.bottomRight}
          </p>
        </div>

        <div className="ornament mx-auto mt-14 max-w-md" aria-hidden>
          ❦
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center font-display text-xl italic md:text-2xl">
          “{site.tagline}”
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {hasResume && (
            <a href={site.resume} download="Pragati-Srivastava-Resume.pdf" className="btn btn-solid">
              Download résumé <span aria-hidden>↓</span>
            </a>
          )}
          <a href="#brands" className={`btn ${hasResume ? "" : "btn-solid"}`}>
            See the work
          </a>
          <a href="#contact" className="btn">
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
