"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * The hero's peeking cat — its pupils follow the visitor's cursor.
 * Same drawing as KawaiiCat's "peek", with live eyes.
 */
export default function PeekFollowCat({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const px = useSpring(dx, { stiffness: 220, damping: 18 });
  const py = useSpring(dy, { stiffness: 220, damping: 18 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height * 0.7;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      // pupils wander up to ~2.4 viewBox units from center
      dx.set(Math.cos(angle) * 2.4);
      dy.set(Math.sin(angle) * 1.8);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [dx, dy]);

  return (
    <svg ref={ref} viewBox="0 0 120 60" fill="none" aria-hidden className={className}>
      {/* paws gripping the edge */}
      <path d="M22 52v-8c0-3 2.5-5 5.5-5s5.5 2 5.5 5v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M87 52v-8c0-3 2.5-5 5.5-5s5.5 2 5.5 5v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* head over the edge */}
      <path d="M30 52c0-18 8-30 30-30s30 12 30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* ears */}
      <path d="M38 30 34 14l14 8M82 30l4-16-14 8" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {/* eye whites */}
      <circle cx="48" cy="42" r="5" fill="#fdf9f5" stroke="currentColor" strokeWidth="2" />
      <circle cx="72" cy="42" r="5" fill="#fdf9f5" stroke="currentColor" strokeWidth="2" />
      {/* pupils that follow the cursor */}
      <motion.circle cx="48" cy="42" r="2.4" fill="currentColor" style={{ x: px, y: py }} />
      <motion.circle cx="72" cy="42" r="2.4" fill="currentColor" style={{ x: px, y: py }} />
      {/* mouth :3 */}
      <path d="M56 50c1.5 2 3 2 4 0 1 2 2.5 2 4 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      {/* blush */}
      <circle cx="39" cy="48" r="3.4" fill="#ff3d8f" opacity="0.45" />
      <circle cx="81" cy="48" r="3.4" fill="#ff3d8f" opacity="0.45" />
      {/* whiskers */}
      <path d="M28 42h8M28 47h7M84 42h8M85 47h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
