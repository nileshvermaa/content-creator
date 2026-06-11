// Dev-only visual verification: screenshots the running dev server.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1440,900"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));

// hero
await page.screenshot({ path: "scripts/shot-hero.png" });

// canvas health check
const info = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  return { canvas: !!c, w: c?.width, h: c?.height, r3f: !!(c && c.__r3f !== undefined) };
});
console.log("canvas:", JSON.stringify(info));

// mid-page sections
await page.evaluate(() => document.querySelector("#about")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/shot-about.png" });

await page.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/shot-work.png" });

await page.evaluate(() => document.querySelector("#contact")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/shot-contact.png" });

const errors = await page.evaluate(() => window.__errors || []);
console.log("page errors:", JSON.stringify(errors));

await browser.close();
console.log("done");
