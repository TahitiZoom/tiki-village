const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createIco() {
  const rootDir = path.resolve(__dirname, '..');
  const svgPath = path.resolve(rootDir, 'public/favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const png48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  const images = [png16, png32, png48];
  const sizes = [16, 32, 48];

  let dataOffset = 6 + (16 * images.length);
  const offsets = [];
  for (const img of images) {
    offsets.push(dataOffset);
    dataOffset += img.length;
  }

  const ico = Buffer.alloc(dataOffset);
  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(images.length, 4);

  for (let i = 0; i < images.length; i++) {
    const off = 6 + (i * 16);
    ico.writeUInt8(sizes[i], off);
    ico.writeUInt8(sizes[i], off + 1);
    ico.writeUInt8(0, off + 2);
    ico.writeUInt8(0, off + 3);
    ico.writeUInt16LE(1, off + 4);
    ico.writeUInt16LE(32, off + 6);
    ico.writeUInt32LE(images[i].length, off + 8);
    ico.writeUInt32LE(offsets[i], off + 12);
  }

  for (let i = 0; i < images.length; i++) {
    images[i].copy(ico, offsets[i]);
  }

  fs.writeFileSync(path.resolve(rootDir, 'public/favicon.ico'), ico);
  console.log('favicon.ico created (16, 32, 48)');

  await sharp(svgBuffer).resize(180, 180).png().toFile(path.resolve(rootDir, 'public/apple-touch-icon.png'));
  console.log('apple-touch-icon.png created (180x180)');
}

createIco().catch(console.error);
