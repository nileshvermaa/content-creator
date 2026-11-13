/** Poster-style section title: small kicker, huge lowercase word, handwritten aside. */
export default function SectionHead({
  kicker,
  title,
  hand,
  light = false,
}: {
  kicker: string;
  title: string;
  hand: string;
  light?: boolean;
}) {
  return (
    <div>
      <p className={`kicker ${light ? "text-blush" : "text-rose"}`}>{kicker}</p>
      <h2
        className={`mt-2 font-poster text-[clamp(3.2rem,12vw,8.5rem)] lowercase leading-[0.9] tracking-[-0.02em] ${
          light ? "text-paper" : "text-rose"
        }`}
      >
        {title}
        <span
          className={`ml-[10%] mt-2 block -rotate-2 font-script text-[0.42em] normal-case leading-none tracking-normal ${
            light ? "text-blush" : "text-ink"
          }`}
        >
          {hand}
        </span>
      </h2>
    </div>
  );
}
