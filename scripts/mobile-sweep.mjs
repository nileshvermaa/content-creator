// Mobile sweep at iPhone-ish viewport: every section + overflow audit.
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

const ids = ["home", "about", "experience", "work", "skills", "contact"];
for (const id of ids) {
  await page.evaluate((sel) => document.getElementById(sel)?.scrollIntoView(), id);
  await new Promise((r) => setTimeout(r, 1600));
  await page.screenshot({ path: `scripts/m-${id}.png` });
}

// bottom of page (footer social cards)
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: "scripts/m-footer.png" });

// audit: layout viewport width + any element wider than the viewport
const audit = await page.evaluate(() => {
  const wide = [];
  document.querySelectorAll("body *").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > innerWidth + 1 && getComputedStyle(el).position !== "fixed") {
      wide.push(`${el.tagName}.${String(el.className).slice(0, 50)} w=${Math.round(r.width)}`);
    }
  });
  // tap-target check on social pills & nav buttons
  const small = [];
  document.querySelectorAll("a, button").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && (r.height < 32 || r.width < 32)) {
      small.push(`${el.tagName} "${el.textContent.trim().slice(0, 18)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  });
  return { vw: innerWidth, docW: document.documentElement.scrollWidth, wide: wide.slice(0, 10), small: small.slice(0, 12) };
});
console.log(JSON.stringify(audit, null, 2));
await browser.close();
console.log("done");
