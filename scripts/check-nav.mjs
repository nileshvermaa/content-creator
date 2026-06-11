import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const info = await page.evaluate(() => {
  const nav = document.querySelector("header nav");
  const kids = [...nav.children].map((k) => {
    const r = k.getBoundingClientRect();
    return { tag: k.tagName, text: k.textContent.slice(0, 20), x: Math.round(r.x), w: Math.round(r.width), visible: getComputedStyle(k).display };
  });
  const h1 = document.querySelector("h1");
  const h1r = h1.getBoundingClientRect();
  const last = h1.querySelectorAll("span")[1].getBoundingClientRect();
  return { navW: Math.round(nav.getBoundingClientRect().width), kids, h1: { w: Math.round(h1r.width) }, lastName: { x: Math.round(last.x), w: Math.round(last.width), right: Math.round(last.right) }, vw: innerWidth };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
