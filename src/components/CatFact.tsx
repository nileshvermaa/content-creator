"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Boopable from "./Boopable";
import KawaiiCat from "./KawaiiCat";

/** Offline stand-ins so the card never sits empty. */
const FALLBACK_FACTS = [
  "A cat's purr vibrates at a frequency that can promote bone healing.",
  "Cats spend about 70% of their lives sleeping — true content connoisseurs.",
  "A group of kittens is called a kindle. A group of cats? A clowder.",
  "Cats can make over 100 different sounds. Dogs manage about 10.",
];

let fallbackIdx = 0;

/** Fetch one fact from the free catfact.ninja API, falling back offline. */
async function getFact(): Promise<string> {
  try {
    const res = await fetch("https://catfact.ninja/fact?max_length=120", {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const data: { fact?: string } = await res.json();
    if (!data.fact) throw new Error("empty");
    return data.fact;
  } catch {
    fallbackIdx += 1;
    return FALLBACK_FACTS[fallbackIdx % FALLBACK_FACTS.length];
  }
}

/** Live cat fact card — booping the cat fetches another one. */
export default function CatFact() {
  const [fact, setFact] = useState<string | null>(null);
  const [spin, setSpin] = useState(0);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    getFact().then((f) => {
      if (!alive.current) return;
      setFact(f);
      setSpin((s) => s + 1);
    });
    return () => {
      alive.current = false;
    };
  }, []);

  const onBoop = () => {
    getFact().then((f) => {
      if (!alive.current) return;
      setFact(f);
      setSpin((s) => s + 1);
    });
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-6 rounded-3xl border-[3px] border-dashed border-ink/30 bg-paper p-8 text-center md:flex-row md:gap-10 md:p-10 md:text-left">
      <Boopable onBoop={onBoop} className="shrink-0">
        <KawaiiCat variant="sit" className="w-24 text-ink md:w-28" />
      </Boopable>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose">
          Intermission · live from catfact.ninja
        </p>
        <div className="mt-3 min-h-14">
          <AnimatePresence mode="wait">
            <motion.p
              key={spin}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="font-(family-name:--font-display) text-lg font-bold leading-snug md:text-xl"
            >
              {fact ?? "Summoning a cat fact…"}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-2 text-sm text-muted">
          Boop the cat for another one 🐾
        </p>
      </div>
    </div>
  );
}
