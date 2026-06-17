import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
await page.evaluate(() => {
  const a = document.getElementById("about");
  window.scrollTo(0, a.offsetTop - 120);
});
await new Promise((r) => setTimeout(r, 700));

const info = await page.evaluate(() => {
  const about = document.getElementById("about");
  const cat = about.querySelector('[aria-label="Boop the cat"]').getBoundingClientRect();
  const heading = about.querySelector("h2").getBoundingClientRect();
  const label = about.querySelector("p").getBoundingClientRect();
  return {
    cat: { top: Math.round(cat.top), bottom: Math.round(cat.bottom), left: Math.round(cat.left), right: Math.round(cat.right) },
    heading: { top: Math.round(heading.top), left: Math.round(heading.left), right: Math.round(heading.right) },
    label: { top: Math.round(label.top), right: Math.round(label.right) },
    overlapsHeading: cat.bottom > heading.top && cat.right > heading.left,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: "scripts/about-mobile.png" });
await browser.close();
