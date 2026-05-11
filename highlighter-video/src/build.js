#!/usr/bin/env node
'use strict';

const sharp = require('sharp');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const imgPath        = path.resolve(__dirname, '../public/article.png');
const highlightsPath = path.resolve(__dirname, 'highlights.json');
const outPath        = path.resolve(__dirname, '../out/article.mp4');

const FPS                  = 24;
const SECS_PER_HIGHLIGHT   = 1.5;
const FRAMES_PER_HIGHLIGHT = Math.round(FPS * SECS_PER_HIGHLIGHT);
const HIGHLIGHT_COLOR      = 'rgba(255,235,0,0.55)';

async function writeFrame(stdin, buf) {
  return new Promise((res, rej) => {
    const ok = stdin.write(buf, err => err ? rej(err) : res());
    if (!ok) stdin.once('drain', res);
  });
}

async function main() {
  if (!fs.existsSync(imgPath)) {
    console.error(`Image not found: ${imgPath}`); process.exit(1);
  }
  if (!fs.existsSync(highlightsPath)) {
    console.error(`highlights.json not found — run "npm run ocr" first`); process.exit(1);
  }

  const highlights = JSON.parse(fs.readFileSync(highlightsPath, 'utf8'));
  if (!highlights.length) {
    console.error('No highlights found in highlights.json'); process.exit(1);
  }

  const { width, height } = await sharp(imgPath).metadata();
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  console.log(`Image: ${width}×${height}px | ${highlights.length} highlights | ${FPS}fps`);

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f',       'rawvideo',
    '-pix_fmt', 'rgba',
    '-s',       `${width}x${height}`,
    '-r',       String(FPS),
    '-i',       'pipe:0',
    '-vf',      'format=yuv420p',
    '-c:v',     'libx264',
    '-crf',     '23',
    '-preset',  'fast',
    outPath,
  ]);

  ffmpeg.stderr.on('data', d => process.stderr.write(d));

  const baseBuffer = fs.readFileSync(imgPath);

  for (let i = 0; i < highlights.length; i++) {
    const hl = highlights[i];
    const pct = (((i + 1) / highlights.length) * 100).toFixed(0);
    process.stdout.write(`\r[${pct.padStart(3)}%] ${String(i + 1).padStart(4)}/${highlights.length} — ${hl.text.substring(0, 50)}`);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect x="${hl.x}" y="${hl.y}" width="${hl.width}" height="${hl.height}"
        fill="${HIGHLIGHT_COLOR}" rx="3" ry="3"/>
</svg>`;

    const frame = await sharp(baseBuffer)
      .composite([{ input: Buffer.from(svg), blend: 'over' }])
      .raw()
      .ensureAlpha()
      .toBuffer();

    for (let f = 0; f < FRAMES_PER_HIGHLIGHT; f++) {
      await writeFrame(ffmpeg.stdin, frame);
    }
  }

  process.stdout.write('\nFinalizing video…\n');
  ffmpeg.stdin.end();

  await new Promise((res, rej) =>
    ffmpeg.on('close', code => code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}`)))
  );

  const size = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`\nDone → ${outPath} (${size} KB)`);
}

main().catch(err => { console.error(err.message); process.exit(1); });
