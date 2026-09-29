import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const rootDir = path.resolve(__dirname, '..');
  const pngDir = path.resolve(rootDir, 'myslides/pngs');
  const slidesMdPath = path.resolve(rootDir, 'slides.md');
  const outputPptx = path.resolve(rootDir, 'myslides/slides.pptx');
  const outputPdf = path.resolve(rootDir, 'myslides/slides.pdf');

  const TOTAL_SLIDES = 20;

  console.log('=== Building MariaDB Presentation Deck (POJ Putrajaya) ===');
  console.log('Source slides:', slidesMdPath);
  console.log('Source PNGs:', pngDir);
  console.log(`Total slides to compile: ${TOTAL_SLIDES}`);

  // 1. Extract speaker notes from slides.md
  const mdContent = fs.readFileSync(slidesMdPath, 'utf8');
  const sections = mdContent.split(/^---$/m);
  
  const notesBySlide = {};
  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const secIdx = i === 1 ? 2 : i + 1;
    const sec = sections[secIdx] || '';
    const match = sec.match(/<!--([\s\S]*?)-->/);
    if (match) {
      notesBySlide[i] = match[1].trim();
    } else {
      notesBySlide[i] = `Slaid ${i}: Bengkel Pentadbiran MariaDB Moden (POJ Putrajaya).`;
    }
  }

  // 2. Generate PowerPoint (PPTX)
  console.log('\n--- Generating PowerPoint (PPTX) ---');
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.title = 'Pentadbiran MariaDB Moden - POJ Putrajaya';
  pres.company = 'Cognitoz I.T Training Sdn Bhd';

  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    const pngFile = path.resolve(pngDir, `${i}.png`);
    if (!fs.existsSync(pngFile)) {
      throw new Error(`Slide image missing: ${pngFile}`);
    }

    const slide = pres.addSlide();
    slide.addImage({
      path: pngFile,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%'
    });

    const note = notesBySlide[i] || '';
    slide.addNotes(note);
    console.log(`PPTX Slide ${i}/${TOTAL_SLIDES}: Attached image (${(fs.statSync(pngFile).size / 1024).toFixed(0)} KB) + notes (${note.length} chars)`);
  }

  await pres.writeFile({ fileName: outputPptx });
  console.log(`PPTX successfully generated at: ${outputPptx}`);

  // 3. Generate PDF via Playwright
  console.log('\n--- Generating PDF (High-Res 16:9) ---');
  const { chromium } = await import('file:///D:/crm-build-cognitoz/chat.cognitoz.com/node_modules/playwright-core/index.mjs');
  
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  const page = await browser.newPage();

  const slidesHtml = Array.from({ length: TOTAL_SLIDES }, (_, idx) => {
    const slideNum = idx + 1;
    const pngPath = path.resolve(pngDir, `${slideNum}.png`);
    const base64Data = fs.readFileSync(pngPath).toString('base64');
    return `
      <div class="page ${slideNum === TOTAL_SLIDES ? 'last-page' : ''}">
        <img src="data:image/png;base64,${base64Data}" alt="Slide ${slideNum}" />
      </div>
    `;
  }).join('\n');

  const htmlDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          @page {
            size: 16in 9in;
            margin: 0;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            background: #0b0f19;
          }
          .page {
            width: 16in;
            height: 9in;
            page-break-after: always;
            break-after: page;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #ffffff;
          }
          .page.last-page {
            page-break-after: avoid;
            break-after: avoid;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
          }
        </style>
      </head>
      <body>
        ${slidesHtml}
      </body>
    </html>
  `;

  await page.setContent(htmlDoc, { waitUntil: 'load' });
  await page.pdf({
    path: outputPdf,
    width: '16in',
    height: '9in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log(`PDF successfully generated at: ${outputPdf}`);

  console.log('\n=== Generation Complete ===');
  const pptxStat = fs.statSync(outputPptx);
  const pdfStat = fs.statSync(outputPdf);
  console.log(`PPTX size: ${(pptxStat.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`PDF size:  ${(pdfStat.size / (1024 * 1024)).toFixed(2)} MB`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
