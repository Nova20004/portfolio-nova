import { chromium } from "playwright";

const base = process.env.BASE_URL ?? "http://127.0.0.1:3011";
const widths = [320, 360, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920];

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
const failures = [];

for (const width of widths) {
  await page.setViewportSize({ width, height: width < 768 ? 780 : 900 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const report = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;
    const nodes = [
      ...document.querySelectorAll("#home .hero-copy, #home .hero-copy p, #home h1, header a, h2, #contact label, #contact button"),
    ].filter((node) => !node.closest(".diag") && !node.closest("[aria-hidden='true']"));
    const clipped = [];
    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      const text = (node.textContent || "").replace(/\s+/g, " ").trim().slice(0, 48);
      if (rect.left < -1 || rect.right > window.innerWidth + 1) {
        clipped.push({ text, left: Math.round(rect.left), right: Math.round(rect.right), width: window.innerWidth });
      }
    }
    const h1 = document.querySelector("#home h1");
    const h1Rect = h1?.getBoundingClientRect();
    const blend = h1 ? getComputedStyle(h1.closest(".blend-copy") || h1).mixBlendMode : "normal";
    const portrait = document.querySelector('#home img[src*="joseph-portrait"]');
    const portraitRect = portrait?.getBoundingClientRect();
    const portraitMid = portraitRect ? portraitRect.left + portraitRect.width / 2 : null;
    const copy = document.querySelector(".hero-copy")?.getBoundingClientRect();
    const desktopLeft = !h1Rect || !copy || window.innerWidth < 1024 || Math.abs(h1Rect.left - copy.left) < 6;
    const expectBlend = window.innerWidth < 1024 ? "difference" : "normal";
    const centered = portraitMid == null ? null : Math.abs(portraitMid - window.innerWidth / 2);
    return {
      overflow,
      clipped,
      blend,
      expectBlend,
      desktopLeft,
      centered: centered == null ? null : Math.round(centered),
      h1Left: h1Rect ? Math.round(h1Rect.left) : null,
    };
  });

  const blendOk = report.blend === report.expectBlend;
  const centerOk = report.centered == null || width >= 1024 || report.centered < 28;
  if (report.overflow > 1 || report.clipped.length || !blendOk || !centerOk || !report.desktopLeft) {
    failures.push({ width, ...report });
  } else {
    console.log(`ok ${width}px  h1@${report.h1Left} blend=${report.blend} portraitΔ=${report.centered}`);
  }
}

await browser.close();

if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
