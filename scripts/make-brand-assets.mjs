// Turns the flat-background brand PNGs in Desktop/Abii into web assets.
// The mark is extracted as an ALPHA MASK (opaque where the ink is, transparent
// elsewhere) so the site can paint it with currentColor and it adapts to
// light/dark mode from one file.
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

const SRC = 'C:/Users/priva/Desktop/Abii';
const OUT = 'C:/Users/priva/Documents/ClaudeFolder/ABII/abii-website-v2/src/assets/images';
const FAV = 'C:/Users/priva/Documents/ClaudeFolder/ABII/abii-website-v2/src/assets/favicons';
mkdirSync(OUT, { recursive: true });
mkdirSync(FAV, { recursive: true });

// --- 1. Mark as an alpha mask, from favicon.png (dark ink on flat off-white) ---
{
  const src = sharp(path.join(SRC, 'favicon.png'));
  const { data, info } = await src.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = info.width * info.height;
  const out = Buffer.alloc(px * 4);

  // Sample the corner to learn the background luminance.
  const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  const bg = lum(0);
  const ink = 40; // measured dark-green ink is far below this

  for (let i = 0; i < px; i++) {
    const l = lum(i * 4);
    // 0 at background luminance, 255 at ink luminance, linear between.
    let a = Math.round(((bg - l) / (bg - ink)) * 255);
    a = Math.max(0, Math.min(255, a));
    out[i * 4] = 0;
    out[i * 4 + 1] = 0;
    out[i * 4 + 2] = 0;
    out[i * 4 + 3] = a;
  }

  const mask = sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
  // Trim the transparent margin so the mark fills its box, then square it back up.
  const trimmed = await mask.png().trim({ threshold: 1 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const side = Math.max(meta.width, meta.height);
  await sharp({
    create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: trimmed, gravity: 'center' }])
    .png()
    .toFile(path.join(OUT, 'abii-mark-mask.png'));
  console.log(`mark mask: ${side}x${side} (source ${info.width}x${info.height})`);
}

// --- 2. Favicons, straight from the source mark (its off-white ground is on-brand) ---
for (const [name, size] of [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(path.join(SRC, 'favicon.png')).resize(size, size, { fit: 'cover' }).png().toFile(path.join(FAV, name));
}
console.log('favicons written');

// --- 3. Social share card, 1200x630 exactly (spec asset #12) ---
{
  const markMask = await sharp(path.join(OUT, 'abii-mark-mask.png')).resize(190, 190).toBuffer();
  // Tint the mask with the light-green used on the dark logo lockup.
  const mark = await sharp({
    create: { width: 190, height: 190, channels: 4, background: { r: 141, g: 214, b: 153, alpha: 1 } },
  })
    .composite([{ input: markMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#0B1A12"/>
    <rect x="0" y="0" width="1200" height="6" fill="#29B675"/>
    <text x="290" y="196" font-family="Segoe UI, Arial, sans-serif" font-size="86" font-weight="300"
      letter-spacing="6" fill="#F3F7F3">Abii</text>
    <text x="100" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700"
      fill="#FFFFFF">Every room gets its own</text>
    <text x="100" y="404" font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700"
      fill="#29B675">temperature.</text>
    <text x="100" y="492" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="400"
      fill="#A7BDAF">Smart vents that heat and cool room by room.</text>
    <text x="100" y="536" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="400"
      fill="#A7BDAF">Drop-in install, no ductwork.</text>
    <rect x="100" y="566" width="86" height="4" fill="#FBC02D"/>
  </svg>`);

  await sharp(svg)
    .composite([{ input: mark, top: 60, left: 100 }])
    .png()
    .toFile(path.join(OUT, 'abii-social-card.png'));
  console.log('social card: 1200x630');
}
