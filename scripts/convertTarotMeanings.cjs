// Utility script to convert JS tarot_meanings_data.js into TypeScript data/tarotMeaningsData.ts
// Run with: node scripts/convertTarotMeanings.cjs

const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'tarot', 'tarot_meanings_data.js');
const dstPath = path.join(__dirname, '..', 'data', 'tarotMeaningsData.ts');

const content = fs.readFileSync(srcPath, 'utf8');

// Extract the array literal: const tarotMeaningsData = [ ... ];
const match = content.match(/const\s+tarotMeaningsData\s*=\s*(\[[\s\S]*?\]);/);

if (!match) {
  console.error('Failed to find tarotMeaningsData array in source JS file.');
  process.exit(1);
}

const arrayLiteral = match[1].trim();

const tsContent = `// Detailed tarot card meanings data for all 78 cards
export interface TarotMeaningData {
  name: string;
  keywords: string;
  meaning_up: string;
  meaning_rev: string;
  code_meaning: string;
}

export const tarotMeaningsData: TarotMeaningData[] = ${arrayLiteral};
`;

fs.writeFileSync(dstPath, tsContent, 'utf8');

console.log('✅ Wrote TypeScript tarotMeaningsData.ts with 78 cards.');

