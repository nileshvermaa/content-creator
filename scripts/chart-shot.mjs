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

// instagram rail (top of watch)
await page.evaluate(() => document.getElementById("watch")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 4000));
await page.screenshot({ path: "scripts/watch-ig.png" });

// chart (bottom of watch)
await page.evaluate(() => {
  const charts = document.querySelectorAll("#watch svg[role='img']");
  charts[0]?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 2600));
await page.screenshot({ path: "scripts/watch-chart.png" });

// contact finale
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: "scripts/contact-final.png" });

await browser.close();
console.log("done");
