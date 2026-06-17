import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 400));
const overlap = await page.evaluate(() => {
  const btn = document.querySelector('#home [aria-label="Boop the cat"]');
  const nav = document.querySelector("header nav");
  const b = btn.getBoundingClientRect(), n = nav.getBoundingClientRect();
  return { catTop: Math.round(b.top), navBottom: Math.round(n.bottom), clear: b.top > n.bottom };
});
console.log("mobile hero cat:", JSON.stringify(overlap));
await page.screenshot({ path: "scripts/m-hero-only.png" });
await browser.close();
