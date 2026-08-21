// Generates the §14 assets that AssetPlaceholder was standing in for, as
// designed UI mockups (not real photos/screenshots — the app doesn't exist
// yet to screenshot). Asset 7 (a real vent in a real room) is explicitly
// "photo, not render" in the spec and stays a placeholder for that reason.
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

const OUT = 'C:/Users/priva/Documents/ClaudeFolder/ABII/abii-website-v2/src/assets/images/mockups';
mkdirSync(OUT, { recursive: true });

const GREEN = '#177f4f';
const MOSS = '#14532D';
const GOLD = '#FBC02D';
const BG = '#FCFCF9';
const CARD = '#FFFFFF';
const INK = '#1C2B23';
const MUTED = '#6B7A70';
const LINE = '#E3E8E3';
const GRAY_DOT = '#9AA5A0';

const font = 'font-family="Segoe UI, Arial, sans-serif"';

async function toPng(svg, file, w, h) {
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(path.join(OUT, file));
  console.log('wrote', file, `${w}x${h}`);
}

// --- helpers --------------------------------------------------------------

const roomCard = (x, y, w, h, name, temp, statusText, statusColor, ventOpen) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="14" fill="${CARD}" stroke="${LINE}" stroke-width="2"/>
    <text x="20" y="30" ${font} font-size="16" font-weight="700" fill="${INK}">${name}</text>
    <text x="20" y="${h - 22}" ${font} font-size="11" font-weight="600" fill="${statusColor}">${statusText}</text>
    <circle cx="${w - 26}" cy="${h - 26}" r="5" fill="${statusColor}"/>
    <text x="${w - 20}" y="42" ${font} font-size="30" font-weight="300" fill="${INK}" text-anchor="end">${temp}°</text>
    <!-- vent glyph -->
    <g transform="translate(${w - 46} ${h - 52})" stroke="${ventOpen ? GREEN : GRAY_DOT}" stroke-width="3" fill="none" stroke-linecap="round">
      <rect x="0" y="0" width="24" height="18" rx="3"/>
      ${ventOpen ? '<path d="M4 6 L20 6 M4 12 L20 12"/>' : '<path d="M4 9 L20 9"/>'}
    </g>
  </g>
`;

const phoneFrame = (x, y, w, h, inner) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="${h}" rx="${w * 0.12}" fill="${MOSS}"/>
    <rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="${w * 0.1}" fill="${BG}"/>
    <rect x="${w / 2 - 22}" y="14" width="44" height="7" rx="3.5" fill="${MOSS}" opacity="0.5"/>
    ${inner}
  </g>
`;

const externalCard = (x, y, w) => `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="52" rx="10" fill="${MOSS}"/>
    <text x="16" y="22" ${font} font-size="10" font-weight="700" fill="${GOLD}" letter-spacing="1">OUTSIDE</text>
    <text x="16" y="42" ${font} font-size="16" font-weight="600" fill="#fff">58°F · 61% humidity</text>
  </g>
`;

// --- asset 4: two rooms at different targets, both at target -------------
{
  const w = 1200,
    h = 900;
  const cardW = 460,
    cardH = 340;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    <text x="${w / 2}" y="90" ${font} font-size="24" font-weight="700" fill="${INK}" text-anchor="middle">Your rooms</text>
    <text x="${w / 2}" y="122" ${font} font-size="14" fill="${MUTED}" text-anchor="middle">Both at target, no compromise</text>
    ${roomCard(w / 2 - cardW - 20, 170, cardW, cardH, 'Bedroom', 70, 'AT TARGET', GREEN, true)}
    ${roomCard(w / 2 + 20, 170, cardW, cardH, 'Living Room', 66, 'AT TARGET', GREEN, true)}
  </svg>`;
  await toPng(svg, 'app-two-rooms.png', w, h);
}

// --- asset 5: vacant room card, vent closed -------------------------------
{
  const w = 1200,
    h = 900;
  const cardW = 520,
    cardH = 380;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    ${roomCard(w / 2 - cardW / 2, (h - cardH) / 2, cardW, cardH, 'Guest Room', 61, 'VACANT · TRICKLE', GRAY_DOT, false)}
  </svg>`;
  await toPng(svg, 'room-card-vacant.png', w, h);
}

// --- asset 6: two phones, parent full view vs kid single-room view -------
{
  const w = 1200,
    h = 900;
  const phoneW = 420,
    phoneH = 720;

  const parentInner = `
    <text x="30" y="60" ${font} font-size="15" font-weight="700" fill="${INK}">All rooms</text>
    ${roomCard(20, 78, phoneW - 52, 130, 'Bedroom', 70, 'AT TARGET', GREEN, true)}
    ${roomCard(20, 220, phoneW - 52, 130, 'Living Room', 66, 'AT TARGET', GREEN, true)}
    ${roomCard(20, 362, phoneW - 52, 130, 'Kid\u2019s Room', 72, 'AT TARGET', GREEN, true)}
  `;
  const kidInner = `
    <text x="30" y="60" ${font} font-size="15" font-weight="700" fill="${INK}">My room</text>
    ${roomCard(20, 78, phoneW - 52, 200, 'Kid\u2019s Room', 72, 'AT TARGET', GREEN, true)}
    <text x="30" y="330" ${font} font-size="11" fill="${MUTED}">Other rooms are hidden</text>
  `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    ${phoneFrame(w / 2 - phoneW - 40, (h - phoneH) / 2, phoneW, phoneH, parentInner)}
    ${phoneFrame(w / 2 + 40, (h - phoneH) / 2, phoneW, phoneH, kidInner)}
    <text x="${w / 2 - phoneW / 2 - 40}" y="${(h - phoneH) / 2 + phoneH + 44}" ${font} font-size="15" font-weight="700" fill="${INK}" text-anchor="middle">Parent, full access</text>
    <text x="${w / 2 + phoneW / 2 + 40}" y="${(h - phoneH) / 2 + phoneH + 44}" ${font} font-size="15" font-weight="700" fill="${INK}" text-anchor="middle">Kid, one room</text>
  </svg>`;
  await toPng(svg, 'two-phones-parent-kid.png', w, h);
}

// --- asset 8: full app home screen, room list + external conditions ------
{
  const w = 1200,
    h = 900;
  const phoneW = 460,
    phoneH = 800;
  const inner = `
    <text x="30" y="58" ${font} font-size="16" font-weight="700" fill="${INK}">Home</text>
    ${externalCard(20, 76, phoneW - 52)}
    ${roomCard(20, 140, phoneW - 52, 118, 'Bedroom', 70, 'AT TARGET', GREEN, true)}
    ${roomCard(20, 268, phoneW - 52, 118, 'Living Room', 66, 'AT TARGET', GREEN, true)}
    ${roomCard(20, 396, phoneW - 52, 118, 'Office', 68, 'AT TARGET', GREEN, true)}
    ${roomCard(20, 524, phoneW - 52, 118, 'Guest Room', 61, 'VACANT · TRICKLE', GRAY_DOT, false)}
  `;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${BG}"/>
    ${phoneFrame(w / 2 - phoneW / 2, (h - phoneH) / 2, phoneW, phoneH, inner)}
  </svg>`;
  await toPng(svg, 'app-full-home.png', w, h);
}

// --- asset 9: hands swapping a vent cover (illustration, not a photo) -----
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
    <text x="${w / 2}" y="${h / 2 + 180}" ${font} font-size="15" fill="${MUTED}" text-anchor="middle">Illustration — old vent out, Abii vent in</text>
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
