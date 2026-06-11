import { marqueeWords } from "@/lib/data";

/** Infinite scrolling strip dividing the hero from the story. */
export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-soft py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-(--animate-marquee) gap-12">
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-12 font-(family-name:--font-display) text-xl font-semibold uppercase tracking-wide text-muted"
          >
            {word}
            <span className="text-rose">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
