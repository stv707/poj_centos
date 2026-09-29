import { chromium } from 'playwright-chromium';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertPngsToPdf() {
  const pngDir = path.resolve(__dirname, '../myslides/pngs');
  const outputPdf = path.resolve(__dirname, '../myslides/slides.pdf');

  if (!fs.existsSync(pngDir)) {
    console.error('PNG directory not found:', pngDir);
    process.exit(1);
  }

  // Sort files numerically: 1.png, 2.png, ... 37.png
  const files = fs.readdirSync(pngDir)
    .filter(f => f.endsWith('.png'))
    .sort((a, b) => parseInt(a) - parseInt(b));

  console.log(`Combining ${files.length} slide images into fast-scroll PDF...`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Generate an HTML document containing all slides as full-page images
  const slidesHtml = files.map((file, idx) => {
    const fullPath = path.join(pngDir, file);
    const base64Data = fs.readFileSync(fullPath).toString('base64');
    return `
      <div class="page ${idx === files.length - 1 ? 'last-page' : ''}">
        <img src="data:image/png;base64,${base64Data}" />
      </div>
    `;
  }).join('');

  const htmlContent = `
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
            background: #000;
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
            background: #f8fafc;
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

  await page.setContent(htmlContent, { waitUntil: 'load' });
  await page.pdf({
    path: outputPdf,
    width: '16in',
    height: '9in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('✓ Successfully created fast raster PDF at:', outputPdf);
}

convertPngsToPdf().catch(console.error);
