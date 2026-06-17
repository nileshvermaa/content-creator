import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// scroll so the marquee + top of About are in view
await page.evaluate(() => {
  const about = document.getElementById("about");
  window.scrollTo(0, about.offsetTop - 220);
});
await new Promise((r) => setTimeout(r, 800));

const info = await page.evaluate(() => {
  const about = document.getElementById("about");
  // the sleeping cat is the first Boopable inside About
  const catWrap = about.querySelector('[aria-label="Boop the cat"]');
  const c = catWrap?.getBoundingClientRect();
  // marquee black bar
  const bars = [...document.querySelectorAll("div")].filter((d) => {
    const s = getComputedStyle(d);
    return d.className.includes("border-y") && s.backgroundColor === "rgb(22, 18, 15)";
  });
  const bar = bars[0]?.getBoundingClientRect();
  // what's painted at cat center
  const hit = c ? document.elementFromPoint(c.left + c.width / 2, c.top + c.height / 2) : null;
  return {
    cat: c ? { top: Math.round(c.top), bottom: Math.round(c.bottom), left: Math.round(c.left) } : null,
    bar: bar ? { top: Math.round(bar.top), bottom: Math.round(bar.bottom) } : null,
    catOverlapsBar: c && bar ? c.top < bar.bottom : null,
    hitAtCenter: hit ? `${hit.tagName}.${String(hit.className).slice(0, 40)}` : "none",
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: "scripts/marquee-cat.png" });
await browser.close();
