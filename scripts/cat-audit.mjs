// For each kawaii cat, report whether another element is painted on top of it.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// scroll through whole page so lazy reveals fire
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 800));

const report = await page.evaluate(() => {
  const cats = [...document.querySelectorAll("svg")].filter((s) =>
    s.getAttribute("viewBox") && /(\b60\b|110|70|40)/.test(s.getAttribute("viewBox")),
  );
  return cats.map((svg) => {
    const r = svg.getBoundingClientRect();
    // find nearest section id
    let sec = svg.closest("section,footer");
    const id = sec?.id || sec?.tagName || "?";
    // scroll the cat into the middle of the viewport, then hit-test its center
    svg.scrollIntoView({ block: "center" });
    const r2 = svg.getBoundingClientRect();
    const cx = r2.left + r2.width / 2;
    const cy = r2.top + r2.height / 2;
    const top = document.elementFromPoint(cx, cy);
    const onTop = top
      ? `${top.tagName}.${String(top.className).slice(0, 40)}`
      : "none";
    const isCatOrChild = top && (top === svg || svg.contains(top) || top.closest("svg") === svg);
    return {
      section: id,
      size: `${Math.round(r.width)}x${Math.round(r.height)}`,
      occludedBy: isCatOrChild ? "—(visible)" : onTop,
    };
  });
});
console.log(JSON.stringify(report, null, 2));
await browser.close();
