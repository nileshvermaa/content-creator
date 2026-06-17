import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
await page.evaluate(() => {
  [...document.querySelectorAll("h3")].find((h) => h.textContent.includes("On the feed"))?.scrollIntoView({ block: "start" });
});
await new Promise((r) => setTimeout(r, 6000));

const box = await page.evaluate(() => {
  const f = document.querySelector('iframe[src*="instagram"]');
  const r = f.getBoundingClientRect();
  return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
});
console.log("first iframe box:", JSON.stringify(box));
if (box.y >= 0 && box.y + box.h <= 1200) {
  await page.screenshot({
    path: "scripts/ig-one.png",
    clip: { x: box.x - 4, y: box.y - 4, width: box.w + 8, height: box.h + 8 },
  });
  console.log("captured");
} else {
  console.log("iframe off-screen, y=", box.y);
}
await browser.close();
