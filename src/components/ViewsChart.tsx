"use client";

import { motion } from "framer-motion";
import KawaiiCat from "./KawaiiCat";
import { viewsTrend } from "@/lib/data";

const W = 640;
const H = 280;
const PAD_X = 56;
const PAD_TOP = 64;
const PAD_BOTTOM = 48;

function format(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);
}

export default function ViewsChart() {
  const max = Math.max(...viewsTrend.map((d) => d.views));
  const pts = viewsTrend.map((d, i) => ({
    ...d,
    x: PAD_X + (i * (W - PAD_X * 2)) / (viewsTrend.length - 1),
    y: H - PAD_BOTTOM - (d.views / max) * (H - PAD_TOP - PAD_BOTTOM),
  }));

  // smooth line through the points
  const line = pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(" ");

  const area = `${line} L ${pts[pts.length - 1].x} ${H - PAD_BOTTOM} L ${pts[0].x} ${H - PAD_BOTTOM} Z`;
  const last = pts[pts.length - 1];

  return (
    <div className="relative mt-8 rounded-3xl border-[3px] border-ink bg-paper p-6 md:p-10">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h4 className="font-(family-name:--font-display) text-xl font-bold md:text-2xl">
          The graph only goes <span className="text-rose">up</span> 📈
        </h4>
        <p className="text-xs text-muted">
          Total monthly reach across Reels &amp; Shorts · growing every month
        </p>
      </div>

      <div className="relative mt-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Views growing over time">
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff3d8f" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ff3d8f" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* baseline */}
          <line
            x1={PAD_X}
            y1={H - PAD_BOTTOM}
            x2={W - PAD_X}
            y2={H - PAD_BOTTOM}
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
          />

          {/* area wash */}
          <motion.path
            d={area}
            fill="url(#area-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.9 }}
          />

          {/* the climbing line */}
          <motion.path
            d={line}
            fill="none"
            stroke="#ff3d8f"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {/* points + labels */}
          {pts.map((p, i) => (
            <motion.g
              key={p.label}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.5 + i * 0.35, type: "spring", stiffness: 260, damping: 16 }}
            >
              <circle cx={p.x} cy={p.y} r="7" fill="#fdf9f5" stroke="#16120f" strokeWidth="3" />
              <text
                x={p.x}
                y={p.y - 18}
                textAnchor="middle"
                className="fill-current font-(family-name:--font-display)"
                fontSize="17"
                fontWeight="700"
              >
                {format(p.views)}
              </text>
              <text
                x={p.x}
                y={H - PAD_BOTTOM + 26}
                textAnchor="middle"
                fontSize="13"
                className="fill-current"
                opacity="0.5"
              >
                {p.label}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* a cat proudly sits on the latest data point */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="pointer-events-none absolute w-[8%] min-w-10 -translate-x-1/2 -translate-y-full text-ink"
          style={{ left: `${(last.x / W) * 100}%`, top: `${(last.y / H) * 100 - 9}%` }}
        >
          <KawaiiCat variant="sit" className="w-full" />
        </motion.div>
      </div>
    </div>
  );
}
