"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import SocialIcon from "./SocialIcons";
import KawaiiCat from "./KawaiiCat";
import ViewsChart from "./ViewsChart";
import CatFact from "./CatFact";
import InstagramEmbed from "./InstagramEmbed";
import { socials, youtubeShorts, instagramReels } from "@/lib/data";

const instagram = socials.find((s) => s.label === "Instagram")!;
const youtube = socials.find((s) => s.label === "YouTube")!;

function formatViews(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);
}

/** Shared rail header with icon + "all" link. */
function RailHeader({
  icon,
  title,
  href,
  linkLabel,
}: {
  icon: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mt-20 flex items-center justify-between gap-4">
      <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-ink">
        <span className="flex size-8 items-center justify-center rounded-full bg-ink text-paper">
          <SocialIcon name={icon} className="size-4" />
        </span>
        {title}
      </h3>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-rose"
      >
        {linkLabel} →
      </a>
    </div>
  );
}

/** 9:16 Short card — thumbnail until clicked, then swaps in the player. */
function ShortCard({ short, delay }: { short: (typeof youtubeShorts)[number]; delay: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal delay={delay}>
      <figure className="group relative aspect-[9/16] overflow-hidden rounded-3xl border-[3px] border-ink bg-ink">
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
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-ink bg-paper transition-all duration-300 group-hover:scale-110 group-hover:bg-rose group-hover:text-paper">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 translate-x-0.5">
                <path d="M8 5.14v13.72L19 12 8 5.14Z" />
              </svg>
            </span>

            <span className="absolute right-4 top-4 rounded-full bg-rose px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper">
              Short
            </span>

            <figcaption className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-(family-name:--font-display) text-lg font-bold leading-snug text-paper">
                {short.title}
              </p>
              <p className="mt-1.5 text-xs text-paper/70">
                {formatViews(short.views)} views · {short.date}
              </p>
            </figcaption>
          </button>
        )}
      </figure>
    </Reveal>
  );
}

/** Instagram reel — official embed.js card with caption metadata below. */
function ReelCard({ reel, delay }: { reel: (typeof instagramReels)[number]; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="h-full w-[82vw] max-w-sm shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none"
    >
      <figure className="flex h-full flex-col overflow-hidden rounded-3xl border-[3px] border-ink bg-paper">
        {reel.tag && (
          <figcaption className="flex items-center gap-2 bg-rose px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-paper">
            <SocialIcon name="Instagram" className="size-3.5" />
            {reel.tag}
          </figcaption>
        )}
        <div className="flex flex-1 items-center justify-center p-2">
          <InstagramEmbed url={reel.url} label={reel.caption} />
        </div>
        <figcaption className="border-t-2 border-ink/10 px-4 py-3">
          <p className="font-(family-name:--font-display) truncate text-sm font-bold">
            {reel.caption}
          </p>
          <p className="mt-0.5 text-xs text-muted">{reel.date} · Instagram reel</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/** CTA card closing a rail. */
function FollowCard({
  href,
  icon,
  handle,
  line,
  delay,
}: {
  href: string;
  icon: string;
  handle: string;
  line: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex aspect-[9/16] flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border-[3px] border-ink bg-ink p-8 text-center text-paper transition-all duration-500 hover:bg-rose"
      >
        <SocialIcon name={icon} className="size-10" />
        <span>
          <span className="font-(family-name:--font-display) block text-xl font-bold">{handle}</span>
          <span className="mt-2 block text-sm text-paper/70">{line}</span>
        </span>
        <span className="rounded-full border-2 border-paper/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:border-paper">
          Follow →
        </span>
      </a>
    </Reveal>
  );
}

export default function Watch() {
  return (
    <section id="watch" className="relative border-y-[3px] border-ink bg-blush/40">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-rose">
            04 — Now Streaming
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-(family-name:--font-display) max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Don&apos;t take my word for it — <span className="text-gradient">press play.</span>
          </h2>
        </Reveal>

        {/* Instagram rail — the main stage */}
        <RailHeader
          icon="Instagram"
          title="Brand collabs & latest reels"
          href={instagram.href}
          linkLabel="All reels"
        />
        <div
          className="-mx-6 mt-8 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
          aria-label="Instagram reels and brand collaborations"
        >
          {instagramReels.map((reel, i) => (
            <ReelCard key={reel.url} reel={reel} delay={0.06 * Math.min(i, 5)} />
          ))}
          <div className="h-full w-[82vw] max-w-sm shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none">
            <FollowCard
              href={instagram.href}
              icon="Instagram"
              handle={instagram.handle}
              line="POV-first reels & everyday cinema"
              delay={0.36}
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-muted lg:hidden">
          Swipe to explore all collaborations
        </p>

        {/* YouTube rail */}
        <RailHeader
          icon="YouTube"
          title="Latest Shorts"
          href={youtube.href}
          linkLabel="All videos"
        />
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {youtubeShorts.map((short, i) => (
            <ShortCard key={short.id} short={short} delay={0.08 * i} />
          ))}
          <FollowCard
            href={youtube.href}
            icon="YouTube"
            handle={youtube.handle}
            line="Unfiltered stories, every week"
            delay={0.08 * youtubeShorts.length}
          />
        </div>

        {/* growth chart */}
        <ViewsChart />

        {/* live cat-fact intermission */}
        <CatFact />

        {/* a paw-print trail wanders off the section */}
        <div className="mt-10 flex items-center gap-3 opacity-30" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <KawaiiCat
              key={i}
              variant="paw"
              className={`size-4 text-ink ${i % 2 ? "translate-y-1 rotate-12" : "-rotate-6"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
