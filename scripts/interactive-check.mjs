// Verify interactive cats + live API features.
import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--use-gl=angle", "--enable-unsafe-swiftshader", "--window-size=1440,900"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

// 1. hero shot (bigger photo + peek cat with eye whites)
await page.mouse.move(300, 700); // pupils should look down-left
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: "scripts/i-hero.png" });

// 2. boop the hero cat -> hearts appear
await page.click('button[aria-label="Boop the cat"]');
await new Promise((r) => setTimeout(r, 450));
await page.screenshot({ path: "scripts/i-boop.png" });

// 3. weather chip in about card
await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 2500));
const weather = await page.evaluate(
  () => document.querySelector('[title="Live weather in Lucknow"]')?.textContent ?? null,
);
console.log("weather chip:", JSON.stringify(weather));

// 4. cat fact card
await page.evaluate(() => {
  [...document.querySelectorAll("#watch p")]
    .find((p) => p.textContent.includes("catfact.ninja"))
    ?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 2500));
const fact1 = await page.evaluate(
  () =>
    [...document.querySelectorAll("#watch p")].find((p) =>
      p.className.includes("font-bold"),
    )?.textContent,
);
console.log("fact 1:", JSON.stringify(fact1));
await page.screenshot({ path: "scripts/i-fact.png" });

// boop for a new fact
await page.evaluate(() => {
  const card = [...document.querySelectorAll("#watch div")].find((d) =>
    d.textContent.includes("catfact.ninja"),
  );
  card?.querySelector('button[aria-label="Boop the cat"]')?.click();
});
await new Promise((r) => setTimeout(r, 2500));
const fact2 = await page.evaluate(
  () =>
    [...document.querySelectorAll("#watch p")].find((p) =>
      p.className.includes("font-bold"),
    )?.textContent,
);
console.log("fact 2:", JSON.stringify(fact2), "| changed:", fact1 !== fact2);

// 5. footer local time
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise((r) => setTimeout(r, 1500));
const time = await page.evaluate(
  () =>
    [...document.querySelectorAll("footer p")].find((p) =>
      p.textContent.includes("IST"),
    )?.textContent ?? null,
);
console.log("local time:", JSON.stringify(time));

await browser.close();
console.log("done");
