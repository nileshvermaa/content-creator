import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const info = await page.evaluate(() => {
  const btn = document.querySelector('#home [aria-label="Boop the cat"]');
  const header = document.querySelector("header nav");
  const photo = document.querySelector("#home img");
  const b = btn.getBoundingClientRect();
  const h = header.getBoundingClientRect();
  const p = photo.getBoundingClientRect();
  // what is painted at the cat's top-center (its ears)?
  const topHit = document.elementFromPoint(b.left + b.width / 2, b.top + 4);
  return {
    catRect: { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left) },
    navRect: { top: Math.round(h.top), bottom: Math.round(h.bottom), left: Math.round(h.left), right: Math.round(h.right) },
    photoTop: Math.round(p.top),
    overlapsNavVertically: b.top < h.bottom,
    overlapsNavHorizontally: b.left < h.right && b.right > h.left,
    earHitElement: topHit ? `${topHit.tagName}.${String(topHit.className).slice(0, 50)}` : "none",
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
