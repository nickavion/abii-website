// Generates the §14 assets that are legitimately drawn rather than shot:
// the three step icons (asset 10) and the vent-swap diagram (asset 9).
//
// The app-UI mockups this script used to emit are gone. Real screenshots
// replaced them, and inventing app screens alongside genuine ones would
// misrepresent the product. See scripts/make-app-shots.mjs.
//
// Asset 7 (a real vent in a real room) is explicitly "photo, not render" in
// the spec and stays an AssetPlaceholder until someone shoots it.
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT = 'C:/Users/priva/Documents/ClaudeFolder/ABII/abii-website-v2/src/assets/images/mockups';
mkdirSync(OUT, { recursive: true });

const GREEN = '#177f4f';
const GOLD = '#FBC02D';
const BG = '#FCFCF9';
const MUTED = '#6B7A70';

const font = 'font-family="Segoe UI, Arial, sans-serif"';

async function toPng(svg, file, w, h) {
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(path.join(OUT, file));
  console.log('wrote', file, `${w}x${h}`);
}

// --- asset 9: swapping a vent cover (diagram, not a photo) ----------------
{
  const w = 1200,
    h = 900;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    <g stroke="${GREEN}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- old vent lifting away -->
      <rect x="${w / 2 - 260}" y="${h / 2 - 20}" width="180" height="120" rx="10" opacity="0.35"/>
      <path d="M${w / 2 - 240} ${h / 2 + 10} L${w / 2 - 100} ${h / 2 + 10} M${w / 2 - 240} ${h / 2 + 40} L${w / 2 - 100} ${h / 2 + 40} M${w / 2 - 240} ${h / 2 + 70} L${w / 2 - 100} ${h / 2 + 70}" opacity="0.35"/>
      <!-- arrow -->
      <path d="M${w / 2 - 50} ${h / 2 + 20} L${w / 2 + 50} ${h / 2 + 20}"/>
      <path d="M${w / 2 + 30} ${h / 2} L${w / 2 + 50} ${h / 2 + 20} L${w / 2 + 30} ${h / 2 + 40}"/>
      <!-- new Abii vent dropping in -->
      <rect x="${w / 2 + 80}" y="${h / 2 - 20}" width="180" height="120" rx="10"/>
      <path d="M${w / 2 + 100} ${h / 2 + 10} L${w / 2 + 240} ${h / 2 + 10} M${w / 2 + 100} ${h / 2 + 40} L${w / 2 + 240} ${h / 2 + 40} M${w / 2 + 100} ${h / 2 + 70} L${w / 2 + 240} ${h / 2 + 70}"/>
    </g>
    <text x="${w / 2}" y="${h / 2 + 180}" ${font} font-size="15" fill="${MUTED}" text-anchor="middle">Illustration, old vent out, Abii vent in</text>
  </svg>`;
  await toPng(svg, 'hands-vent-swap.png', w, h);
}

// --- asset 10: three step icons, matched stroke weight, 200x200 each ------
{
  const s = 200;
  const stroke = 10;

  const ventDrop = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <g stroke="${GREEN}" stroke-width="${stroke}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="46" y="40" width="108" height="76" rx="10"/>
      <path d="M62 66 L138 66 M62 90 L138 90"/>
      <path d="M100 132 L100 172"/>
      <path d="M76 152 L100 176 L124 152"/>
    </g>
  </svg>`;

  const phonePair = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <g stroke="${GREEN}" stroke-width="${stroke}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <rect x="30" y="34" width="62" height="112" rx="12"/>
      <path d="M118 60 A48 48 0 0 1 118 140"/>
      <path d="M112 78 A26 26 0 0 1 112 122"/>
      <circle cx="150" cy="100" r="8" fill="${GREEN}" stroke="none"/>
    </g>
  </svg>`;

  const thermoCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <g stroke="${GREEN}" stroke-width="${stroke}" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="100" cy="100" r="58"/>
      <path d="M100 58 L100 100 L128 118"/>
      <path d="M78 100 L94 116 L124 84" stroke="${GOLD}"/>
    </g>
  </svg>`;

  await toPng(ventDrop, 'step-1-vent-drop.png', s, s);
  await toPng(phonePair, 'step-2-phone-pair.png', s, s);
  await toPng(thermoCheck, 'step-3-thermostat-check.png', s, s);
}
