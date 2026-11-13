import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import BrandGallery from "./BrandGallery";
import { brands, brandCount } from "@/lib/data";

/* typeset wordmarks: cycle a few looks so the grid reads like a logo wall */
const looks = [
  "font-display font-black italic",
  "font-poster lowercase",
  "font-display font-bold uppercase tracking-[0.12em] text-[0.8em]",
  "font-label font-semibold uppercase tracking-[0.2em] text-[0.7em]",
];

export default function Brands() {
  return (
    <section id="brands" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead kicker="Brand experience" title="brands" hand="& counting…" />
        <p className="flex size-36 -rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-double border-rose text-center text-rose md:size-44">
          <span className="font-poster text-5xl leading-none md:text-6xl">
            {brandCount}
          </span>
          <span className="kicker mt-1">Brands served</span>
        </p>
      </div>

      <Reveal>
        <ul className="mt-14 grid grid-cols-2 border-l border-t border-ink sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b, i) => {
            const Tag = b.href ? "a" : "div";
            return (
              <li key={b.name} className="border-b border-r border-ink">
                <Tag
                  {...(b.href && { href: b.href, target: "_blank", rel: "noopener noreferrer" })}
                  className="group relative flex h-full min-h-32 flex-col items-center justify-center gap-2 p-4 text-center transition-colors duration-300 hover:bg-rose hover:text-paper"
                >
                  {b.times && (
                    <span className="kicker absolute right-2 top-2 text-rose group-hover:text-paper">
                      ★ ×{b.times}
                      <span className="sr-only"> collaborations</span>
                    </span>
                  )}
                  <span className={`text-2xl leading-tight ${looks[i % looks.length]}`}>
                    {b.name}
                  </span>
                  <span className="text-xs text-muted group-hover:text-paper/80">{b.note}</span>
                </Tag>
              </li>
            );
          })}
          <li className="flex min-h-32 flex-col items-center justify-center border-b border-r border-ink bg-ink p-4 text-center text-paper">
            <span className="font-hand text-4xl leading-none">+ many more</span>
            <span className="mt-1 text-xs text-paper/70">{brandCount} brands in total</span>
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted">
          <span className="text-rose">★</span> Brands that came back for repeat collaborations.
        </p>
      </Reveal>

      <BrandGallery />
    </section>
  );
}
