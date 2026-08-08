"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { viewsTrend } from "@/lib/data";

const W = 640;
const H = 300;
const PAD_LEFT = 60;
const PAD_RIGHT = 28;
const PAD_TOP = 38;
const PAD_BOTTOM = 48;
const CHART_BOTTOM = H - PAD_BOTTOM;
const MAX_VIEWS = 160000;
const Y_TICKS = [0, 50000, 100000, 150000];

function format(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(0) + "K" : String(n);
}

const points = viewsTrend.map((item, index) => ({
  ...item,
  x: PAD_LEFT + (index * (W - PAD_LEFT - PAD_RIGHT)) / (viewsTrend.length - 1),
  y: CHART_BOTTOM - (item.views / MAX_VIEWS) * (CHART_BOTTOM - PAD_TOP),
}));

const line = points
  .map((point, index) => {
    if (index === 0) return "M " + point.x + " " + point.y;
    const previous = points[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return (
      "C " +
      controlX +
      " " +
      previous.y +
      ", " +
      controlX +
      " " +
      point.y +
      ", " +
      point.x +
      " " +
      point.y
    );
  })
  .join(" ");

const area =
  line +
  " L " +
  points[points.length - 1].x +
  " " +
  CHART_BOTTOM +
  " L " +
  points[0].x +
  " " +
  CHART_BOTTOM +
  " Z";

export default function ViewsChart() {
  const [activeIndex, setActiveIndex] = useState(points.length - 1);
  const reducedMotion = useReducedMotion();
  const activePoint = points[activeIndex];

  function handlePointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * W;
    const closestIndex = Math.round(
      ((pointerX - PAD_LEFT) / (W - PAD_LEFT - PAD_RIGHT)) * (points.length - 1),
    );
    setActiveIndex(Math.max(0, Math.min(points.length - 1, closestIndex)));
  }

  const tooltipWidth = 112;
  const tooltipX = Math.max(
    PAD_LEFT,
    Math.min(W - PAD_RIGHT - tooltipWidth, activePoint.x - tooltipWidth / 2),
  );
  const tooltipY = activePoint.y < 88 ? activePoint.y + 18 : activePoint.y - 66;
  const bestMonth = Math.max(...viewsTrend.map((item) => item.views));

  return (
    <div className="relative mt-8 rounded-3xl border-[3px] border-ink bg-paper p-6 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h4 className="font-(family-name:--font-display) text-xl font-bold tracking-tight md:text-2xl">
            Real growth has <span className="text-rose">plot twists.</span>
          </h4>
          <p className="mt-2 text-sm text-muted">Monthly view trend &middot; Jan&mdash;Aug 2026</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
            Best month
          </p>
          <p className="font-(family-name:--font-display) mt-1 text-3xl font-extrabold leading-none text-rose">
            {format(bestMonth)}
          </p>
        </div>
      </div>

      <div className="relative mt-7 overflow-hidden rounded-2xl bg-paper-soft/55 px-2 pb-1 pt-3 md:px-4">
        <svg
          viewBox={"0 0 " + W + " " + H}
          className="w-full touch-pan-y"
          role="img"
          aria-label="Interactive monthly views chart showing periods of growth and dips, reaching 152 thousand views in August 2026"
          onPointerMove={handlePointerMove}
        >
          <defs>
            <linearGradient id="views-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff3d8f" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ff3d8f" stopOpacity="0" />
            </linearGradient>
          </defs>

          {Y_TICKS.map((tick) => {
            const y = CHART_BOTTOM - (tick / MAX_VIEWS) * (CHART_BOTTOM - PAD_TOP);
            return (
              <g key={tick} aria-hidden>
                <line
                  x1={PAD_LEFT}
                  y1={y}
                  x2={W - PAD_RIGHT}
                  y2={y}
                  stroke="#16120f"
                  strokeOpacity={tick === 0 ? 0.18 : 0.08}
                  strokeWidth="1"
                  strokeDasharray={tick === 0 ? undefined : "3 7"}
                />
                <text x={PAD_LEFT - 12} y={y + 4} textAnchor="end" fontSize="11" fill="#79706a">
                  {format(tick)}
                </text>
              </g>
            );
          })}

          <motion.path
            d={area}
            fill="url(#views-area-fill)"
            initial={reducedMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={reducedMotion ? { opacity: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.path
            d={line}
            fill="none"
            stroke="#ff3d8f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            animate={reducedMotion ? { pathLength: 1 } : undefined}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.line
            x1={activePoint.x}
            x2={activePoint.x}
            y1={PAD_TOP}
            y2={CHART_BOTTOM}
            stroke="#16120f"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            animate={{ x1: activePoint.x, x2: activePoint.x }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          {points.map((point, index) => {
            const showLabel = index % 2 === 0 || index === points.length - 1;
            const isActive = index === activeIndex;
            return (
              <g key={point.label}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  animate={{ r: isActive ? 7 : 4, fill: isActive ? "#ff3d8f" : "#fdf9f5" }}
                  transition={{ duration: reducedMotion ? 0 : 0.16 }}
                  stroke="#16120f"
                  strokeWidth={isActive ? 3 : 2}
                  aria-hidden
                />
                {showLabel ? (
                  <text
                    x={point.x}
                    y={H - 17}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#79706a"
                    aria-hidden
                  >
                    {point.label.replace(" '26", "")}
                  </text>
                ) : null}
              </g>
            );
          })}

          <motion.g
            animate={{ x: tooltipX, y: tooltipY }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <rect width={tooltipWidth} height="52" rx="10" fill="#16120f" />
            <text x="12" y="20" fontSize="11" fill="#fdf9f5" opacity="0.65">
              {activePoint.label}
            </text>
            <text x="12" y="40" fontSize="17" fontWeight="700" fill="#ff3d8f">
              {format(activePoint.views)} views
            </text>
          </motion.g>
        </svg>
        <div
          className="pointer-events-none absolute bottom-1 left-2 right-2 top-3 md:left-4 md:right-4"
          role="group"
          aria-label="Monthly view points"
        >
          {points.map((point, index) => (
            <button
              key={point.label}
              type="button"
              aria-label={point.label + ": " + format(point.views) + " views"}
              aria-pressed={activeIndex === index}
              onFocus={() => setActiveIndex(index)}
              onPointerEnter={() => setActiveIndex(index)}
              onPointerDown={() => setActiveIndex(index)}
              className="pointer-events-auto absolute size-9 -translate-x-1/2 -translate-y-1/2 cursor-crosshair rounded-full outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-paper-soft"
              style={{ left: (point.x / W) * 100 + "%", top: (point.y / H) * 100 + "%" }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p>Hover, tap, or tab through the points to explore.</p>
        <p className="font-medium text-ink/70">A dip is a beat, not the ending.</p>
      </div>
    </div>
  );
}