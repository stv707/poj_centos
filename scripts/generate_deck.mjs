import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const PptxGenJS = require('D:/poj/mariadb-admin/node_modules/pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Cognitoz I.T Training Sdn Bhd';
pptx.company = 'Cognitoz I.T Training Sdn Bhd';
pptx.subject = 'Pentadbiran MariaDB Moden untuk Jabatan Kehakiman Malaysia (POJ)';
pptx.title = 'Pentadbiran MariaDB Moden: Struktur, Keselamatan, Transaksi & Operasi Harian';

const LOGO_PATH = 'D:/poj/mariadb-admin/public/cognitoz-logo.png';
const STEVEN_QR = 'D:/poj/mariadb-admin/public/steven-qr.png';
const FEEDBACK_QR = 'D:/poj/mariadb-admin/public/feedback-qr.png';

const C_NAVY = '003545';
const C_BLUE = '0078D4';
const C_TEAL = '009E96';
const C_AMBER = 'D97706';
const C_PURPLE = '7E22CE';
const C_DARK = '0F172A';
const C_SLATE = '334155';
const C_MUTED = '64748B';
const C_BG = 'F8FAFC';
const C_CARD_BG = 'FFFFFF';
const C_BORDER = 'E2E8F0';

let totalSlides = 22;

function addHeader(slide, kicker, title, subtitle) {
  // Top decorative bar
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 3.33, h: 0.06, fill: { color: C_BLUE } });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 3.33, y: 0, w: 3.33, h: 0.06, fill: { color: C_NAVY } });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 6.66, y: 0, w: 3.33, h: 0.06, fill: { color: C_TEAL } });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 9.99, y: 0, w: 3.34, h: 0.06, fill: { color: C_AMBER } });

  // Logo top left
  if (fs.existsSync(LOGO_PATH)) {
    slide.addImage({ path: LOGO_PATH, x: 0.7, y: 0.22, w: 1.6, h: 0.45 });
  }

  // Top pill badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.8, y: 0.25, w: 3.8, h: 0.38,
    fill: { color: 'FFFFFF' },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.18
  });
  slide.addText('MariaDB 11.4 Enterprise  |  POJ Putrajaya', {
    x: 8.8, y: 0.25, w: 3.8, h: 0.38,
    fontSize: 9, bold: true, color: C_NAVY, align: 'center', valign: 'middle'
  });

  // Kicker
  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 0.7, y: 0.85, w: 11.9, h: 0.3,
      fontSize: 10, bold: true, color: C_BLUE, charSpacing: 1.5
    });
  }

  // Title
  slide.addText(title, {
    x: 0.7, y: kicker ? 1.12 : 0.95, w: 11.9, h: 0.55,
    fontSize: 22, bold: true, color: C_DARK
  });

  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.7, y: kicker ? 1.68 : 1.5, w: 11.9, h: 0.35,
      fontSize: 12, color: C_MUTED
    });
  }
}

function addFooter(slide, currentNum) {
  slide.addShape(pptx.shapes.LINE, {
    x: 0.7, y: 7.0, w: 11.9, h: 0,
    line: { color: C_BORDER, width: 1 }
  });

  slide.addText('Cognitoz BetaLab  |  Jabatan Kehakiman Malaysia (POJ)', {
    x: 0.7, y: 7.05, w: 5.0, h: 0.35,
    fontSize: 9, color: C_MUTED, bold: true
  });

  slide.addText('Copyright Â© 2026 Cognitoz I.T Training Sdn Bhd â€” www.cognitoz.com', {
    x: 4.8, y: 7.05, w: 5.5, h: 0.35,
    fontSize: 8.5, color: C_MUTED, align: 'center'
  });

  slide.addText(`${currentNum} / ${totalSlides}`, {
    x: 10.5, y: 7.05, w: 2.1, h: 0.35,
    fontSize: 9, color: C_MUTED, align: 'right', bold: true
  });
}

function addCard(slide, { x, y, w, h, topColor, title, bullets, note, iconText }) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: C_CARD_BG },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.15
  });

  if (topColor) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w, h: 0.08,
      fill: { color: topColor },
      line: { color: topColor, width: 0 },
      rectRadius: 0.04
    });
  }

  let textY = y + 0.2;
  if (title) {
    slide.addText(title, {
      x: x + 0.25, y: textY, w: w - 0.5, h: 0.35,
      fontSize: 12, bold: true, color: topColor || C_DARK
    });
    textY += 0.38;
  }

  if (bullets && bullets.length > 0) {
    const formatted = bullets.map(b => ({
      text: b,
      options: { bullet: true, fontSize: 9.5, color: C_SLATE, spaceAfter: 5, lineSpacing: 14 }
    }));
    slide.addText(formatted, {
      x: x + 0.25, y: textY, w: w - 0.5, h: h - (textY - y) - (note ? 0.6 : 0.2),
      valign: 'top'
    });
  }

  if (note) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.2, y: y + h - 0.55, w: w - 0.4, h: 0.42,
      fill: { color: 'F1F5F9' },
      line: { color: C_BORDER, width: 0.8 },
      rectRadius: 0.08
    });
    slide.addText(note, {
      x: x + 0.25, y: y + h - 0.55, w: w - 0.5, h: 0.42,
      fontSize: 8.5, color: topColor || C_BLUE, bold: true, valign: 'middle'
    });
  }
}

function addDemoSlide(slide, { num, title, duration, commands, observations, outcome, notesText }) {
  addHeader(slide, `SESI DEMO ${num} (BETALAB)`, title, 'Peralihan Terus ke Makmal Interaktif: Jalankan Arahan & Perhatikan Bukti Nyata');

  // Left card: Commands
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.25,
    fill: { color: 'FFFFFF' },
    line: { color: 'BAE6FD', width: 1.5 },
    rectRadius: 0.15
  });
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 5.8, h: 0.45,
    fill: { color: 'E0F2FE' },
    line: { color: 'BAE6FD', width: 0 },
    rectRadius: 0.15
  });
  slide.addText(`ðŸ–¥ï¸ ARAHAN TERMINAL BETALAB (LANGKAH ${num})`, {
    x: 0.9, y: 2.15, w: 5.4, h: 0.35,
    fontSize: 10.5, bold: true, color: '0369A1'
  });

  const cmdFormatted = commands.map((c, idx) => ({
    text: `${idx + 1}.  ${c}\n`,
    options: { fontSize: 9.5, fontFace: 'Consolas', color: '0F172A', lineSpacing: 18 }
  }));
  slide.addText(cmdFormatted, {
    x: 0.9, y: 2.65, w: 5.4, h: 3.5,
    valign: 'top'
  });

  // Right card: Observations & Outcome
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.25,
    fill: { color: 'FFFFFF' },
    line: { color: '99F6E4', width: 1.5 },
    rectRadius: 0.15
  });
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 2.1, w: 5.8, h: 0.45,
    fill: { color: 'CCFBF1' },
    line: { color: '99F6E4', width: 0 },
    rectRadius: 0.15
  });
  slide.addText('ðŸ” APA YANG PERLU DIPERHATIKAN & BUKTI OPERASI', {
    x: 7.0, y: 2.15, w: 5.4, h: 0.35,
    fontSize: 10.5, bold: true, color: '0F766E'
  });

  const obsFormatted = observations.map(o => ({
    text: o,
    options: { bullet: true, fontSize: 9.5, color: C_SLATE, spaceAfter: 6 }
  }));
  slide.addText(obsFormatted, {
    x: 7.0, y: 2.65, w: 5.4, h: 2.3,
    valign: 'top'
  });

  // Outcome banner
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.0, y: 5.15, w: 5.4, h: 1.0,
    fill: { color: 'F0FDF4' },
    line: { color: 'BBF7D0', width: 1 },
    rectRadius: 0.1
  });
  slide.addText('ðŸŽ¯ KEPUTUSAN & KESIMPULAN OPERASI:', {
    x: 7.15, y: 5.22, w: 5.1, h: 0.25,
    fontSize: 8.5, bold: true, color: '166534'
  });
  slide.addText(outcome, {
    x: 7.15, y: 5.48, w: 5.1, h: 0.6,
    fontSize: 9, color: '15803D', italic: true
  });

  // Bottom action bar
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 6.45, w: 11.9, h: 0.42,
    fill: { color: 'EFF6FF' },
    line: { color: 'BFDBFE', width: 1 },
    rectRadius: 0.08
  });
  slide.addText(`ðŸ‘‰ Sila beralih ke tetingkap pelayar BetaLab dan laksanakan Langkah ${num} dalam persekitaran makmal sekarang.`, {
    x: 0.7, y: 6.45, w: 11.9, h: 0.42,
    fontSize: 10, bold: true, color: '1E40AF', align: 'center', valign: 'middle'
  });

  addFooter(slide, slideIndex);
  if (notesText) slide.addNotes(notesText);
}

let slideIndex = 1;

// ==========================================
// SLIDE 1: Title Slide
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };

  // Top stripes
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 3.33, h: 0.08, fill: { color: C_BLUE } });
  s.addShape(pptx.shapes.RECTANGLE, { x: 3.33, y: 0, w: 3.33, h: 0.08, fill: { color: C_NAVY } });
  s.addShape(pptx.shapes.RECTANGLE, { x: 6.66, y: 0, w: 3.33, h: 0.08, fill: { color: C_TEAL } });
  s.addShape(pptx.shapes.RECTANGLE, { x: 9.99, y: 0, w: 3.34, h: 0.08, fill: { color: C_AMBER } });

  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x: 0.8, y: 0.5, w: 2.2, h: 0.62 });
  }

  // Header badges
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.5, y: 0.55, w: 4.1, h: 0.45,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.2
  });
  s.addText('MariaDB 11.4 Enterprise  |  POJ Putrajaya', {
    x: 8.5, y: 0.55, w: 4.1, h: 0.45,
    fontSize: 10, bold: true, color: C_NAVY, align: 'center', valign: 'middle'
  });

  // Main Title
  s.addText('Pentadbiran MariaDB Moden', {
    x: 0.8, y: 1.5, w: 11.8, h: 0.7,
    fontSize: 28, bold: true, color: C_DARK
  });
  s.addText('Struktur Pelayan, Keselamatan Minimum, Integriti Transaksi & Amalan Operasi', {
    x: 0.8, y: 2.25, w: 11.8, h: 0.45,
    fontSize: 14, bold: true, color: C_TEAL
  });

  // Pill tags
  const pills = [
    { text: 'POJ, Putrajaya', bg: 'DBEAFE', color: '1E40AF' },
    { text: 'Tahun 2026', bg: 'D1FAE5', color: '065F46' },
    { text: '120 Minit (Slaid & Demo BetaLab)', bg: 'F3E8FF', color: '6B21A8' },
    { text: 'Anjuran Cognitoz I.T Training', bg: 'F1F5F9', color: '334155' }
  ];
  pills.forEach((p, idx) => {
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 2.8, y: 2.85, w: 2.65, h: 0.35,
      fill: { color: p.bg }, line: { color: 'CBD5E1', width: 0.8 }, rectRadius: 0.17
    });
    s.addText(p.text, {
      x: 0.8 + idx * 2.8, y: 2.85, w: 2.65, h: 0.35,
      fontSize: 9, bold: true, color: p.color, align: 'center', valign: 'middle'
    });
  });

  // 4 Pillar Overview Cards
  const pillars = [
    { num: '01', title: 'Struktur & Kesihatan', desc: 'Hierarki pangkalan data, skema sistem vs pengguna, enjin InnoDB, dan diagnostik kesihatan awal.', color: C_BLUE },
    { num: '02', title: 'Akaun & Keselamatan', desc: 'Identiti User@Host, had keistimewaan minimum, pengasingan aplikasi, dan bukti sekatan tulis.', color: C_TEAL },
    { num: '03', title: 'Transaksi & Indeks', desc: 'Kawalan integriti ACID, ROLLBACK vs COMMIT, struktur B-Tree, dan analisis pelan pertanyaan EXPLAIN.', color: C_AMBER },
    { num: '04', title: 'Sandaran & Pemulihan', desc: 'Dump logikal tanpa kunci jadual, volum kekal Docker, simulasi kehilangan data, dan pulih bencana.', color: C_PURPLE },
  ];

  pillars.forEach((p, idx) => {
    const x = 0.8 + idx * 2.95;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 3.55, w: 2.8, h: 2.8,
      fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 3.55, w: 2.8, h: 0.08,
      fill: { color: p.color }, line: { color: p.color, width: 0 }, rectRadius: 0.04
    });
    s.addText(p.num, {
      x: x + 0.2, y: 3.75, w: 0.8, h: 0.4,
      fontSize: 16, bold: true, color: p.color
    });
    s.addText(p.title, {
      x: x + 0.2, y: 4.2, w: 2.4, h: 0.45,
      fontSize: 11.5, bold: true, color: C_DARK
    });
    s.addText(p.desc, {
      x: x + 0.2, y: 4.7, w: 2.4, h: 1.45,
      fontSize: 9, color: C_SLATE, lineSpacing: 13
    });
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:00 - 00:02\n\nCadangan Penerangan:\nSelamat pagi / petang dan salam sejahtera kepada warga Jabatan Kehakiman Malaysia (POJ) Putrajaya.\nSelamat datang ke bengkel "Pentadbiran MariaDB Moden: Struktur, Keselamatan, Transaksi & Amalan Operasi."\nNama saya Steven Nagendran daripada Cognitoz I.T Training.\nSesi 2 jam ini dirangka khas untuk pentadbir sistem dan pangkalan data POJ dengan pendekatan demonstrasi praktikal.');
}

// ==========================================
// SLIDE 2: Instructor Profile
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'PROFIL PENGAJAR', 'Steven Nagendran', 'Arkitek Infrastruktur Perusahaan & Perunding Teknikal Utama');

  // Left card: Profile details
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 7.6, h: 4.6,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
  });

  // Cert badges row
  const certs = [
    { text: 'Microsoft Certified Trainer (MCT)', bg: 'EFF6FF', color: '1D4ED8' },
    { text: 'Red Hat Certified Instructor', bg: 'FEF2F2', color: 'B91C1C' },
    { text: 'Cognitoz I.T Training', bg: 'F0FDF4', color: '15803D' }
  ];
  certs.forEach((c, idx) => {
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.95 + idx * 2.45, y: 2.3, w: 2.35, h: 0.35,
      fill: { color: c.bg }, line: { color: 'CBD5E1', width: 0.8 }, rectRadius: 0.17
    });
    s.addText(c.text, {
      x: 0.95 + idx * 2.45, y: 2.3, w: 2.35, h: 0.35,
      fontSize: 8, bold: true, color: c.color, align: 'center', valign: 'middle'
    });
  });

  const profileBullets = [
    '22+ Tahun Pengalaman Industri dalam reka bentuk seni bina pusat data, kejuruteraan sistem operasi, dan pentadbiran pangkalan data enterprise.',
    'Telah membimbing ribuan pentadbir sistem daripada pelbagai agensi kerajaan sektor awam Malaysia, institusi perbankan, dan syarikat GLC.',
    'Pakar merentasi dua persekitaran teras industri: Enterprise Linux dan Windows Server, bersama pengkhususan dalam kontena & automasi.',
    'Fokus Latihan POJ: Membina kefahaman operasi berasaskan bukti kukuh â€” bukan sekadar menghafal arahan, tetapi tahu mengapa, bagaimana, dan kesan setiap tindakan.'
  ];
  const formattedBullets = profileBullets.map(b => ({
    text: b,
    options: { bullet: true, fontSize: 10, color: C_SLATE, spaceAfter: 10, lineSpacing: 15 }
  }));
  s.addText(formattedBullets, {
    x: 0.95, y: 2.85, w: 7.1, h: 3.6,
    valign: 'top'
  });

  // Right card: QR Code & Contact
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.6, y: 2.1, w: 4.0, h: 4.6,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
  });
  if (fs.existsSync(STEVEN_QR)) {
    s.addImage({ path: STEVEN_QR, x: 9.6, y: 2.4, w: 2.0, h: 2.0 });
  }
  s.addText('Imbas untuk Profil LinkedIn & Hubungan Profesional', {
    x: 8.8, y: 4.55, w: 3.6, h: 0.45,
    fontSize: 9, color: C_MUTED, align: 'center'
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 9.1, y: 5.15, w: 3.0, h: 0.4,
    fill: { color: 'F1F5F9' }, line: { color: C_BORDER, width: 0.8 }, rectRadius: 0.08
  });
  s.addText('steven@cognitoz.com', {
    x: 9.1, y: 5.15, w: 3.0, h: 0.4,
    fontSize: 9, bold: true, color: C_NAVY, align: 'center', valign: 'middle'
  });
  s.addText('Kuala Lumpur & Putrajaya, Malaysia', {
    x: 8.8, y: 5.75, w: 3.6, h: 0.35,
    fontSize: 8.5, color: C_MUTED, align: 'center'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:02 - 00:04\n\nCadangan Penerangan:\nPerkongsian hari ini menggabungkan amalan pentadbiran harian MariaDB dengan teknologi moden seperti kontena dan automasi.\nFokus kita bukan untuk menghafal sintaks semata-mata, sebaliknya membina keyakinan dan keupayaan menyelesaikan masalah harian di POJ.');
}

// ==========================================
// SLIDE 3: Workshop Journey & 2-Hour Allocation
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'ALIRAN BENGKEL 120 MINIT', 'Perjalanan Pembelajaran & Agihan Masa', 'Gabungan Teori Pentadbiran Bersama Demonstrasi Makmal Secara Bergilir');

  const timeline = [
    { part: 'BAHAGIAN 1', time: '20 MIN', title: 'Struktur & Kesihatan', points: ['Hierarki pelayan & proses mysqld', 'Pangkalan data sistem vs perniagaan', 'Enjin storan InnoDB transaksional', 'Demo 1: Status & semakan skema'], color: C_BLUE },
    { part: 'BAHAGIAN 2', time: '25 MIN', title: 'Akaun & Keselamatan', points: ['Identiti User@Host & kebenaran', 'Prinsip keistimewaan minimum', 'Pengasingan akaun poj_app vs poj_report', 'Demo 2: Pembuktian sekatan tulis'], color: C_TEAL },
    { part: 'BAHAGIAN 3', time: '25 MIN', title: 'Transaksi & Indeks', points: ['Prinsip integriti ACID', 'Perbezaan ROLLBACK & COMMIT', 'Indeks B-Tree & had pertukaran kos', 'Demo 3: Analisis pelan EXPLAIN'], color: C_AMBER },
    { part: 'BAHAGIAN 4', time: '50 MIN', title: 'Sandaran, Operasi & GUI', points: ['mariadb-dump --single-transaction', 'Simulasi pulih bencana kehilangan data', 'Diagnostik harian & safe restart', 'Demo 4, 5, 6: CLI & phpMyAdmin'], color: C_PURPLE },
  ];

  timeline.forEach((t, idx) => {
    const x = 0.7 + idx * 3.05;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.1, w: 2.85, h: 4.15,
      fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.1, w: 2.85, h: 0.5,
      fill: { color: t.color }, line: { color: t.color, width: 0 }, rectRadius: 0.15
    });
    s.addText(`${t.part} (${t.time})`, {
      x: x + 0.15, y: 2.15, w: 2.55, h: 0.4,
      fontSize: 9.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
    s.addText(t.title, {
      x: x + 0.15, y: 2.75, w: 2.55, h: 0.45,
      fontSize: 12, bold: true, color: C_DARK, align: 'center'
    });

    const b = t.points.map(p => ({
      text: p,
      options: { bullet: true, fontSize: 9, color: C_SLATE, spaceAfter: 6 }
    }));
    s.addText(b, {
      x: x + 0.15, y: 3.3, w: 2.55, h: 2.8,
      valign: 'top'
    });
  });

  // Callout banner
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 6.4, w: 11.9, h: 0.45,
    fill: { color: 'F0FDF4' }, line: { color: 'BBF7D0', width: 1 }, rectRadius: 0.08
  });
  s.addText('ðŸ’¡ Metodologi: Terangkan konsep pada slaid âž¡ï¸ Beralih ke BetaLab untuk jalankan arahan âž¡ï¸ Bincangkan hasil & bawa pulang amalan terbaik.', {
    x: 0.7, y: 6.4, w: 11.9, h: 0.45,
    fontSize: 9.5, bold: true, color: '166534', align: 'center', valign: 'middle'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:04 - 00:06\n\nCadangan Penerangan:\nBerikut adalah peta perjalanan 120 minit kita.\nKita akan bergerak secara berselang-seli: slaid memberikan gambaran teori dan risiko operasi, manakala BetaLab memberikan pengalaman praktikal.');
}

// ==========================================
// SLIDE 4: Lab Topology & Architecture
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'SENI BINA MAKMAAL', 'Topologi Makmal Demonstrasi POJ', 'Persekitaran Kontena Terpencil Dilindungi Storan Berterusan Hos');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ¢ Persekitaran Hos & Kontena Docker',
    bullets: [
      'Hos Linux: Mesin maya Ubuntu yang dilengkapi enjin Docker dan pakej klien rasmi MariaDB 11.4.',
      'Kontena Database: "poj-mariadb" berasaskan imej rasmi mariadb:11.4, mendengar pada 127.0.0.1:3306.',
      'Rangkaian Terpencil: "poj-mariadb-net" menghalang capaian terbuka tanpa kawalan dari internet.',
      'Volum Docker: "poj-mariadb-data" memegang direktori /var/lib/mysql secara kekal di luar kitaran hayat kontena.',
      'Proksi Selamat Nginx: Menyediakan laluan masuk selamat dengan penyulitan HTTPS untuk papan pemuka grafik.'
    ],
    note: 'Prinsip Teras: Kontena boleh ditukar ganti bila-bila masa; data kekal selamat di dalam volum Docker hos.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'ðŸ› ï¸ Peralatan Pentadbiran Makmal',
    bullets: [
      'mariadb (CLI): Klien interaktif baris arahan untuk melaksanakan pertanyaan DDL dan DML secara langsung.',
      'mariadb-admin: Utiliti operasi pantas untuk ping semakan kesihatan, uptime, status bebenang, dan mula semula.',
      'mariadb-dump: Utiliti sandaran logikal standard untuk menjana fail teks SQL dengan integriti snapshot InnoDB.',
      'phpMyAdmin: Antara muka web untuk semakan visual struktur pangkalan data, indeks, dan keistimewaan akaun.',
      'docker CLI: Mengurus kitaran hayat kontena (stats, logs, restart, inspect volume).'
    ],
    note: 'Gabungan Ideal: Automasi dan skrip menggunakan CLI; semakan pantas menggunakan phpMyAdmin.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 00:06 - 00:09\n\nCadangan Penerangan:\nDalam persekitaran moden, pangkalan data sering dijalankan di dalam kontena.\nKunci utama di sini ialah pemisahan lapisan: kontena adalah sementara, tetapi volum adalah kekal.\nSekarang mari kita mulakan Bahagian 1.');
}

// ==========================================
// SLIDE 5: Part 1 Concepts
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'BAHAGIAN 1: TEORI OPERASI', 'Struktur Pelayan, Enjin Storan & Kesihatan', 'Memahami Hierarki Objek dan Menilai Ketersediaan Servis');

  addCard(s, {
    x: 0.7, y: 2.1, w: 3.8, h: 4.6, topColor: C_BLUE,
    title: '1. Proses & Memori',
    bullets: [
      'Proses Pelayan Tunggal: Dijalankan oleh mariadbd yang mengurus Buffer Pool dalam RAM.',
      'Bebenang Sambungan: Setiap sesi klien mencipta atau menggunakan thread daripada thread pool.',
      'Semakan Segera: mariadb-admin ping mengesahkan soket menerima sambungan dalam milisaat.',
      'Uptime: Bilangan saat servis telah berjalan tanpa gangguan.'
    ],
    note: 'Status awal wajib disemak sebelum menyentuh data.'
  });

  addCard(s, {
    x: 4.75, y: 2.1, w: 3.8, h: 4.6, topColor: C_TEAL,
    title: '2. Pembahagian Skema',
    bullets: [
      'mysql: Skema sistem memegang akaun pengguna, pemalam pengesahan, dan jadual kebenaran.',
      'information_schema: Metadata masa nyata memaparkan saiz pangkalan data, kolum, dan indeks.',
      'performance_schema: Metrik telemetri penggunaan sumber dan statistik kunci (lock metrics).',
      'poj_demo: Pangkalan data perniagaan POJ mengandungi jadual service_requests.'
    ],
    note: 'Database ialah namespace, bukan pelayan berasingan.'
  });

  addCard(s, {
    x: 8.8, y: 2.1, w: 3.8, h: 4.6, topColor: C_AMBER,
    title: '3. Enjin Storan (Storage Engine)',
    bullets: [
      'InnoDB (Lalai): Menyokong transaksi penuh ACID, foreign key constraints, dan kunci baris (row locking).',
      'Aria / MyISAM: Digunakan untuk jadual sementara dan sistem lama tanpa sokongan transaksi.',
      'Lokasi Storan: Pemboleh ubah @@datadir menunjukkan lokasi tepat fail .ibd fizikal pada disk.',
      'Semakan: SHOW PLUGINS memaparkan status enjin aktif.'
    ],
    note: 'Kuatkuasakan InnoDB untuk aplikasi kehakiman.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 4 minit\nMasa Kumulatif: 00:09 - 00:13\n\nCadangan Penerangan:\nSeorang pentadbir mesti faham apa yang berada di sebalik port 3306.\nMariaDB membezakan antara skema sistem (mysql) dan skema perniagaan (poj_demo).\nEnjin storan InnoDB adalah tulang belakang kepada keselamatan data kita.\nMari kita beralih ke BetaLab untuk melihatnya secara langsung.');
}

// ==========================================
// SLIDE 6: Demo 1 Holding Slide
// ==========================================
{
  addDemoSlide(pptx.addSlide(), {
    num: '01',
    title: 'Pemeriksaan Struktur Pelayan, Pemboleh Ubah Global & Skema',
    duration: '7 Minit',
    commands: [
      'mariadb-admin -u root -p\'PojMariaDBRoot2026\' ping',
      'mariadb-admin -u root -p\'PojMariaDBRoot2026\' status',
      'mariadb -u root -p\'...\' -e "SELECT VERSION(), @@hostname, @@datadir;"',
      'mariadb -u root -p\'...\' -e "SHOW DATABASES;"',
      'mariadb -u root -p\'...\' -e "SHOW PLUGINS;"',
      'mariadb -u root -p\'...\' poj_demo -e "SHOW TABLES;"',
      'mariadb -u root -p\'...\' poj_demo -e "DESCRIBE service_requests;"',
      'mariadb -u root -p\'...\' poj_demo -e "SELECT * FROM service_requests;"'
    ],
    observations: [
      'Ping respons: Output "mysqld is alive" mengesahkan pelayan mendengar pada port 3306.',
      'Uptime & Threads: Status menunjukkan bilangan utas aktif dan pertanyaan sesaat (QPS).',
      'Data Directory (@@datadir): Mengesahkan lokasi /var/lib/mysql/ di dalam kontena.',
      'Senarai Skema: Membezakan antara pangkalan data sistem (mysql) dan pangkalan data POJ (poj_demo).',
      'Definisi Kolum: Jadual service_requests mengandungi id auto-increment, system_name, dan status.'
    ],
    outcome: 'Pelayan MariaDB beroperasi dengan normal, enjin storan InnoDB aktif, dan skema perniagaan poj_demo bersedia menerima sambungan klien.',
    notesText: 'Tempoh Slaid: 1 minit penerangan + 6 minit demo BetaLab\nMasa Kumulatif: 00:13 - 00:20\n\nPanduan Pengajar:\nBeralih ke tab BetaLab. Klik arahan Langkah 00 & 01 satu demi satu. Tunjukkan output VERSION() dan terangkan mengapa @@datadir penting semasa audit pematuhan fail.'
  });
}

// ==========================================
// SLIDE 7: Part 1 Synthesis
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'RUMUSAN BAHAGIAN 1', 'Intipati Pemeriksaan Struktur & Kesihatan', 'Pengajaran Praktikal Daripada Sesi Makmal Pertama');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ“Œ 3 Penemuan Utama Pentadbir',
    bullets: [
      'Ruang Nama Logikal: Pangkalan data poj_demo bukan servis berasingan, sebaliknya skema logikal di dalam instans MariaDB.',
      'Kesihatan Multi-Isyarat: Kesihatan pelayan bukan sekadar "lampu hijau", tetapi melibatkan uptime, beban thread, dan ketersediaan memori.',
      'Integriti Kolum: Mengetahui jenis data (VARCHAR, TIMESTAMP, INT) membantu mencegah ralat penukaran data semasa integrasi sistem.'
    ],
    note: 'Amalan Baik: Jalankan mariadb-admin ping dalam skrip pemantauan automatik (health check).'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'ðŸ›¡ï¸ Kesan Terhadap Operasi POJ',
    bullets: [
      'Dokumentasi Lokasi: Pentadbir mesti sentiasa tahu lokasi fizikal @@datadir untuk tujuan penyulitan dan kuota storan.',
      'Pemisahan Tanggungjawab: Pengasingan skema membolehkan pelbagai aplikasi berkongsi satu kluster tanpa percampuran data.',
      'Ketetapan Enjin: Memastikan setiap jadual baharu dicipta dengan ENGINE=InnoDB bagi mengekalkan jaminan ACID.'
    ],
    note: 'Langkah Seterusnya: Mengawal siapa yang berhak menyentuh pangkalan data ini.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:20 - 00:22\n\nCadangan Penerangan:\nSekarang kita tahu struktur dalaman pelayan.\nPersoalan kritikal seterusnya: Siapa yang dibenarkan menyambung dan apa kuasa yang mereka miliki?\nMari kita lihat konsep pengurusan akaun dan hak capaian.');
}

// ==========================================
// SLIDE 8: Part 2 Concepts
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'BAHAGIAN 2: KESELAMATAN & HAD AKSES', 'Akaun, Pengesahan & Prinsip Keistimewaan Minimum', 'Mengasingkan Akses Mengikut Peranan dan Menyekat Kuasa Berlebihan');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ”‘ Identiti Unik: User@Host',
    bullets: [
      'Gabungan Dua Bahagian: Dalam MariaDB, akaun dikenal pasti melalui Nama Pengguna DAN Hos Capaian.',
      'poj_app@% : Boleh menyambung dari sebarang IP rangkaian atau subnet.',
      'poj_app@localhost : HANYA boleh menyambung secara tempatan dari mesin hos itu sendiri.',
      'Kebenaran Berasingan: Dua entiti ini mempunyai rekod berasingan di dalam mysql.user dan boleh diberikan hak berbeza.',
      'Audit Sektor Awam: Pastikan tiada akaun liar dengan hos % yang memiliki kuasa pentadbiran.'
    ],
    note: 'Jangan anggap akaun dengan nama sama mempunyai kebenaran yang sama pada hos berbeza.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_AMBER,
    title: 'âš ï¸ Prinsip Keistimewaan Minimum (Least Privilege)',
    bullets: [
      'Bahaya Akaun Root: Jangan sesekali menggunakan akaun root dalam fail konfigurasi aplikasi web (.env).',
      'Akaun Aplikasi (poj_app): Hak khusus terhad kepada SELECT, INSERT, UPDATE, DELETE pada poj_demo.* sahaja.',
      'Akaun Pelaporan (poj_report): Hak BACA-SAHAJA (SELECT) untuk papan pemuka statistik dan audit.',
      'Kunci Audit: Kegagalan arahan INSERT bagi akaun pelaporan adalah bukti positif bahawa dasar keselamatan dikuatkuasakan.',
      'Penyegaran Memori: Gunakan FLUSH PRIVILEGES selepas pengubahsuaian manual jadual kebenaran.'
    ],
    note: 'Hadkan keistimewaan pada skop terkecil yang praktikal: Global, Skema, Jadual, atau Kolum.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 00:22 - 00:25\n\nCadangan Penerangan:\nDalam keselamatan pangkalan data kerajaan, peraturan nombor satu ialah: jangan berikan kuasa lebih daripada yang diperlukan.\nAkaun root hanya untuk pentadbir berjadual. Aplikasi operasi menggunakan poj_app, manakala sistem laporan menggunakan poj_report.\nMari kita buktikan sempadan ini dalam makmal.');
}

// ==========================================
// SLIDE 9: Demo 2 Holding Slide
// ==========================================
{
  addDemoSlide(pptx.addSlide(), {
    num: '02',
    title: 'Cipta Akaun Baca-Sahaja & Buktikan Sempadan Keselamatan',
    duration: '7 Minit',
    commands: [
      'mariadb -u root -p\'...\' -e "SELECT User, Host, plugin FROM mysql.user;"',
      'mariadb -u root -p\'...\' -e "SHOW GRANTS FOR \'poj_app\'@\'%\';"',
      'mariadb -u poj_app -p\'PojApp2026\' poj_demo -e "SELECT CURRENT_USER();"',
      'mariadb -u root -p\'...\' -e "CREATE USER \'poj_report\'@\'%\' IDENTIFIED BY \'...\';"',
      'mariadb -u root -p\'...\' -e "GRANT SELECT ON poj_demo.* TO \'poj_report\'@\'%\';"',
      'mariadb -u root -p\'...\' -e "FLUSH PRIVILEGES;"',
      'mariadb -u poj_report -p\'PojReport2026\' poj_demo -e "SELECT COUNT(*) ...;"',
      'mariadb -u poj_report -p\'PojReport2026\' poj_demo -e "INSERT INTO ...;"'
    ],
    observations: [
      'SHOW GRANTS: Menunjukkan poj_app hanya memegang hak CRUD pada skema poj_demo.*.',
      'Pemisahan Sesi: CURRENT_USER() mengesahkan identiti sesi yang aktif.',
      'Ujian Baca Berjaya: poj_report boleh menjalankan SELECT COUNT(*) dengan sempurna.',
      'Penolakan Tulis (Error 1142): MariaDB menolak arahan INSERT dengan mesej:\n  "ERROR 1142: INSERT command denied to user \'poj_report\'@\'%\'"'
    ],
    outcome: 'Akaun pelaporan baca-sahaja berjaya dicipta dan enjin MariaDB membuktikan bahawa percubaan penulisan data ditolak secara mutlak.',
    notesText: 'Tempoh Slaid: 1 minit penerangan + 6 minit demo BetaLab\nMasa Kumulatif: 00:25 - 00:32\n\nPanduan Pengajar:\nTunjukkan rekod mysql.user. Cipta akaun poj_report. Jalankan SELECT (berjaya). Kemudian jalankan INSERT (gagal dengan Error 1142). Tekankan kepada peserta bahawa mesej error ini adalah kemenangan audit keselamatan.'
  });
}

// ==========================================
// SLIDE 10: Part 2 Synthesis
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'RUMUSAN BAHAGIAN 2', 'Pengajaran Keselamatan & Bukti Audit', 'Mengapa Penolakan Akses Merupakan Kejayaan Operasi');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'ðŸ“‹ Bukti Audit Pematuhan',
    bullets: [
      'Bukti Sempadan Jelas: Pegawai audit keselamatan sentiasa mahu melihat bukti bahawa arahan tidak sah benar-benar dinafikan.',
      'Mesej Ralat 1142: Membuktikan bahawa enjin kebenaran MariaDB bertindak sebagai tembok pertahanan pertama sebelum data terusik.',
      'Pencegahan Kebocoran: Sekiranya kelayakan akaun poj_report dicuri, penyerang tetap tidak dapat memadam atau mengubah rekod kes mahkamah.'
    ],
    note: 'Prinsip: Keselamatan yang tidak diuji bukanlah keselamatan yang boleh dipercayai.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_AMBER,
    title: 'âš™ï¸ Amalan Pengurusan Kredensial POJ',
    bullets: [
      'Kata Laluan Kuat: Gantikan semua kata laluan lalai bengkel ini dengan kata laluan berputar dalam pengeluaran.',
      'Semakan Berkala: Lakukan audit SHOW GRANTS setiap suku tahun untuk memastikan tiada akaun terbiar (stale accounts).',
      'Nyahdayakan Akses Luar: Sekiranya aplikasi berjalan pada mesin yang sama, tukar hos capaian daripada % kepada 127.0.0.1.'
    ],
    note: 'Langkah Seterusnya: Melindungi integriti data semasa proses pengemaskinian berlaku.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:32 - 00:34\n\nCadangan Penerangan:\nSekarang keselamatan akses telah kukuh.\nTetapi bagaimana pula dengan integriti data semasa proses penulisan berlaku?\nBagaimana kita pastikan transaksi yang gagal tidak merosakkan pangkalan data? Mari kita beralih ke Bahagian 3.');
}

// ==========================================
// SLIDE 11: Part 3 Concepts
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'BAHAGIAN 3: INTEGRITI DATA & PRESTASI', 'Transaksi ACID, Indeks & Pelan Pertanyaan', 'Memastikan Perubahan Berlaku Selamat dan Carian Berjalan Pantas');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ”„ Integriti Transaksi (ACID)',
    bullets: [
      'Atomicity (Ketunggalan): Semua kenyataan SQL dalam unit kerja berjaya atau tiada satu pun disimpan.',
      'START TRANSACTION: Memulakan sempadan transaksi terasing.',
      'ROLLBACK: Membatalkan serta-merta sebarang perubahan sekiranya berlaku ralat (tiada data kotor tertinggal).',
      'COMMIT: Mengesahkan perubahan dan menulisnya secara kekal ke dalam storan log transaksi disk (redo log).',
      'Aplikasi POJ: Pindahan status kes mahkamah mesti dilakukan dalam satu blok transaksi yang selamat.'
    ],
    note: 'Transaksi ialah unit kerja lengkap &mdash; bukan sekadar satu baris pertanyaan SQL.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_AMBER,
    title: 'âš¡ Indeks B-Tree & Analisis EXPLAIN',
    bullets: [
      'Indeks B-Tree: Struktur data penunjuk teratur yang membolehkan carian logaritmik pantas.',
      'Pertukaran Kos (Trade-off): Indeks mempercepatkan SELECT, tetapi menambah beban masa dan storan semasa INSERT/UPDATE.',
      'Pelan EXPLAIN: Alat diagnostik nombor satu pentadbir sebelum menukar pertanyaan SQL.',
      'type: ALL vs ref: "ALL" bermaksud imbasan seluruh jadual (perlahan); "ref" bermaksud carian tepat menggunakan indeks (pantas).'
    ],
    note: 'Nasihat Pentadbir: Jangan tambah indeks tanpa bukti EXPLAIN.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 00:34 - 00:37\n\nCadangan Penerangan:\nDalam persekitaran kehakiman, integriti data adalah perkara mutlak.\nSekiranya berlaku ralat pelayan semasa pengemaskinian status kes, sistem mesti membuat rollback.\nDan apabila pangkalan data membesar kepada jutaan fail, indeks membolehkan keputusan dipaparkan dalam milisaat.\nMari kita buktikan ini di BetaLab.');
}

// ==========================================
// SLIDE 12: Demo 3 Holding Slide
// ==========================================
{
  addDemoSlide(pptx.addSlide(), {
    num: '03',
    title: 'Demonstrasi Transaksi Selamat & Pengoptimuman Indeks',
    duration: '8 Minit',
    commands: [
      'mariadb -u poj_app -p\'...\' -e "SELECT COUNT(*) AS rows_before ...;"',
      'mariadb -u poj_app -p\'...\' -e "START TRANSACTION; INSERT ...; ROLLBACK;"',
      'mariadb -u poj_app -p\'...\' -e "SELECT COUNT(*) AS rows_after_rollback ...;"',
      'mariadb -u poj_app -p\'...\' -e "START TRANSACTION; UPDATE ...; COMMIT;"',
      'mariadb -u poj_app -p\'...\' -e "SELECT id, system_name, status ...;"',
      'mariadb -u root -p\'...\' -e "SHOW INDEX FROM service_requests;"',
      'mariadb -u root -p\'...\' -e "CREATE INDEX idx_service_requests_status ON service_requests(status);"',
      'mariadb -u root -p\'...\' -e "EXPLAIN SELECT * FROM service_requests WHERE status=\'OPEN\';"'
    ],
    observations: [
      'Bukti ROLLBACK: Kiraan baris rekod sebelum dan selepas rollback kekal tepat sama (rekod tidak disimpan).',
      'Bukti COMMIT: Nilai status berubah daripada OPEN kepada CLOSED dan kekal disimpan secara berterusan.',
      'SHOW INDEX: Memaparkan indeks primer (PRIMARY) berasaskan kunci id.',
      'Output EXPLAIN: Menunjukkan medan key: idx_service_requests_status dan type: ref (bukan ALL).'
    ],
    outcome: 'Integriti rollback berjaya dibuktikan secara atomik, dan pelan pertanyaan membuktikan carian kini menggunakan indeks tanpa imbasan penuh.',
    notesText: 'Tempoh Slaid: 1 minit penerangan + 7 minit demo BetaLab\nMasa Kumulatif: 00:37 - 00:45\n\nPanduan Pengajar:\nJalankan transaksi rollback. Tunjukkan kiraan baris yang tidak berubah.\nJalankan transaksi commit. Tunjukkan status rekod bertukar kepada CLOSED.\nCipta indeks status dan jalankan EXPLAIN. Terangkan kolum key dan rows dalam output EXPLAIN.'
  });
}

// ==========================================
// SLIDE 13: Part 3 Synthesis
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'RUMUSAN BAHAGIAN 3', 'Pengajaran Transaksi & Pelan Pertanyaan', 'Membezakan Antara Perubahan Sementara dan Pengoptimuman Berbukti');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ›¡ï¸ Ketunggalan Perubahan Data',
    bullets: [
      'Penyelamat Bencana Ralat: Perintah ROLLBACK membolehkan sistem kembali ke keadaan asal tanpa sebarang sisa data kotor.',
      'Sokongan Aplikasi: Pembangun perisian di POJ mesti memanfaatkan blok try/catch untuk memanggil ROLLBACK sekiranya berlaku exception.',
      'Pengekalan COMMIT: Sebaik sahaja COMMIT selesai, data dijamin tidak akan hilang walaupun bekalan kuasa terputus sejurus selepas itu.'
    ],
    note: 'Integriti data kehakiman bergantung pada disiplin transaksi.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_AMBER,
    title: 'ðŸ“ˆ Strategi Indeks yang Bijak',
    bullets: [
      'Buktikan Sebelum Buat: Sentiasa jalankan EXPLAIN sebelum menambah sebarang indeks pada jadual pengeluaran.',
      'Fokus Kolum WHERE: Bina indeks pada kolum yang kerap digunakan dalam syarat tapisan (seperti status, tarikh_daftar, no_kes).',
      'Elakkan Terlebih Indeks: Setiap indeks memperlahankan arahan INSERT dan memakan ruang memori buffer pool.'
    ],
    note: 'Indeks ialah pelaburan terpilih, bukan suis prestasi percuma.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:45 - 00:47\n\nCadangan Penerangan:\nKini kita faham bagaimana data diproses dengan selamat.\nTetapi bagaimana jika perkakasan rosak, atau bencana fizikal berlaku di pusat data?\nBagaimana data disandarkan dan dipulihkan? Mari kita masuk ke Bahagian 4.');
}

// ==========================================
// SLIDE 14: Part 4 Concepts
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'BAHAGIAN 4: SANDARAN & KETEKUNAN', 'Strategi Sandaran, Pemulihan Bencana & Volum', 'Sandaran Hanya Berguna Apabila Berjaya Dipulihkan');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ’¾ Sandaran Logikal: mariadb-dump',
    bullets: [
      'Format Fail Teks SQL: Mengandungi struktur definisi jadual (DDL) dan arahan baris data (INSERT).',
      '--single-transaction: Memanfaatkan keupayaan snapshot InnoDB untuk membuat salinan tanpa mengunci jadual operasi aplikasi.',
      '--routines --triggers: Memastikan prosedur tersimpan, fungsi, dan pencetus sistem turut disalin.',
      'Mudah Alih (Portable): Fail dump boleh dipulihkan pada versi pelayan lain atau platform perkakasan berbeza.'
    ],
    note: 'Gunakan parameter --single-transaction untuk sistem transaksi 24/7.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_PURPLE,
    title: 'ðŸ›¡ï¸ Volum Docker vs Dasar Sandaran',
    bullets: [
      'Volum Docker (poj-mariadb-data): Melindungi data daripada pemadaman kontena, tetapi BUKAN pengganti sandaran.',
      'Kerosakan Storan Hos: Sekiranya cakera hos rosak, volum kontena turut musnah bersama pelayan.',
      'Dasar Sandaran Sebenar: Salinan fail dump mesti diasingkan ke pelayan storan sandaran luar (off-site/cloud backup).',
      'Ujian Pemulihan Rutin: Menguji prosedur pemulihan secara berkala adalah satu-satunya jaminan keselamatan.'
    ],
    note: 'Aksioma: Jangan percaya sandaran yang tidak pernah diuji pemulihannya.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 00:47 - 00:50\n\nCadangan Penerangan:\nRamai pihak berasa selamat kerana ada cronjob backup setiap malam.\nTetapi pernahkah backup itu dipulihkan pada pelayan ujian?\nDalam sesi demo ini, kita akan buat backup, padam jadual secara sengaja, dan buktikan pemulihannya.');
}

// ==========================================
// SLIDE 15: Demo 4 Holding Slide
// ==========================================
{
  addDemoSlide(pptx.addSlide(), {
    num: '04',
    title: 'Simulasi Kehilangan Data & Pembuktian Pemulihan Lengkap',
    duration: '8 Minit',
    commands: [
      'mkdir -p ~/mariadb-backups',
      'mariadb-dump -u root -p\'...\' --single-transaction --routines --triggers poj_demo > ~/mariadb-backups/poj_demo.sql',
      'wc -l ~/mariadb-backups/poj_demo.sql',
      'grep -E \'CREATE TABLE|INSERT INTO\' ~/mariadb-backups/poj_demo.sql | head -20',
      'mariadb -u root -p\'...\' poj_demo -e "DROP TABLE IF EXISTS audit_demo;"',
      'mariadb -u root -p\'...\' poj_demo -e "SHOW TABLES;"',
      'mariadb -u root -p\'...\' poj_demo < ~/mariadb-backups/poj_demo.sql',
      'mariadb -u root -p\'...\' poj_demo -e "SHOW TABLES;"',
      'docker volume inspect poj-mariadb-data'
    ],
    observations: [
      'Pemeriksaan Fail Dump: Arahan grep mengesahkan skema dan rekod data terkandung di dalam fail teks .sql.',
      'Simulasi Kehilangan: Jadual audit_demo dipadamkan dan lenyap daripada senarai SHOW TABLES.',
      'Pemulihan Berjaya: Arahan pengalihan input (< poj_demo.sql) memulihkan jadual kembali tanpa sebarang ralat.',
      'Ketekunan Volum: docker inspect membuktikan storan fizikal hos terikat kukuh pada /var/lib/mysql.'
    ],
    outcome: 'Prosedur pemulihan bencana terbukti berjaya 100% dan ketekunan storan volum kontena disahkan stabil.',
    notesText: 'Tempoh Slaid: 1 minit penerangan + 7 minit demo BetaLab\nMasa Kumulatif: 00:50 - 00:58\n\nPanduan Pengajar:\nJana fail dump dan semak saiznya. Padam jadual audit_demo. Tunjukkan bahawa data telah hilang.\nPulihkan daripada fail dump menggunakan operator <. Tunjukkan jadual kembali wujud. Ini membina keyakinan pentadbir.'
  });
}

// ==========================================
// SLIDE 16: Part 4 Synthesis
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'RUMUSAN BAHAGIAN 4', 'Pengajaran Sandaran & Ketahanan Bencana', 'Dari Rutin Skrip ke Jaminan Pemulihan Menyeluruh');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ“¦ Standard Operasi Sandaran POJ',
    bullets: [
      'Gunakan --single-transaction: Mencegah gangguan kepada kakitangan mahkamah yang sedang menggunakan sistem.',
      'Automasi & Verifikasi: Pastikan skrip memeriksa kod keluar ($? == 0) dan saiz fail sandaran bukan sifar.',
      'Penyulitan Sandaran: Fail SQL mengandungi teks data mentah â€” wajib disulitkan dengan GPG sebelum dipindahkan.'
    ],
    note: 'Fail SQL mentah terdedah kepada kebocoran jika tidak disulitkan.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_PURPLE,
    title: 'ðŸ”„ Kitaran Hayat Volum Storan',
    bullets: [
      'Penyelenggaraan Tanpa Takut: Pentadbir boleh menaik taraf versi imej kontena MariaDB tanpa risau kehilangan data.',
      'Pengasingan Hos: Volum bernama docker poj-mariadb-data diuruskan oleh kernel hos, bebas daripada kitaran kontena.',
      'Simulasi Bencana: Lakukan ujian pemulihan jadual sekurang-kurangnya sekali setiap bulan.'
    ],
    note: 'Ketahanan sebenar ialah apabila pentadbir yakin dengan prosedur pemulihan.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:58 - 01:00\n\nCadangan Penerangan:\nSekarang kita tahu data selamat dan boleh dipulihkan.\nBagaimana pula dengan operasi harian apabila sistem sedang berjalan rancak?\nApakah metrik yang patut kita perhatikan? Mari kita lihat Bahagian 5.');
}

// ==========================================
// SLIDE 17: Part 5 Concepts
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'BAHAGIAN 5: PEMERIKSAAN OPERASI HARIAN', 'Pemantauan Bebenang, Sambungan, Log & Mula Semula', '5 Isyarat Kesihatan Penting Pentadbir Sistem');

  addCard(s, {
    x: 0.7, y: 2.1, w: 3.8, h: 4.6, topColor: C_BLUE,
    title: '1. Aktiviti & Proses',
    bullets: [
      'SHOW FULL PROCESSLIST: Memaparkan semua sambungan klien yang sedang aktif.',
      'Kesan Pertanyaan Tergantung: Kolum Time menunjukkan berapa lama query telah berjalan.',
      'Kunci Jadual (Locking): Mengenal pasti jika ada transaksi lama yang menghalang transaksi lain.',
      'Tindakan Pantas: KILL <Thread_ID> untuk menamatkan pertanyaan yang merosakkan prestasi.'
    ],
    note: 'Siasat dahulu proses sebelum mengambil tindakan drastik.'
  });

  addCard(s, {
    x: 4.75, y: 2.1, w: 3.8, h: 4.6, topColor: C_TEAL,
    title: '2. Had Sambungan & Storan',
    bullets: [
      'Threads_connected: Bilangan sambungan aktif semasa berbanding max_connections.',
      'Elak Ralat Kritikal: Mencegah ralat sistem "Too many connections" semasa waktu puncak mahkamah.',
      'Kapasiti Storan: information_schema.tables memaparkan saiz sebenar dalam unit MB.',
      'Perancangan Kapasiti: Pantau kadar pertumbuhan saiz pangkalan data setiap bulan.'
    ],
    note: 'Pantau penggunaan thread untuk elak kehabisan slot.'
  });

  addCard(s, {
    x: 8.8, y: 2.1, w: 3.8, h: 4.6, topColor: C_AMBER,
    title: '3. Log & Mula Semula Selamat',
    bullets: [
      'docker stats: Memantau penggunaan CPU, RAM, dan I/O kontena tanpa memasang agen berat.',
      'docker logs --tail: Memeriksa mesej amaran InnoDB buffer, ralat crash, atau restart loop.',
      'Mula Semula Selamat: Memulakan semula kontena mengekalkan data selagi volum terikat.',
      'Pengesahan Integriti: Selepas restart, jalankan SELECT COUNT(*) untuk mengesahkan integriti.'
    ],
    note: 'Restart servis bukan bermaksud memadam data.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 01:00 - 01:03\n\nCadangan Penerangan:\nBila pengguna mengadu sistem lembap, pentadbir yang cekap tahu di mana hendak melihat.\nJangan terus reboot pelayan!\nSHOW FULL PROCESSLIST, Threads_connected, dan saiz pangkalan data adalah kompas diagnostik anda.\nMari kita laksanakan pemeriksaan operasi harian ini.');
}

// ==========================================
// SLIDE 18: Demo 5 Holding Slide
// ==========================================
{
  addDemoSlide(pptx.addSlide(), {
    num: '05',
    title: 'Diagnostik Operasi Harian & Pengesahan Mula Semula Selamat',
    duration: '7 Minit',
    commands: [
      'mariadb -u root -p\'...\' -e "SHOW FULL PROCESSLIST;"',
      'mariadb -u root -p\'...\' -e "SHOW GLOBAL STATUS LIKE \'Threads%\';"',
      'mariadb -u root -p\'...\' -e "SHOW GLOBAL STATUS LIKE \'Connections\';"',
      'docker stats --no-stream poj-mariadb',
      'docker logs --tail 30 poj-mariadb',
      'mariadb -u root -p\'...\' -e "SELECT table_schema AS db_name, ROUND(SUM(data_length+index_length)/1024/1024,2) AS size_mb FROM information_schema.tables GROUP BY table_schema;"',
      'docker restart poj-mariadb',
      'mariadb-admin -u root -p\'...\' ping',
      'mariadb -u root -p\'...\' poj_demo -e "SELECT COUNT(*) FROM service_requests;"',
      'docker ps --filter name=poj-mariadb',
      'docker volume ls --filter name=poj-mariadb-data'
    ],
    observations: [
      'Processlist: Memaparkan pengguna root dan masa pelaksanaan setiap thread aktif.',
      'Metrik Sambungan: Threads_connected bernilai rendah membuktikan sambungan ditutup dengan kemas.',
      'Saiz Storan: Pangkalan data poj_demo menggunakan ruang storan yang tepat dikira dalam MB.',
      'Log Mula Semula: Mengesahkan fasa permulaan enjin InnoDB dan kesediaan mendengar pada port 3306.',
      'Integriti Pasca-Restart: Bilangan baris rekod kekal tepat sama sebelum dan selepas mula semula.'
    ],
    outcome: 'Semua isyarat kesihatan sistem beroperasi dalam keadaan optimum dan perkhidmatan dimulakan semula dengan selamat tanpa kehilangan rekod.',
    notesText: 'Tempoh Slaid: 1 minit penerangan + 6 minit demo BetaLab\nMasa Kumulatif: 01:03 - 01:10\n\nPanduan Pengajar:\nTunjukkan PROCESSLIST dan penggunaan memori. Mulakan semula kontena MariaDB. Tunjukkan ping pelayan dan sahkan SELECT COUNT menghasilkan angka yang sama.'
  });
}

// ==========================================
// SLIDE 19: Part 6 Concepts
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'BAHAGIAN 6: PENTADBIRAN GRAFIK (GUI)', 'Papan Pemuka Grafik &mdash; phpMyAdmin', 'Visualisasi Struktur, Audit Akaun & Keselamatan Capaian Web');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.6, topColor: C_BLUE,
    title: 'ðŸ–¥ï¸ Peranan Web GUI dalam Enterprise',
    bullets: [
      'Visualisasi Skema: Memudahkan pegawai sokongan melihat hubungan jadual, struktur indeks, dan jenis medan.',
      'Eksport Pantas: Menyokong eksport data pantas dalam format CSV, PDF, dan SQL untuk semakan audit pengurusan.',
      'Pengurusan Pengguna: Memaparkan matriks keistimewaan akaun secara visual tanpa perlu menaip SHOW GRANTS.',
      'Jalankan Pertanyaan: Tab SQL interaktif dengan fungsi penyerlah sintaks (syntax highlighting).'
    ],
    note: 'Alat visualisasi yang hebat untuk semakan harian dan audit pantas.'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_AMBER,
    title: 'ðŸ”’ Pengerasan Keselamatan Web GUI',
    bullets: [
      'Rangkaian Terpencil: Jangan dedahkan phpMyAdmin terus ke internet awam &mdash; hadkan kepada VPN dalaman agensi.',
      'Penyulitan HTTPS: Proksi selamat Nginx memastikan kata laluan tidak dihantar dalam teks biasa.',
      'Keseragaman Dasar: Prinsip Least Privilege tetap terpakai sepenuhnya &mdash; log masuk poj_report dalam GUI hanya nampak poj_demo!',
      'Had Masa Sesi: Tetapkan logout automatik apabila tiada aktiviti pengguna dikesan.'
    ],
    note: 'GUI mencerminkan kebenaran pangkalan data &mdash; ia tidak memintas dasar keselamatan.'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 01:10 - 01:13\n\nCadangan Penerangan:\nAda masa pentadbir memerlukan paparan visual.\nphpMyAdmin sangat berguna untuk melihat struktur jadual atau mengeksport data laporan.\nTetapi dari sudut keselamatan, kita mesti memastikan ia dilindungi HTTPS dan dikunci di sebalik VPN.\nMari kita buka phpMyAdmin dalam pelayar makmal.');
}

// ==========================================
// SLIDE 20: Demo 6 Holding Slide
// ==========================================
{
  addDemoSlide(pptx.addSlide(), {
    num: '06',
    title: 'Penerokaan phpMyAdmin & Pembuktian Had Akaun Visual',
    duration: '7 Minit',
    commands: [
      'Semak kontena phpMyAdmin: docker ps --filter name=poj-phpmyadmin',
      'Buka pautan pelayar: https://db.{{ student_domain }}',
      'Log masuk 1 (Root): Server: poj-mariadb | User: root | Password: ...',
      'Terokai: Klik poj_demo âž¡ï¸ Klik service_requests âž¡ï¸ Tab Structure',
      'Semak Akaun: Navigasi ke tab "User Accounts" di bahagian atas',
      'Log keluar daripada sesi root',
      'Log masuk 2 (poj_report): User: poj_report | Password: ...',
      'Buktikan had visual: Hanya pangkalan data poj_demo kelihatan (tiada mysql)'
    ],
    observations: [
      'Sijil SSL: Pelayar memaparkan amaran sijil self-signed yang dilindungi proksi Nginx.',
      'Paparan Penuh Root: Akaun root dapat melihat semua pangkalan data sistem dan menu User Accounts.',
      'Sekatan Visual poj_report: Akaun laporan hanya dapat melihat poj_demo dan tiada menu pengurusan akaun.',
      'Sekatan Suntingan: Butang sunting data (Edit/Delete) dinyahdayakan atau menghasilkan ralat kebenaran.'
    ],
    outcome: 'Prinsip keistimewaan minimum (least privilege) terbukti berkuat kuasa secara seragam pada antara muka grafik web sepertimana baris arahan CLI.',
    notesText: 'Tempoh Slaid: 1 minit penerangan + 6 minit demo BetaLab\nMasa Kumulatif: 01:13 - 01:20\n\nPanduan Pengajar:\nKlik pautan phpMyAdmin. Log masuk sebagai root dan tunjukkan struktur jadual.\nKemudian log keluar dan log masuk sebagai poj_report.\nTunjukkan bahawa poj_report hanya nampak poj_demo dan tidak boleh menyunting data. Ini membuktikan integriti keselamatan.'
  });
}

// ==========================================
// SLIDE 21: Enterprise Checklist
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'PANDUAN OPERASI ENTERPRISE', 'Senarai Semak Pentadbiran MariaDB POJ', '6 Disiplin Teras untuk Melindungi Pangkalan Data Pengeluaran');

  const checkBoxes = [
    { title: '1. Kawalan Identiti & Akses', points: ['Asingkan akaun aplikasi daripada root', 'Gunakan User@Host spesifik (elak %)', 'Putar kata laluan secara berjadual', 'Jalankan audit SHOW GRANTS berkala'], color: C_BLUE },
    { title: '2. Integriti Transaksi & ACID', points: ['Kuatkuasakan enjin InnoDB lalai', 'Gunakan COMMIT & ROLLBACK', 'Buktikan indeks dengan EXPLAIN', 'Pantau saiz indeks dalam buffer pool'], color: C_TEAL },
    { title: '3. Perlindungan & Pemulihan', points: ['Gunakan --single-transaction', 'Simpan salinan dump di luar hos', 'Jalankan simulasi pulih bencana', 'Pisahkan volum data daripada kontena'], color: C_AMBER },
    { title: '4. Pemantauan & Isyarat', points: ['Pantau Threads_connected aktif', 'Semak pertanyaan lambat (slow query)', 'Kira pertumbuhan saiz data dalam MB', 'Semak log amaran kontena berkala'], color: C_PURPLE },
    { title: '5. Kawalan Perubahan Selamat', points: ['Setiap arahan ada tiket perubahan', 'Sediakan pelan undur (rollback plan)', 'Elak restart terburu-buru tanpa log', 'Uji skrip migrasi pada staging'], color: '15803D' },
    { title: '6. Pengerasan Antara Muka GUI', points: ['Kunci phpMyAdmin di sebalik VPN', 'Penyulitan penuh HTTPS/SSL', 'Tetapkan had masa sesi log masuk', 'Nyahdayakan akses terus akaun root'], color: 'DC2626' }
  ];

  checkBoxes.forEach((cb, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.7 + col * 4.05;
    const y = 2.1 + row * 2.3;

    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 3.85, h: 2.15,
      fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.12
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 3.85, h: 0.08,
      fill: { color: cb.color }, line: { color: cb.color, width: 0 }, rectRadius: 0.04
    });
    s.addText(cb.title, {
      x: x + 0.2, y: y + 0.15, w: 3.45, h: 0.35,
      fontSize: 11, bold: true, color: cb.color
    });

    const b = cb.points.map(p => ({
      text: p,
      options: { bullet: true, fontSize: 8.5, color: C_SLATE, spaceAfter: 3 }
    }));
    s.addText(b, {
      x: x + 0.2, y: y + 0.55, w: 3.45, h: 1.5,
      valign: 'top'
    });
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 4 minit\nMasa Kumulatif: 01:20 - 01:24\n\nCadangan Penerangan:\nSlaid ini merupakan rumusan praktikal yang patut digantung di meja setiap pentadbir pangkalan data di POJ.\n6 teras ini memastikan operasi berjalan lancar, mematuhi standard audit sektor awam, dan meminimumkan risiko gangguan perkhidmatan.');
}

// ==========================================
// SLIDE 22: Q&A & Feedback
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'SESI SOAL JAWAB & MAKLUM BALAS', 'Sesi Soal & Jawab & Penilaian Kursus', 'Ruang Terbuka Perbincangan Teknikal & Penilaian Peserta POJ');

  // Left card: QA Topics
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 7.2, h: 4.6,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
  });
  s.addText('ðŸ’¬ Sesi Soal & Jawab (Q&A)', {
    x: 1.0, y: 2.3, w: 6.6, h: 0.4,
    fontSize: 14, bold: true, color: C_BLUE
  });
  s.addText('Sila kemukakan sebarang persoalan berkaitan cabaran operasi pangkalan data di agensi anda, isu prestasi, atau perancangan infrastruktur:', {
    x: 1.0, y: 2.75, w: 6.6, h: 0.55,
    fontSize: 10, color: C_SLATE
  });

  const topics = [
    { num: '1', title: 'Struktur Pelayan & Enjin InnoDB', desc: 'Pemantauan buffer pool, pengoptimuman I/O, dan tetapan konfigurasi pelayan.', color: C_BLUE },
    { num: '2', title: 'Keselamatan & Kawalan Akses', desc: 'Pengasingan akaun User@Host, pematuhan audit, dan pengerasan phpMyAdmin.', color: C_TEAL },
    { num: '3', title: 'Transaksi & Prestasi Indeks', desc: 'Analisis pelan pertanyaan EXPLAIN dan penghindaran kunci jadual berpanjangan.', color: C_AMBER },
    { num: '4', title: 'Sandaran & Pemulihan Bencana', desc: 'Strategi sandaran mariadb-dump tanpa henti dan perlindungan volum Docker.', color: C_PURPLE }
  ];

  topics.forEach((t, idx) => {
    const ty = 3.4 + idx * 0.72;
    s.addShape(pptx.shapes.OVAL, {
      x: 1.0, y: ty, w: 0.45, h: 0.45,
      fill: { color: 'EFF6FF' }, line: { color: t.color, width: 1 }
    });
    s.addText(t.num, {
      x: 1.0, y: ty, w: 0.45, h: 0.45,
      fontSize: 10, bold: true, color: t.color, align: 'center', valign: 'middle'
    });
    s.addText(t.title, {
      x: 1.6, y: ty, w: 5.8, h: 0.25,
      fontSize: 10, bold: true, color: C_DARK
    });
    s.addText(t.desc, {
      x: 1.6, y: ty + 0.22, w: 5.8, h: 0.25,
      fontSize: 8.5, color: C_MUTED
    });
  });

  // Thank you box
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 6.3, w: 6.6, h: 0.35,
    fill: { color: 'F0FDF4' }, line: { color: 'BBF7D0', width: 0.8 }, rectRadius: 0.08
  });
  s.addText('Terima kasih atas kerjasama & komitmen padu warga Jabatan Kehakiman Malaysia (POJ).', {
    x: 1.0, y: 6.3, w: 6.6, h: 0.35,
    fontSize: 9, bold: true, color: '15803D', align: 'center', valign: 'middle'
  });

  // Right card: Feedback QR
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.2, y: 2.1, w: 4.4, h: 4.6,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
  });
  s.addText('Penilaian & Maklum Balas', {
    x: 8.4, y: 2.3, w: 4.0, h: 0.35,
    fontSize: 13, bold: true, color: C_DARK, align: 'center'
  });
  if (fs.existsSync(FEEDBACK_QR)) {
    s.addImage({ path: FEEDBACK_QR, x: 9.3, y: 2.75, w: 2.2, h: 2.2 });
  }
  s.addText('Sila imbas kod QR di atas menggunakan telefon pintar anda untuk mengisi borang penilaian maklum balas bengkel.', {
    x: 8.5, y: 5.05, w: 3.8, h: 0.65,
    fontSize: 9, color: C_MUTED, align: 'center'
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 9.0, y: 5.8, w: 2.8, h: 0.42,
    fill: { color: C_BLUE }, line: { color: C_BLUE, width: 0 }, rectRadius: 0.21
  });
  s.addText('Borang Maklum Balas Kursus', {
    x: 9.0, y: 5.8, w: 2.8, h: 0.42,
    fontSize: 9.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 36 minit (Soal Jawab, Perbincangan Terbuka & Borang Penilaian)\nMasa Kumulatif: 01:24 - 02:00\n\nCadangan Penerangan:\nKini kita buka ruang untuk sebarang perbincangan atau soalan teknikal berkaitan MariaDB di persekitaran POJ.\nSila luangkan masa 2 minit untuk mengimbas kod QR di sebelah kanan dan mengisi borang penilaian maklum balas.\nBagi pihak Cognitoz I.T Training, terima kasih banyak dan selamat maju jaya!');
}

const outPptx = 'D:/poj/mariadb-admin/myslides/slides.pptx';
console.log(`Writing ${totalSlides} slides to ${outPptx}...`);
await pptx.writeFile({ fileName: outPptx });
console.log('âœ… Successfully generated PowerPoint presentation:', outPptx);
