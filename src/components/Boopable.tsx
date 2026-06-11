"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Heart = { id: number; dx: number; rot: number };

/**
 * Wraps a decorative cat: clicking it ("booping") makes it wiggle
 * and burst a few tiny hearts. Purely playful.
 */
export default function Boopable({
  children,
  className,
  onBoop,
}: {
  children: React.ReactNode;
  className?: string;
  onBoop?: () => void;
}) {
  const [wiggle, setWiggle] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const boop = () => {
    setWiggle((w) => w + 1);
    const batch = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      dx: (Math.random() - 0.5) * 70,
      rot: (Math.random() - 0.5) * 50,
    }));
    setHearts((h) => [...h, ...batch]);
    setTimeout(() => {
      setHearts((h) => h.filter((x) => !batch.some((b) => b.id === x.id)));
    }, 1100);
    onBoop?.();
  };

  return (
    <button
      type="button"
      onClick={boop}
      aria-label="Boop the cat"
      className={`relative block cursor-pointer select-none border-0 bg-transparent p-0 ${className ?? ""}`}
    >
      <motion.span
        key={wiggle}
        animate={
          wiggle
            ? { rotate: [0, -10, 9, -6, 3, 0], scale: [1, 1.08, 1] }
            : undefined
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="block"
      >
        {children}
      </motion.span>

      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            initial={{ opacity: 0, y: 0, x: h.dx / 3, scale: 0.4, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -64, x: h.dx, scale: 1, rotate: h.rot }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/4 text-base text-rose"
            aria-hidden
          >
            ♥
          </motion.span>
        ))}
      </AnimatePresence>
    </button>
  );
}
