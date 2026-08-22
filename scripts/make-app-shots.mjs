// Prepares the real Abii app screenshots for the site.
//
// Source files are iPhone screenshots (1179x2556) supplied by the founder.
// They replace the invented UI mockups that previously filled these slots:
// everything the site now shows of the app is a real screen.
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import path from 'path';

const SRC = 'C:/Users/priva/Downloads';
const OUT = 'C:/Users/priva/Documents/ClaudeFolder/ABII/abii-website-v2/src/assets/images/app';
mkdirSync(OUT, { recursive: true });

const shot = (name) => path.join(SRC, name);

// --- Asset 4: home screen, target + HVAC mode + first room ----------------
// Trimmed of the iOS status bar so the marketing page isn't showing someone's
// battery level and carrier signal.
await sharp(shot('IMG_3077.PNG'))
  .extract({ left: 0, top: 150, width: 1179, height: 2406 })
  .png()
  .toFile(path.join(OUT, 'app-home-target.png'));
console.log('wrote app-home-target.png');

// --- Asset 8: room list at differing temps + external conditions card ------
await sharp(shot('IMG_3078.PNG'))
  .extract({ left: 0, top: 150, width: 1179, height: 2406 })
  .png()
  .toFile(path.join(OUT, 'app-rooms-external.png'));
console.log('wrote app-rooms-external.png');

// --- Asset 5: the vacant room card, cropped out of the room list ----------
// Landscape crop so it sits properly beside body copy rather than towering
// over it the way a full portrait screenshot does.
await sharp(shot('IMG_3078.PNG'))
  .extract({ left: 55, top: 995, width: 1070, height: 300 })
  .png()
  .toFile(path.join(OUT, 'app-room-vacant.png'));
console.log('wrote app-room-vacant.png');
