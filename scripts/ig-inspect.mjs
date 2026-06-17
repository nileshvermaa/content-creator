import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// scroll IG rail into view, give embeds time
await page.evaluate(() => {
  [...document.querySelectorAll("h3")].find((h) => h.textContent.includes("On the feed"))?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 6000));

const frames = await page.evaluate(() => {
  return [...document.querySelectorAll('iframe[src*="instagram"]')].map((f) => {
    const r = f.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
});
console.log("ig iframe sizes:", JSON.stringify(frames));

// full rail
await page.screenshot({ path: "scripts/ig-rail.png" });

// zoom into first reel card
const box = await page.evaluate(() => {
  const f = document.querySelector('iframe[src*="instagram"]');
  const r = f.getBoundingClientRect();
  return { x: Math.max(0, r.left - 6), y: Math.max(0, r.top - 30), w: r.width + 12, h: r.height + 60 };
});
await page.screenshot({
  path: "scripts/ig-one.png",
  clip: { x: box.x, y: box.y, width: Math.min(box.w, 1440 - box.x), height: Math.min(box.h, 900 - box.y) },
});

await browser.close();
console.log("done");
