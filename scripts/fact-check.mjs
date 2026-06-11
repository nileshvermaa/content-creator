import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const factSel = "div.border-dashed div.min-h-14 p";
const f1 = await page.$eval(factSel, (el) => el.textContent).catch((e) => "ERR " + e.message);
console.log("fact 1:", JSON.stringify(f1));

await page.$eval('div.border-dashed button[aria-label="Boop the cat"]', (b) => b.click());
await new Promise((r) => setTimeout(r, 2500));
const f2 = await page.$eval(factSel, (el) => el.textContent).catch((e) => "ERR " + e.message);
console.log("fact 2:", JSON.stringify(f2), "| changed:", f1 !== f2);

// screenshot of the card mid-boop
await page.evaluate(() => document.querySelector("div.border-dashed")?.scrollIntoView({ block: "center" }));
await page.$eval('div.border-dashed button[aria-label="Boop the cat"]', (b) => b.click());
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: "scripts/i-fact.png" });

await browser.close();
console.log("done");
