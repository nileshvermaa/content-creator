"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcons";
import { socials, youtubeShorts, instagramReels } from "@/lib/data";

const instagram = socials.find((s) => s.label === "Instagram")!;
const youtube = socials.find((s) => s.label === "YouTube")!;

function formatViews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);
}

/** 9:16 Short card — thumbnail until clicked, then swaps in the player. */
function ShortCard({ short, delay }: { short: (typeof youtubeShorts)[number]; delay: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal delay={delay}>
      <figure className="group relative aspect-[9/16] overflow-hidden rounded-3xl border border-line bg-ink-soft">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=1&playsinline=1&rel=0`}
            title={short.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${short.title}`}
            className="absolute inset-0 size-full text-left"
          >
            <Image
              src={`https://i.ytimg.com/vi/${short.id}/oardefault.jpg`}
              alt={short.title}
              fill
              sizes="(min-width: 768px) 320px, 80vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* readability gradient */}
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />

            {/* play button */}
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-rose">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 translate-x-0.5">
                <path d="M8 5.14v13.72L19 12 8 5.14Z" />
              </svg>
            </span>

            <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
              Short
            </span>

            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-(family-name:--font-display) text-lg font-bold leading-snug">
                {short.title}
              </p>
              <p className="mt-1.5 text-xs text-muted">
                {formatViews(short.views)} views · {short.date}
              </p>
            </figcaption>
          </button>
        )}
      </figure>
    </Reveal>
  );
}

/** Instagram reel embed (official embed endpoint, lazy-loaded). */
function ReelCard({ url, delay }: { url: string; delay: number }) {
  const code = url.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1];
  if (!code) return null;
  return (
    <Reveal delay={delay}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-line bg-ink-soft">
        <iframe
          src={`https://www.instagram.com/reel/${code}/embed/`}
          title="Instagram reel"
          loading="lazy"
          allow="encrypted-media"
          className="absolute inset-0 size-full"
        />
      </div>
    </Reveal>
  );
}

/** Gradient CTA card closing each rail. */
function FollowCard({
  href,
  icon,
  handle,
  line,
  accent,
  delay,
}: {
  href: string;
  icon: string;
  handle: string;
  line: string;
  accent: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex aspect-[9/16] flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border border-line bg-ink-soft p-8 text-center transition-colors duration-500 hover:border-transparent"
      >
        <span
          className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-20`}
        />
        <SocialIcon name={icon} className="size-10 text-muted transition-colors duration-300 group-hover:text-cream" />
        <span>
          <span className="font-(family-name:--font-display) block text-xl font-bold">{handle}</span>
          <span className="mt-2 block text-sm text-muted">{line}</span>
        </span>
        <span className="rounded-full border border-line px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:border-rose group-hover:text-rose">
          Follow →
        </span>
      </a>
    </Reveal>
  );
}

export default function Watch() {
  return (
    <section id="watch" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-rose">
          04 — Now Streaming
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Don&apos;t take my word for it — <span className="text-gradient">press play.</span>
        </h2>
      </Reveal>

      {/* YouTube Shorts rail */}
      <div className="mt-20 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-muted">
          <SocialIcon name="YouTube" className="size-4 text-rose" />
          Latest Shorts
        </h3>
        <a
          href={youtube.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-rose"
        >
          All videos →
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {youtubeShorts.map((short, i) => (
          <ShortCard key={short.id} short={short} delay={0.08 * i} />
        ))}
        <FollowCard
          href={youtube.href}
          icon="YouTube"
          handle={youtube.handle}
          line="Unfiltered stories, every week"
          accent="from-red-500 via-orange-500 to-amber-400"
          delay={0.08 * youtubeShorts.length}
        />
      </div>

      {/* Instagram rail */}
      <div className="mt-20 flex items-center justify-between gap-4">
        <h3 className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-muted">
          <SocialIcon name="Instagram" className="size-4 text-rose" />
          On the feed
        </h3>
        <a
          href={instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-rose"
        >
          All reels →
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {instagramReels.map((url, i) => (
          <ReelCard key={url} url={url} delay={0.08 * i} />
        ))}
        <FollowCard
          href={instagram.href}
          icon="Instagram"
          handle={instagram.handle}
          line="POV-first reels & everyday cinema"
          accent="from-pink-500 via-fuchsia-500 to-violet-500"
          delay={0.08 * instagramReels.length}
        />
      </div>
    </section>
  );
}
