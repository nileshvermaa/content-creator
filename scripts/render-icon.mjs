import puppeteer from "puppeteer-core";
import { readFileSync } from "fs";

const svg = readFileSync("F:/content-creator/src/app/icon.svg", "utf8");
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 360, height: 140 });
await page.setContent(`<body style="margin:0;background:#eee;display:flex;gap:24px;align-items:center;padding:20px;font-family:sans-serif">
  <div style="text-align:center"><div style="width:128px;height:128px">${svg}</div><small>128</small></div>
  <div style="text-align:center"><div style="width:32px;height:32px">${svg}</div><small>32</small></div>
  <div style="text-align:center"><div style="width:16px;height:16px">${svg}</div><small>16</small></div>
</body>`);
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: "scripts/icon-preview.png" });
await browser.close();
console.log("done");
