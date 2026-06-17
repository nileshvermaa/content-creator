import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// hero credit links order + wishlink presence
const hero = await page.evaluate(() => {
  const links = [...document.querySelectorAll("#home a[target='_blank']")].map((a) =>
    a.getAttribute("aria-label") || a.textContent.trim(),
  );
  return links;
});
console.log("hero social links:", JSON.stringify(hero));

// footer link order
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 1500));
const footer = await page.evaluate(() => {
  const items = [...document.querySelectorAll("footer ul li a")].map((a) =>
    a.textContent.replace(/\s+/g, " ").trim(),
  );
  const wishHref = [...document.querySelectorAll("footer a")].find((a) =>
    a.href.includes("wishlink"),
  )?.href;
  return { items, wishHref };
});
console.log("footer links:", JSON.stringify(footer, null, 2));
await page.screenshot({ path: "scripts/wishlink-footer.png" });
await browser.close();
