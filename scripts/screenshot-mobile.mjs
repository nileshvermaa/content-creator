import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader"],
});

const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));
await page.screenshot({ path: "scripts/shot-mobile-hero.png" });

await page.evaluate(() => document.querySelector("#experience")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/shot-mobile-exp.png" });

await browser.close();
console.log("done");
