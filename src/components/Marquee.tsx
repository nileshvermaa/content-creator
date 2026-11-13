import { marqueeWords } from "@/lib/data";

/** Scrolling strip dividing the hero from the story. */
export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div aria-hidden className="overflow-hidden border-y-2 border-ink bg-ink py-3">
      <div className="flex w-max animate-(--animate-marquee) gap-10">
        {row.map((word, i) => (
          <span key={i} className="kicker flex shrink-0 items-center gap-10 text-paper">
            {word}
            <span className="text-blush">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
