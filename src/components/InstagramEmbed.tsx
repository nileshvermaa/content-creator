"use client";

import { useEffect } from "react";
import SocialIcon from "./SocialIcons";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SRC = "https://www.instagram.com/embed.js";
let scriptAdded = false;

/**
 * Renders a single Instagram reel using Instagram's official embed.js,
 * which auto-sizes the card to its true dimensions (no cramping/clipping
 * like a fixed-ratio iframe). The script is injected once and reprocesses
 * every `.instagram-media` blockquote on the page.
 */
export default function InstagramEmbed({ url, label }: { url: string; label: string }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (!scriptAdded) {
      scriptAdded = true;
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      document.body.appendChild(s);
    }
    // poll until embed.js is ready, then render all pending embeds
    const id = window.setInterval(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        window.clearInterval(id);
      }
    }, 400);
    return () => window.clearInterval(id);
  }, [url]);

  return (
    <div className="relative min-h-[32rem] w-full overflow-hidden rounded-xl bg-blush/45">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${label} on Instagram`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-ink"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-ink text-paper">
          <SocialIcon name="Instagram" className="size-6" />
        </span>
        <span className="font-(family-name:--font-display) max-w-xs text-xl font-bold">
          {label}
        </span>
        <span className="text-sm font-semibold text-rose-deep">Watch on Instagram &rarr;</span>
      </a>
      <blockquote
        className="instagram-media relative z-10 min-h-[32rem]"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "transparent",
          border: 0,
          margin: 0,
          padding: 0,
          width: "100%",
          minWidth: 0,
          boxShadow: "none",
        }}
      />
    </div>
  );
}
