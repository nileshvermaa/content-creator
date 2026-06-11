import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1440,900"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));
await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 2200));

const img = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img[alt="Pragati Srivastava"]')];
  return imgs.map((i) => ({ src: i.currentSrc.slice(0, 60), ok: i.complete && i.naturalWidth > 0 }));
});
console.log(JSON.stringify(img, null, 1));

await page.screenshot({ path: "scripts/about-new.png" });
await browser.close();
console.log("done");
