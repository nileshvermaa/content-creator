"use client";

import { useEffect } from "react";

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
export default function InstagramEmbed({ url }: { url: string }) {
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
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#fff",
        border: 0,
        margin: 0,
        padding: 0,
        width: "100%",
        minWidth: 0,
        boxShadow: "none",
      }}
    />
  );
}
