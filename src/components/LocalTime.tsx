"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

/** Ticking local clock for Lucknow (IST) — set client-side to avoid hydration drift. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span className="inline-flex items-center gap-2">
      <span className="size-1.5 animate-pulse rounded-full bg-rose" />
      {time} IST in Lucknow
    </span>
  );
}
