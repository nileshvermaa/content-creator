// Verify Instagram reel embeds actually render content.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1440,1000"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));

await page.evaluate(() => {
  document.querySelectorAll("#watch h3")[1]?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 5000)); // give IG iframes time

const frames = await page.evaluate(() =>
  [...document.querySelectorAll('#watch iframe[src*="instagram"]')].map((f) => f.src),
);
console.log("ig iframes:", JSON.stringify(frames, null, 1));

await page.screenshot({ path: "scripts/reels-desktop.png" });
await browser.close();
console.log("done");
