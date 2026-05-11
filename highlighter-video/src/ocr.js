#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const imgPath = path.resolve(__dirname, '../public/article.png');
const outPath = path.resolve(__dirname, 'highlights.json');

if (!fs.existsSync(imgPath)) {
  console.error(`Image not found: ${imgPath}`);
  process.exit(1);
}

console.log(`Running OCR on ${imgPath} …`);

// tesseract TSV columns (level 5 = word):
// level page_num block_num par_num line_num word_num left top width height conf text
const tsv = execSync(
  `tesseract "${imgPath}" stdout tsv 2>/dev/null`,
  { maxBuffer: 20 * 1024 * 1024 }
).toString();

const rows = tsv.trim().split('\n').slice(1); // drop header

const words = rows.flatMap(row => {
  const cols = row.split('\t');
  if (cols.length < 12) return [];
  if (parseInt(cols[0]) !== 5) return [];   // word level only
  const conf = parseFloat(cols[10]);
  if (conf < 30) return [];
  const text = cols[11].trim();
  if (!text) return [];
  return [{
    block: parseInt(cols[2]),
    par:   parseInt(cols[3]),
    line:  parseInt(cols[4]),
    text,
    x: parseInt(cols[6]),
    y: parseInt(cols[7]),
    w: parseInt(cols[8]),
    h: parseInt(cols[9]),
  }];
});

// Group words into per-line highlights
const lineMap = new Map();
for (const w of words) {
  const key = `${w.block}-${w.par}-${w.line}`;
  if (!lineMap.has(key)) lineMap.set(key, []);
  lineMap.get(key).push(w);
}

const PADDING = 4;
const highlights = [];
for (const lineWords of lineMap.values()) {
  if (!lineWords.length) continue;
  const text = lineWords.map(w => w.text).join(' ');
  const x      = Math.max(0, Math.min(...lineWords.map(w => w.x)) - PADDING);
  const y      = Math.max(0, Math.min(...lineWords.map(w => w.y)) - PADDING);
  const right  = Math.max(...lineWords.map(w => w.x + w.w)) + PADDING;
  const bottom = Math.max(...lineWords.map(w => w.y + w.h)) + PADDING;
  highlights.push({ text, x, y, width: right - x, height: bottom - y });
}

fs.writeFileSync(outPath, JSON.stringify(highlights, null, 2));
console.log(`Wrote ${highlights.length} highlights → ${outPath}`);
