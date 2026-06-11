/**
 * Hand-drawn kawaii cats, sprinkled around the site for quirk.
 * Stroke inherits `currentColor`; blush is always pink.
 */
type Variant = "peek" | "sit" | "sleep" | "paw";

function Peek({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden className={className}>
      {/* paws gripping the edge */}
      <path d="M22 52v-8c0-3 2.5-5 5.5-5s5.5 2 5.5 5v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M87 52v-8c0-3 2.5-5 5.5-5s5.5 2 5.5 5v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* head over the edge */}
      <path d="M30 52c0-18 8-30 30-30s30 12 30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* ears */}
      <path d="M38 30 34 14l14 8M82 30l4-16-14 8" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="48" cy="42" r="2.6" fill="currentColor" />
      <circle cx="72" cy="42" r="2.6" fill="currentColor" />
      {/* mouth :3 */}
      <path d="M56 48c1.5 2 3 2 4 0 1 2 2.5 2 4 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* blush */}
      <circle cx="40" cy="47" r="3.4" fill="#ff3d8f" opacity="0.45" />
      <circle cx="80" cy="47" r="3.4" fill="#ff3d8f" opacity="0.45" />
      {/* whiskers */}
      <path d="M28 42h8M28 47h7M84 42h8M85 47h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Sit({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 110" fill="none" aria-hidden className={className}>
      {/* body */}
      <path d="M30 100c-6-8-8-24 2-34M70 100c8-10 8-26-2-34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 100h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* head */}
      <path d="M28 46c-3-22 9-32 22-32s25 10 22 32c-2 14-12 22-22 22s-20-8-22-22Z" stroke="currentColor" strokeWidth="3" />
      {/* ears */}
      <path d="M32 22 28 6l15 7M68 22l4-16-15 7" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {/* face */}
      <circle cx="40" cy="44" r="2.6" fill="currentColor" />
      <circle cx="60" cy="44" r="2.6" fill="currentColor" />
      <path d="M46 51c1.5 2 3 2 4 0 1 2 2.5 2 4 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="33" cy="50" r="3.2" fill="#ff3d8f" opacity="0.45" />
      <circle cx="67" cy="50" r="3.2" fill="#ff3d8f" opacity="0.45" />
      {/* tail */}
      <path d="M70 96c12-2 16-10 12-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* front paws */}
      <path d="M44 100v-7M56 100v-7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Sleep({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 70" fill="none" aria-hidden className={className}>
      {/* curled body */}
      <path d="M20 56c-4-16 6-30 26-30 22 0 36 10 36 22 0 5-4 8-10 8H20Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      {/* ear */}
      <path d="M28 28l-3-12 11 6" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {/* closed eye + mouth */}
      <path d="M36 42c2 2 5 2 7 0M48 49c1 1.5 2.5 1.5 3.5 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="32" cy="48" r="3" fill="#ff3d8f" opacity="0.45" />
      {/* tail wrap */}
      <path d="M82 56c10 0 14-6 10-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* z z z */}
      <path d="M96 24h8l-8 9h8M108 10h7l-7 8h7" stroke="#ff3d8f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Paw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" aria-hidden className={className}>
      <ellipse cx="20" cy="26" rx="8" ry="6.5" />
      <ellipse cx="9" cy="17" rx="3.4" ry="4.4" transform="rotate(-18 9 17)" />
      <ellipse cx="16.5" cy="11" rx="3.4" ry="4.6" />
      <ellipse cx="24.5" cy="11" rx="3.4" ry="4.6" />
      <ellipse cx="31" cy="17" rx="3.4" ry="4.4" transform="rotate(18 31 17)" />
    </svg>
  );
}

const variants = { peek: Peek, sit: Sit, sleep: Sleep, paw: Paw };

export default function KawaiiCat({
  variant = "sit",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const Cat = variants[variant];
  return <Cat className={className} />;
}
