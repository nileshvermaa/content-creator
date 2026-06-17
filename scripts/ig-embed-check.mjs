import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();

// DESKTOP
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
await page.evaluate(() => {
  [...document.querySelectorAll("h3")].find((h) => h.textContent.includes("On the feed"))?.scrollIntoView();
});
// wait for embed.js to process (blockquotes become iframes)
await new Promise((r) => setTimeout(r, 8000));

const status = await page.evaluate(() => {
  const rendered = document.querySelectorAll("iframe.instagram-media-rendered, iframe[id^='instagram-embed']");
  const blockquotes = document.querySelectorAll("blockquote.instagram-media");
  const cards = [...document.querySelectorAll('#watch iframe[src*="instagram"]')].map((f) => {
    const r = f.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  });
  return { renderedCount: rendered.length, rawBlockquotes: blockquotes.length, sizes: cards };
});
console.log("embed status:", JSON.stringify(status));
await page.screenshot({ path: "scripts/ig-embed-desktop.png" });

// MOBILE
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2000));
await page.evaluate(() => {
  [...document.querySelectorAll("h3")].find((h) => h.textContent.includes("On the feed"))?.scrollIntoView();
});
await new Promise((r) => setTimeout(r, 8000));
const m = await page.evaluate(() => ({ vw: innerWidth, docW: document.documentElement.scrollWidth }));
console.log("mobile:", JSON.stringify(m));
await page.screenshot({ path: "scripts/ig-embed-mobile.png" });

await browser.close();
console.log("done");
