import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));

// data assertions
const data = await page.evaluate(() => {
  const txt = document.body.innerText;
  return {
    brands: ["Fiama", "Himalayan Organics", "Bentica", "Rosaa", "oBuddy", "Dot & Key"].filter((b) => txt.includes(b)),
    products: ["Hokkaido", "Niacinamide", "Biotin", "Matcha Mellow", "Rose Water"].filter((p) => txt.includes(p)),
    has80k: txt.includes("80K+"),
  };
});
console.log("data:", JSON.stringify(data));

// brand strip screenshot
await page.evaluate(() => {
  [...document.querySelectorAll("p")].find((p) => p.textContent === "Trusted by brands")?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 1000));
await page.screenshot({ path: "scripts/brands-desktop.png" });

// chart peak label
await page.evaluate(() => document.querySelector("svg[role='img']")?.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 2200));
await page.screenshot({ path: "scripts/brands-chart.png" });

// mobile
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.reload({ waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 1500));
await page.evaluate(() => {
  [...document.querySelectorAll("p")].find((p) => p.textContent === "Trusted by brands")?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: "scripts/brands-mobile.png" });
const m = await page.evaluate(() => ({ vw: innerWidth, docW: document.documentElement.scrollWidth }));
console.log("mobile:", JSON.stringify(m));

await browser.close();
console.log("done");
