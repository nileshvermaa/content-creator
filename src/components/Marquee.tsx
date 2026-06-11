import { marqueeWords } from "@/lib/data";
import KawaiiCat from "./KawaiiCat";

/** Infinite scrolling strip dividing the hero from the story. */
export default function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <div className="relative overflow-hidden border-y-[3px] border-ink bg-ink py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-(--animate-marquee) gap-12">
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-12 font-(family-name:--font-display) text-xl font-semibold uppercase tracking-wide text-paper"
          >
            {word}
            <KawaiiCat variant="paw" className="size-5 text-rose" />
          </span>
        ))}
      </div>
    </div>
  );
}
