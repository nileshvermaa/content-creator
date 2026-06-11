import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// hero: cat should sit on the photo's top edge; boop it for hearts
await page.mouse.move(200, 800);
await new Promise((r) => setTimeout(r, 500));
const cat = await page.evaluate(() => {
  const btn = document.querySelector('#home button[aria-label="Boop the cat"]');
  const img = document.querySelector('#home img');
  if (!btn || !img) return null;
  const b = btn.getBoundingClientRect();
  const p = img.getBoundingClientRect();
  return { catTop: Math.round(b.top), photoTop: Math.round(p.top), onPhoto: Math.abs(b.bottom - p.top) < 40, photoW: Math.round(p.width) };
});
console.log("hero cat:", JSON.stringify(cat));
await page.click('#home button[aria-label="Boop the cat"]');
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: "scripts/f-hero.png" });

// cat fact card visual
await page.evaluate(() => document.querySelector("div.border-dashed")?.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: "scripts/f-fact.png" });

// about card with weather
await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: "scripts/f-about.png" });

// mobile hero
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: "scripts/f-mobile.png" });
const docW = await page.evaluate(() => ({ vw: innerWidth, docW: document.documentElement.scrollWidth }));
console.log("mobile:", JSON.stringify(docW));

await browser.close();
console.log("done");
