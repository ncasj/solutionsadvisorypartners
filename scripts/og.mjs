// Renders scripts/og-template.html to assets/og-default.png (1200x630).
// Usage: node scripts/og.mjs
import { chromium } from 'playwright-core';
import { fileURLToPath } from 'url';
import path from 'path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium/chrome-linux/chrome',
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file://' + path.join(dir, 'og-template.html'));
await page.waitForLoadState('networkidle');
await page.waitForTimeout(500); // let webfonts settle
await page.screenshot({ path: path.join(dir, '..', 'assets', 'og-default.png') });
await browser.close();
console.log('Wrote assets/og-default.png');
