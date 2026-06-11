// Verify the Watch section: thumbnails load, click-to-play swaps in the iframe.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1440,900"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

await page.evaluate(() => document.getElementById("watch")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: "scripts/watch-desktop.png" });

// thumbnails loaded?
const thumbs = await page.evaluate(() =>
  [...document.querySelectorAll('#watch img')].map((i) => ({ alt: i.alt.slice(0, 25), ok: i.complete && i.naturalWidth > 0 })),
);
console.log("thumbs:", JSON.stringify(thumbs));

// click first short -> iframe should appear
await page.click('#watch button[aria-label^="Play"]');
await new Promise((r) => setTimeout(r, 2500));
const iframe = await page.evaluate(() => {
  const f = document.querySelector("#watch iframe");
  return f ? f.src : null;
});
console.log("iframe after click:", iframe);
await page.screenshot({ path: "scripts/watch-playing.png" });

// mobile
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2200));
await page.evaluate(() => document.getElementById("watch")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/watch-mobile.png" });
const docW = await page.evaluate(() => ({ vw: innerWidth, docW: document.documentElement.scrollWidth }));
console.log("mobile widths:", JSON.stringify(docW));

await browser.close();
console.log("done");
