import Image from "next/image";
import SocialIcon from "./SocialIcons";
import { hasResume } from "@/lib/resume";
import { site, socials } from "@/lib/data";

const onDark =
  "btn border-paper shadow-[4px_4px_0_0_var(--color-rose)] hover:shadow-[2px_2px_0_0_var(--color-rose)]";

export default function Contact() {
  return (
    <footer id="contact" className="torn-top mt-10 bg-ink text-paper">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <figure className="polaroid absolute right-10 top-[24rem] hidden w-52 rotate-3 text-ink lg:block">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" aria-hidden />
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/pragati-night.jpg"
              alt="Portrait of Pragati Srivastava in a red dress at night"
              fill
              sizes="240px"
              className="object-cover"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-hand text-2xl">
            talk soon?
          </figcaption>
        </figure>
        <p className="-rotate-1 font-script text-5xl text-blush">Say hello —</p>
        <h2 className="mt-3 font-display text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[1.02] tracking-tight">
          Let&apos;s create something
          <br />
          <em className="font-normal text-blush">worth watching.</em>
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
          {site.availability}. Whether it&apos;s a full-time role, a brand campaign, or a
          story that needs telling — my inbox is open.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href={`mailto:${site.email}`} className={`${onDark} bg-paper text-ink`}>
            {site.email} <span aria-hidden>↗</span>
          </a>
          {hasResume && (
            <a href={site.resume} download="Pragati-Srivastava-Resume.pdf" className={onDark}>
              Download résumé <span aria-hidden>↓</span>
            </a>
          )}
        </div>

        <div className="mt-28 flex flex-col gap-10 border-t border-paper/20 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-black italic">
              {site.name}
              <span className="text-blush">.</span>
            </p>
            <p className="mt-2 text-sm text-paper/60">{site.role}</p>
            <p className="mt-1 text-sm text-paper/60">{site.location}</p>
          </div>

          <ul className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 border border-paper/25 px-4 py-3 transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  <SocialIcon name={s.label} className="size-5" />
                  <span>
                    <span className="kicker block text-[0.6rem] opacity-60">{s.label}</span>
                    <span className="block text-sm">{s.handle}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 text-xs text-paper/50">
          © {new Date().getFullYear()} {site.name}. Made with a cinematic eye and an
          unreasonable love for good stories.
        </p>
      </div>
    </footer>
  );
}
