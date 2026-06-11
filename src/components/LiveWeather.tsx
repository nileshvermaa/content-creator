"use client";

import { useEffect, useState } from "react";

/** WMO weather codes → emoji. */
function icon(code: number) {
  if (code <= 1) return "☀️";
  if (code === 2) return "⛅";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌦️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌧️";
  return "⛈️";
}

/**
 * Live weather in Lucknow via the free open-meteo API.
 * Renders nothing until data arrives, so layout never jumps wrong.
 */
export default function LiveWeather() {
  const [now, setNow] = useState<{ temp: number; code: number } | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=26.85&longitude=80.95&current=temperature_2m,weather_code",
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { current?: { temperature_2m: number; weather_code: number } }) => {
        if (d.current) setNow({ temp: Math.round(d.current.temperature_2m), code: d.current.weather_code });
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (!now) return null;
  return (
    <span className="whitespace-nowrap text-muted" title="Live weather in Lucknow">
      {" "}
      · {now.temp}° {icon(now.code)}
    </span>
  );
}
