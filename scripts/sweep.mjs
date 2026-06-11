// Full-page sweep: screenshot every section + report invisible elements.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1440,900"],
});

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));

const ids = ["home", "about", "experience", "work", "skills", "contact"];
for (const id of ids) {
  await page.evaluate((sel) => document.getElementById(sel)?.scrollIntoView(), id);
  await new Promise((r) => setTimeout(r, 1700));
  await page.screenshot({ path: `scripts/sweep-${id}.png` });
}

// after full scroll, find any elements still stuck invisible (opacity 0)
const stuck = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("section *, footer *").forEach((el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (s.opacity === "0" && r.width > 50 && r.height > 20) {
      out.push(`${el.tagName}.${String(el.className).slice(0, 60)}`);
    }
  });
  return out.slice(0, 20);
});

// check the portrait actually loaded
const img = await page.evaluate(() => {
  const i = document.querySelector('img[alt="Pragati Srivastava"]');
  return i ? { complete: i.complete, w: i.naturalWidth } : null;
});

console.log("stuck-invisible:", JSON.stringify(stuck));
console.log("portrait:", JSON.stringify(img));
console.log("errors:", JSON.stringify(errors));
await browser.close();
console.log("done");
