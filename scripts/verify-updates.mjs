import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();

// desktop hero
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: "scripts/v-hero.png" });

// experience (Tradoi + Bhavani full-time + currently working badge)
await page.evaluate(() => document.getElementById("experience")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/v-exp.png" });

// showcase + brand collabs strip
await page.evaluate(() => {
  [...document.querySelectorAll("p")].find((p) => p.textContent === "Trusted by brands")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: "scripts/v-brands.png" });

// chart with bigger numbers
await page.evaluate(() => document.querySelector("svg[role='img']")?.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: "scripts/v-chart.png" });

// data assertions
const data = await page.evaluate(() => {
  const txt = document.body.innerText;
  return {
    hasTradoi: txt.includes("Tradoi"),
    hasFullTime: txt.includes("Full-time") || txt.includes("Currently working"),
    hasObuddy: txt.includes("oBuddy"),
    has41k: txt.includes("41") || txt.includes("41.3K") || txt.includes("41.3"),
  };
});
console.log("assertions:", JSON.stringify(data));

// mobile hero
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2000));
await page.screenshot({ path: "scripts/v-mobile-hero.png" });
const m = await page.evaluate(() => ({ vw: innerWidth, docW: document.documentElement.scrollWidth }));
console.log("mobile:", JSON.stringify(m));

await browser.close();
console.log("done");
