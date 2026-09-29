import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);
const PptxGenJS = require('D:/poj/mariadb-admin/node_modules/pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Cognitoz I.T Training Sdn Bhd';
pptx.company = 'Cognitoz I.T Training Sdn Bhd';
pptx.subject = 'Pentadbiran CentOS Stream 10 untuk Jabatan Kehakiman Malaysia (POJ)';
pptx.title = 'Pentadbiran CentOS Stream 10: Siasatan Sistem, Keselamatan, Storan LVM & Automasi';

const LOGO_PATH = 'D:/betalab.cognitoz.com/workshops/poj_centos/public/cognitoz-logo.png';
const STEVEN_QR = 'D:/betalab.cognitoz.com/workshops/poj_centos/public/steven-qr.png';
const FEEDBACK_QR = 'D:/betalab.cognitoz.com/workshops/poj_centos/public/feedback-qr.png';

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
const C_RED = 'DC2626';

let totalSlides = 22;
let slideIndex = 1;

function addHeader(slide, kicker, title, subtitle) {
  // Top decorative bar
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 3.33, h: 0.06, fill: { color: C_PURPLE } });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 3.33, y: 0, w: 3.33, h: 0.06, fill: { color: C_BLUE } });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 6.66, y: 0, w: 3.33, h: 0.06, fill: { color: C_TEAL } });
  slide.addShape(pptx.shapes.RECTANGLE, { x: 9.99, y: 0, w: 3.34, h: 0.06, fill: { color: C_AMBER } });

  // Logo top left
  if (fs.existsSync(LOGO_PATH)) {
    slide.addImage({ path: LOGO_PATH, x: 0.7, y: 0.22, w: 1.6, h: 0.45 });
  }

  // Top pill badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.6, y: 0.25, w: 4.0, h: 0.38,
    fill: { color: 'FFFFFF' },
    line: { color: C_BORDER, width: 1 },
    rectRadius: 0.18
  });
  slide.addText('CentOS Stream 10  |  POJ Putrajaya', {
    x: 8.6, y: 0.25, w: 4.0, h: 0.38,
    fontSize: 9, bold: true, color: C_PURPLE, align: 'center', valign: 'middle'
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
    fontSize: 21, bold: true, color: C_DARK
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

  slide.addText('Copyright © 2026 Cognitoz I.T Training Sdn Bhd — www.cognitoz.com', {
    x: 4.8, y: 7.05, w: 5.5, h: 0.35,
    fontSize: 8.5, color: C_MUTED, align: 'center'
  });

  slide.addText(`${currentNum} / ${totalSlides}`, {
    x: 10.5, y: 7.05, w: 2.1, h: 0.35,
    fontSize: 9, color: C_MUTED, align: 'right', bold: true
  });
}

function addCard(slide, { x, y, w, h, topColor, title, bullets, note }) {
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
  addHeader(slide, `DEMO MAKMAL ${num} (BETALAB)`, title, 'Peralihan Terus ke Terminal Interaktif: Amali Berasaskan Senario Nyata');

  // Left card: Commands
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 5.8, h: 4.4,
    fill: { color: 'FFFFFF' }, line: { color: 'BAE6FD', width: 1.5 }, rectRadius: 0.15
  });
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 5.8, h: 0.45,
    fill: { color: 'E0F2FE' }, line: { color: 'BAE6FD', width: 0 }, rectRadius: 0.15
  });
  slide.addText(`ARAHAN TERMINAL BETALAB (LANGKAH ${num})`, {
    x: 0.9, y: 2.15, w: 5.4, h: 0.35,
    fontSize: 10, bold: true, color: '0369A1'
  });

  const cmdFormatted = commands.map((c, idx) => ({
    text: `${idx + 1}.  ${c}\n`,
    options: { fontSize: 9.5, fontFace: 'Consolas', color: '0F172A', lineSpacing: 18 }
  }));
  slide.addText(cmdFormatted, {
    x: 0.9, y: 2.65, w: 5.4, h: 3.6, valign: 'top'
  });

  // Right card: Observations & Verification
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.4,
    fill: { color: 'FFFFFF' }, line: { color: 'BBF7D0', width: 1.5 }, rectRadius: 0.15
  });
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.8, y: 2.1, w: 5.8, h: 0.45,
    fill: { color: 'DCFCE7' }, line: { color: 'BBF7D0', width: 0 }, rectRadius: 0.15
  });
  slide.addText(`TITIK PEMERHATIAN & VERIFIKASI BUKTI`, {
    x: 7.0, y: 2.15, w: 5.4, h: 0.35,
    fontSize: 10, bold: true, color: '15803D'
  });

  const obsFormatted = observations.map(o => ({
    text: o,
    options: { bullet: true, fontSize: 9.5, color: C_SLATE, spaceAfter: 8, lineSpacing: 14 }
  }));
  slide.addText(obsFormatted, {
    x: 7.0, y: 2.65, w: 5.4, h: 2.7, valign: 'top'
  });

  // Bottom Outcome Pill
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.0, y: 5.5, w: 5.4, h: 0.75,
    fill: { color: 'F0FDF4' }, line: { color: '86EFAC', width: 1 }, rectRadius: 0.1
  });
  slide.addText(`HASIL & BUKTI: ${outcome}`, {
    x: 7.15, y: 5.5, w: 5.1, h: 0.75,
    fontSize: 9, bold: true, color: '166534', valign: 'middle'
  });

  addFooter(slide, slideIndex++);
  if (notesText) slide.addNotes(notesText);
}

console.log('Building PowerPoint presentation for CentOS Stream 10 Administration...');

// ==========================================
// SLIDE 1: Cover Slide
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };

  // Top decorative bar
  s.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 3.33, h: 0.08, fill: { color: C_PURPLE } });
  s.addShape(pptx.shapes.RECTANGLE, { x: 3.33, y: 0, w: 3.33, h: 0.08, fill: { color: C_BLUE } });
  s.addShape(pptx.shapes.RECTANGLE, { x: 6.66, y: 0, w: 3.33, h: 0.08, fill: { color: C_TEAL } });
  s.addShape(pptx.shapes.RECTANGLE, { x: 9.99, y: 0, w: 3.34, h: 0.08, fill: { color: C_AMBER } });

  // Top logo
  if (fs.existsSync(LOGO_PATH)) {
    s.addImage({ path: LOGO_PATH, x: 0.8, y: 0.35, w: 2.0, h: 0.55 });
  }

  // Header pill badge
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 8.5, y: 0.4, w: 4.1, h: 0.42,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.21
  });
  s.addText('CentOS Stream 10  |  Enterprise Linux', {
    x: 8.5, y: 0.4, w: 4.1, h: 0.42,
    fontSize: 9.5, bold: true, color: C_PURPLE, align: 'center', valign: 'middle'
  });

  // Title & Subtitle
  s.addText('PENTADBIRAN CENTOS STREAM 10 MODEN', {
    x: 0.8, y: 1.45, w: 11.7, h: 0.7,
    fontSize: 27, bold: true, color: C_DARK
  });
  s.addText('Siasatan Sistem, Keselamatan, Storan LVM & Automasi Operasi', {
    x: 0.8, y: 2.2, w: 11.7, h: 0.45,
    fontSize: 15, bold: true, color: C_BLUE
  });

  // Meta Badges
  const badges = [
    { text: 'POJ Putrajaya', bg: 'EFF6FF', color: '1D4ED8' },
    { text: '29 September 2026', bg: 'ECFDF5', color: '047857' },
    { text: '120 Minit (Teori + Amali)', bg: 'F5F3FF', color: '6D28D9' },
    { text: 'Anjuran Cognitoz', bg: 'F8FAFC', color: '334155' }
  ];
  badges.forEach((b, idx) => {
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.8 + idx * 2.8, y: 2.85, w: 2.65, h: 0.4,
      fill: { color: b.bg }, line: { color: 'CBD5E1', width: 0.8 }, rectRadius: 0.08
    });
    s.addText(b.text, {
      x: 0.8 + idx * 2.8, y: 2.85, w: 2.65, h: 0.4,
      fontSize: 9.5, bold: true, color: b.color, align: 'center', valign: 'middle'
    });
  });

  // 3 Overview Cards
  const cards = [
    { title: '[1] Diagnostik systemd & journalctl', desc: 'Siasatan punca kegagalan servis berpandukan bukti telemetri rasmi, status unit PID 1, dan analisis log masa nyata.', color: C_BLUE },
    { title: '[2] Keselamatan Pengguna & Sudo (RBAC)', desc: 'Penguatkuasaan dasar Least Privilege, kawalan direktori kehakiman dengan setgid 2770, dan sekatan hak akses sudoers terperinci.', color: C_TEAL },
    { title: '[3] Storan LVM, Firewall & Cron', desc: 'Pengurusan storan anjal PV/VG/LV dengan pembesaran online XFS, kawalan keselamatan firewalld, dan automasi sandaran berkala.', color: C_PURPLE }
  ];
  cards.forEach((c, idx) => {
    const x = 0.8 + idx * 3.85;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 3.55, w: 3.65, h: 2.9,
      fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 3.55, w: 3.65, h: 0.08,
      fill: { color: c.color }, line: { color: c.color, width: 0 }, rectRadius: 0.04
    });
    s.addText(c.title, {
      x: x + 0.25, y: 3.8, w: 3.15, h: 0.45,
      fontSize: 12, bold: true, color: c.color
    });
    s.addText(c.desc, {
      x: x + 0.25, y: 4.35, w: 3.15, h: 1.8,
      fontSize: 10, color: C_SLATE, lineSpacing: 16
    });
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:00 - 00:02\n\nSelamat petang dan salam sejahtera kepada warga Jabatan Kehakiman Malaysia (POJ Putrajaya).\nSelamat datang ke bengkel "Pentadbiran CentOS Stream 10: Siasatan Sistem, Keselamatan, Storan LVM & Automasi."\nNama saya Steven Nagendran daripada Cognitoz I.T Training.\nSesi 2 jam ini dirangka khas untuk pentadbir sistem dengan pendekatan amali berasaskan bukti kukuh.');
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
    '22+ Tahun Pengalaman Industri dalam reka bentuk seni bina pusat data, kejuruteraan sistem operasi Linux enterprise, dan keselamatan pelayan kerajaan.',
    'Telah membimbing ribuan pentadbir sistem daripada pelbagai agensi sektor awam Malaysia, institusi kehakiman, perbankan, dan syarikat GLC.',
    'Pakar merentasi ekosistem Enterprise Linux (CentOS/RHEL), Windows Server, Kubernetes, dan automasi Ansible bertaraf produksi.',
    'Fokus Latihan POJ: Membina keupayaan menyiasat dan menyelesaikan isu sistem berdasarkan bukti telemetri — pantas, selamat, dan berintegriti.'
  ];
  const formattedBullets = profileBullets.map(b => ({
    text: b,
    options: { bullet: true, fontSize: 10, color: C_SLATE, spaceAfter: 10, lineSpacing: 15 }
  }));
  s.addText(formattedBullets, {
    x: 0.95, y: 2.85, w: 7.1, h: 3.6, valign: 'top'
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
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 00:02 - 00:04\n\nPerkongsian hari ini menggabungkan amalan pentadbiran CentOS Stream 10 bertaraf enterprise dengan automasi dan standard keselamatan sektor awam.');
}

// ==========================================
// SLIDE 3: Workshop Journey (120 Mins)
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'ALIRAN BENGKEL 120 MINIT', 'Perjalanan Pembelajaran & Agihan Masa', '5 Modul Teori & Praktikal Disusun Mengikut Fasa Pentadbiran Enterprise');

  const timeline = [
    { part: 'MODUL 1', time: '25 MIN', title: 'systemd & Triage', points: ['Seni bina PID 1 & cgroups', 'Analisis log journalctl -u', 'Siasatan exit-code & crash', 'Demo 1: Triage servis gagal'], color: C_BLUE },
    { part: 'MODUL 2', time: '25 MIN', title: 'Akaun & Sudo', points: ['Kumpulan wheel & PAM auth', 'SetGID 2770 kolaborasi fail', 'Granular sudoers.d RBAC', 'Demo 2: Sekatan hak akses'], color: C_TEAL },
    { part: 'MODUL 3', time: '25 MIN', title: 'Storan Dinamik LVM', points: ['Lapisan PV, VG, dan LV', 'Sistem fail moden XFS', 'Pembesaran volum online', 'Demo 3: lvextend & xfs_growfs'], color: C_AMBER },
    { part: 'MODUL 4 & 5', time: '45 MIN', title: 'Sekuriti & Automasi', points: ['Audit port ss -tulpn', 'firewalld Rich Rules', 'Audit integriti rpm -V', 'Demo 4 & 5: Firewall & Cron'], color: C_PURPLE },
  ];

  timeline.forEach((t, idx) => {
    const x = 0.7 + idx * 3.05;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.1, w: 2.85, h: 4.4,
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
      fontSize: 11.5, bold: true, color: C_DARK, align: 'center'
    });

    const b = t.points.map(p => ({
      text: p,
      options: { bullet: true, fontSize: 9, color: C_SLATE, spaceAfter: 6 }
    }));
    s.addText(b, {
      x: x + 0.15, y: 3.3, w: 2.55, h: 3.0, valign: 'top'
    });
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 00:04 - 00:07\n\nKita membahagikan 120 minit ini kepada 5 bahagian penting. Setiap modul akan diiringi sesi hands-on di terminal.');
}

// ==========================================
// SLIDE 4: Lab Topology
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'SENIBINA INFRASTRUKTUR MAKMAL', 'Topologi Persekitaran Amali POJ', 'Setiap Peserta Memperolehi Persekitaran Dedicated yang Diasingkan');

  // Left card: Architecture Flow
  addCard(s, {
    x: 0.7, y: 2.1, w: 6.8, h: 4.6, topColor: C_BLUE,
    title: 'Aliran Sambungan Peserta ke Cloud Sandbox',
    bullets: [
      'Pelayar Web Pelatih mengakses portal Educates BetaLab dengan konsol terminal & tab latihan interaktif.',
      'Sesi disambungkan secara telus melalui mTLS/SSH ke VM Khusus CentOS Stream 10 di DigitalOcean Datacenter.',
      'Setiap VM mempunyai IP Awam tersendiri dan DNS unik (contoh: ssh.stu01.steven.asia).',
      'Pengasingan Penuh: Setiap peserta menguruskan peranti blok, firewall, perkhidmatan, dan akaun tanpa gangguan rakan lain.'
    ],
    note: 'Infrastruktur dipacu sepenuhnya oleh Automasi Ansible & DigitalOcean API'
  });

  // Right card: System Specs
  addCard(s, {
    x: 7.8, y: 2.1, w: 4.8, h: 4.6, topColor: C_TEAL,
    title: 'Spesifikasi Mesin Maya Pelatih',
    bullets: [
      'Sistem Operasi: CentOS Stream 10 (Kernel 6.x x86_64)',
      'Perkakasan Maya: 2 vCPU, 4GB Memory, 50GB NVMe SSD',
      'Peranti Storan Tambahan: 2GB Raw Disk Loopback untuk LVM',
      'Akaun Pentadbir: droot (Ahli kumpulan wheel dengan sudo)',
      'Perkhidmatan Utama: systemd v255, firewalld, nginx, cronie, lvm2'
    ],
    note: 'Persekitaran Enterprise tulen — tiada had emulasi kontena'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 00:07 - 00:10\n\nSetiap pelatih mempunyai satu droplet penuh CentOS Stream 10. Anda mempunyai hak penuh pengurusan kernel dan storan.');
}

// ==========================================
// SLIDE 5: Module 1 - systemd Architecture
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'MODUL 1: PENGURUSAN SISTEM', 'Seni Bina systemd & Pengurusan Servis', 'Sistem Pengurusan Unit, Proses PID 1, dan Kawalan Sumber cgroups');

  addCard(s, {
    x: 0.7, y: 2.1, w: 3.7, h: 4.6, topColor: C_BLUE,
    title: 'systemd Sebagai PID 1',
    bullets: [
      'Memulakan keseluruhan sistem selepas kernel Linux boot.',
      'Menghapuskan skrip init SysV legasi yang perlahan.',
      'Menyokong pemulaan servis secara selari (parallel activation).',
      'Mengurus dependensi kompleks antara unit servis rangkaian, storan, dan soket.'
    ],
    note: 'Standard de-facto merentasi semua distro RHEL / CentOS moden'
  });

  addCard(s, {
    x: 4.8, y: 2.1, w: 3.7, h: 4.6, topColor: C_TEAL,
    title: 'Jenis-jenis Unit Utama',
    bullets: [
      '.service: Mengurus aplikasi / daemon latar belakang.',
      '.socket: Pengaktifan berasaskan sambungan port rangkaian.',
      '.target: Kumpulan unit bagi menentukan runlevel sistem (cth: multi-user.target).',
      '.timer: Pengganti moden untuk cron dengan ketepatan mikrosaat.'
    ],
    note: 'Fail konfigurasi berada di /usr/lib/systemd/ dan /etc/systemd/'
  });

  addCard(s, {
    x: 8.9, y: 2.1, w: 3.7, h: 4.6, topColor: C_PURPLE,
    title: 'Kawalan Sumber (cgroups v2)',
    bullets: [
      'systemd mengelompokkan setiap proses ke dalam cgroup tersendiri.',
      'Mengelakkan proses "orphan" daripada tergantung apabila servis dihentikan.',
      'Membolehkan had penggunaan memori dan CPU dikuatkuasakan secara dinamik.',
      'Semak hierarki menggunakan perintah: systemd-cgls'
    ],
    note: 'Integriti proses terjamin walaupun aplikasi mengalami crash'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 00:10 - 00:15\n\nsystemd adalah nadi sistem operasi. Ia menguruskan segala-galanya daripada perkhidmatan hinggalah kawalan memori.');
}

// ==========================================
// SLIDE 6: 5-Step Triage Methodology
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'METODOLOGI PENTADBIRAN', 'Metodologi Siasatan 5-Langkah (5-Step Triage)', 'Pendekatan Sistematik Menyelesaikan Isu Servis Gagal Tanpa Meneka');

  const steps = [
    { num: '1', title: 'Semak Status Unit', desc: 'systemctl status <unit> — kenal pasti status Active, SubState, Main PID, dan kod keluar (ExitCode).', color: C_BLUE },
    { num: '2', title: 'Ekstrak Log Bukti', desc: 'journalctl -u <unit> -e -n 50 — tapis mesej ralat khusus, baris konfigurasi rosak, atau port bertindih.', color: C_TEAL },
    { num: '3', title: 'Audit Fail Konfigurasi', desc: 'Semak sintaks fail di /etc/systemd/system/ atau fail drop-in override /etc/systemd/system/<unit>.d/.', color: C_AMBER },
    { num: '4', title: 'Muat Semula Daemon', desc: 'systemctl daemon-reload — wajib dijalankan setiap kali fail unit diubah suai pada cakera.', color: C_PURPLE },
    { num: '5', title: 'Uji & Sahkan Status', desc: 'systemctl restart <unit> dan sahkan dengan systemctl is-active bagi memastikan servis stabil.', color: C_RED }
  ];

  steps.forEach((st, idx) => {
    const y = 2.1 + idx * 0.92;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.7, y, w: 11.9, h: 0.8,
      fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.1
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.85, y: y + 0.15, w: 0.5, h: 0.5,
      fill: { color: st.color }, line: { color: st.color, width: 0 }, rectRadius: 0.1
    });
    s.addText(st.num, {
      x: 0.85, y: y + 0.15, w: 0.5, h: 0.5,
      fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
    s.addText(st.title, {
      x: 1.5, y: y + 0.12, w: 4.0, h: 0.3,
      fontSize: 12, bold: true, color: st.color
    });
    s.addText(st.desc, {
      x: 1.5, y: y + 0.42, w: 10.8, h: 0.3,
      fontSize: 9.5, color: C_SLATE
    });
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 00:15 - 00:20\n\nJangan terus merestart servis berulang kali secara rawak. Gunakan kaedah 5-Langkah ini untuk mengesan punca sebenar.');
}

// ==========================================
// SLIDE 7: journalctl Telemetry
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'TELEMETRI & AUDIT SISTEM', 'Analisis Log dengan journalctl', 'Sistem Pengelogan Berstruktur Berasaskan Binari Pantas dan Berindeks');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Kelebihan Jurnal Binari systemd',
    bullets: [
      'Log disimpan dalam format binari terindeks untuk carian pantas.',
      'Melampirkan metadata lengkap bagi setiap entri: UID, PID, Unit Name, Boot ID, dan timestamp mikro.',
      'Mencegah manipulasi teks log biasa secara senyap oleh pihak tidak dibenarkan.',
      'Menyokong penapisan pantas mengikut tahap keutamaan (priority): emerg, alert, crit, err, warning, notice, info, debug.'
    ],
    note: 'Lokasi fail log kekal: /var/log/journal/'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_PURPLE,
    title: 'Perintah Penting Pentadbir Sistem',
    bullets: [
      'journalctl -u nginx.service : Papar log bagi satu unit sahaja.',
      'journalctl -u nginx -f : Ikuti log baharu secara masa nyata (follow mode).',
      'journalctl -p err..emerg : Tapis mesej ralat kritikal sahaja.',
      'journalctl --since "1 hour ago" : Tapis log dalam tempoh masa tertentu.',
      'journalctl -b : Papar log bermula daripada sesi boot terkini.',
      'journalctl --disk-usage : Semak saiz ruang cakera yang digunakan oleh log.'
    ],
    note: 'Gunakan bersama flag -e untuk terus lompat ke baris terakhir'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 00:20 - 00:25\n\njournalctl membolehkan kita menapis log dengan tepat tanpa perlu membuka fail teks yang besar menggunakan grep atau tail.');
}

// ==========================================
// SLIDE 8: Demo 1 - Failed Service Triage
// ==========================================
addDemoSlide(pptx.addSlide(), {
  num: 1,
  title: 'Siasatan & Pemulihan Servis Gagal (poj-case-monitor)',
  duration: '10 Minit',
  commands: [
    'systemctl status poj-case-monitor.service',
    'journalctl -u poj-case-monitor -n 20 --no-pager',
    'cat /etc/poj/case-monitor.conf',
    'sudo sed -i \'s/PORT=99999/PORT=8088/\' /etc/poj/case-monitor.conf',
    'sudo systemctl restart poj-case-monitor.service',
    'systemctl is-active poj-case-monitor.service'
  ],
  observations: [
    'Status unit menunjukkan "failed (Result: exit-code)".',
    'Log journalctl membuktikan ralat: "FATAL: Port 99999 out of range (1-65535)".',
    'Konfigurasi diubah daripada port tidak sah 99999 kepada port selamat 8088.',
    'Servis berjaya direstart dan kembali ke status "active (running)".'
  ],
  outcome: 'Servis poj-case-monitor pulih sepenuhnya dengan bukti status Active & Listening pada port 8088.',
  notesText: 'Tempoh Slaid: 10 minit\nMasa Kumulatif: 00:25 - 00:35\n\nSila beralih ke terminal masing-masing dan mulakan Latihan 1.'
});

// ==========================================
// SLIDE 9: Module 2 - Security & Least Privilege
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'MODUL 2: KAWALAN KESELAMATAN', 'Pengurusan Pengguna, Sudo & Prinsip Least Privilege', 'Mencegah Kompromi Menyeluruh dengan Sekatan Hak Akses Berpusat');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Prinsip Least Privilege dalam Linux',
    bullets: [
      'Tiada pengguna patut dibenarkan log masuk terus sebagai akaun root.',
      'Setiap pegawai kehakiman / operator sistem mempunyai akaun peribadi untuk jejak audit (non-repudiation).',
      'Penggunaan sudo merekodkan setiap arahan berkeistimewaan ke dalam log audit /var/log/secure.',
      'Sekatan skop arahan: Benarkan hanya arahan yang diperlukan untuk tugas hakiki.'
    ],
    note: 'Amalan wajib bagi pematuhan pekeliling keselamatan ICT kerajaan'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'Kumpulan Khas "wheel" dalam CentOS/RHEL',
    bullets: [
      'CentOS dan Red Hat menggunakan kumpulan wheel untuk kawalan pentadbir (bukan kumpulan sudo seperti Ubuntu/Debian).',
      'Modul PAM (pam_wheel.so) menguatkuasakan kawalan sama ada pengguna boleh menukar identiti kepada root (su -).',
      'Akaun pelatih "droot" didaftarkan dalam kumpulan wheel dengan akses sudo terkawal.',
      'Sudo modular: Gunakan direktori /etc/sudoers.d/ dan elakkan menyunting /etc/sudoers secara terus.'
    ],
    note: 'Sentiasa gunakan visudo -cf untuk menyemak sintaks sebelum simpan'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 00:35 - 00:40\n\nDalam CentOS, standard keselamatan adalah menggunakan kumpulan wheel dan fail modular di /etc/sudoers.d/.');
}

// ==========================================
// SLIDE 10: Special Permission - SetGID (2770)
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'KEBENARAN KHAS DIREKTORI', 'Kolaborasi Fail Kehakiman dengan SetGID (2770)', 'Memastikan Setiap Fail Baharu Mewarisi Pemilikan Kumpulan Secara Automatik');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Isu Tradisional Perkongsian Fail',
    bullets: [
      'Secara lalai, apabila pengguna A mencipta fail, kumpulan fail tersebut adalah kumpulan utama pengguna A.',
      'Pengguna B dalam kumpulan yang sama tidak dapat menyunting fail tersebut jika kebenaran kumpulan terhad.',
      'Menyebabkan pentadbir sistem terpaksa kerap menjalankan arahan chown/chmod secara manual.',
      'Risiko keselamatan tinggi apabila kebenaran terpaksa dilonggarkan kepada 777.'
    ],
    note: 'Kebenaran 777 adalah pelanggaran keselamatan serius!'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'Penyelesaian SetGID (Bit 2 di Hadapan)',
    bullets: [
      'chmod 2770 /opt/poj/dokumen_kehakiman',
      'Kesan SetGID: Mana-mana fail baharu yang dicipta di dalam folder ini akan mewarisi kumpulan direktori tersebut secara automatik.',
      'Nilai Kebenaran 2770 bermaksud:',
      '  • 2: Bit SetGID aktif (drwxrws---)',
      '  • 7: Pemilik ada hak baca, tulis, laksana (rwx)',
      '  • 7: Kumpulan kehakiman ada hak penuh (rwx)',
      '  • 0: Pengguna lain tiada sebarang akses (---)'
    ],
    note: 'Integriti dan kerahsiaan dokumen kehakiman terjamin 100%'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 00:40 - 00:45\n\nSetGID menyelesaikan masalah kolaborasi berkumpulan tanpa perlu campur tangan pentadbir setiap kali ada fail baharu.');
}

// ==========================================
// SLIDE 11: Granular Sudoers
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'KAWALAN SUDO TERPERINCI', 'Konfigurasi Sudoers Berbutir Halus (Granular RBAC)', 'Menghadkan Hak Pelaksanaan Arahan Tertentu Sahaja Tanpa Kata Laluan');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Anatomi Baris Konfigurasi Sudo',
    bullets: [
      'Format asas: Pengguna Hos = (PenggunaSasaran) Arahan',
      'Contoh: audit_officer ALL=(ALL) /bin/journalctl',
      'NOPASSWD: Membenarkan pelaksanaan tanpa meminta kata laluan (sesuai untuk skrip automasi dan pemantauan).',
      'Larangan Wildcard Bahaya: Jangan sesekali letakkan arahan seperti /bin/bash, /bin/sh, atau /usr/bin/vim dalam senarai sudo NOPASSWD kerana pengguna boleh escape shell.'
    ],
    note: 'Fail konfigurasi disimpan di: /etc/sudoers.d/audit_officer'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_PURPLE,
    title: 'Amalan Terbaik Pentadbiran Sudo',
    bullets: [
      '1. Sentiasa cipta fail berasingan di /etc/sudoers.d/ mengikut fungsi tugas atau nama perkhidmatan.',
      '2. Tetapkan kebenaran fail kepada 0440 (hanya root boleh baca): chmod 0440 /etc/sudoers.d/audit_officer',
      '3. Uji integriti sintaks sebelum keluar: sudo visudo -cf /etc/sudoers.d/audit_officer',
      '4. Pantau log percubaan akses tidak sah dalam /var/log/secure.'
    ],
    note: 'Satu kesilapan sintaks dalam sudoers boleh mengunci akses sistem!'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 00:45 - 00:50\n\nGranular sudo membolehkan pegawai audit menyemak log tanpa membenarkan mereka mengubah fail sistem.');
}

// ==========================================
// SLIDE 12: Demo 2 - Users & Sudo RBAC
// ==========================================
addDemoSlide(pptx.addSlide(), {
  num: 2,
  title: 'Pengurusan Akaun & Kuatkuasa Granular Sudo',
  duration: '10 Minit',
  commands: [
    'sudo groupadd kehakiman',
    'sudo useradd -m -G kehakiman audit_user',
    'sudo chmod 2770 /opt/poj/dokumen_kehakiman',
    'sudo chown root:kehakiman /opt/poj/dokumen_kehakiman',
    'echo "audit_user ALL=(ALL) NOPASSWD: /bin/journalctl" | sudo tee /etc/sudoers.d/audit_user',
    'sudo chmod 0440 /etc/sudoers.d/audit_user',
    'sudo -u audit_user sudo -l'
  ],
  observations: [
    'Akaun audit_user didaftarkan dan dimasukkan ke kumpulan kehakiman.',
    'Direktori dokumen mempunyai atribut permissions: drwxrws---.',
    'Ujian sudo -l bagi audit_user membuktikan kebenaran terhad kepada /bin/journalctl sahaja.',
    'Percubaan menjalankan arahan selain yang dibenarkan akan ditolak oleh sudo.'
  ],
  outcome: 'Penguatkuasaan RBAC dan SetGID berjaya disahkan melalui bukti audit sudo.',
  notesText: 'Tempoh Slaid: 10 minit\nMasa Kumulatif: 00:50 - 01:00\n\nMari kita jalankan Latihan 2 di terminal.'
});

// ==========================================
// SLIDE 13: Module 3 - Dynamic Storage (LVM)
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'MODUL 3: PENGURUSAN STORAN', 'Seni Bina Storan Dinamik (LVM)', 'Lapisan Abstraksi Storan Fleksibel untuk Pusat Data Perusahaan');

  addCard(s, {
    x: 0.7, y: 2.1, w: 3.7, h: 4.6, topColor: C_BLUE,
    title: '1. Physical Volume (PV)',
    bullets: [
      'Cakera fizikal atau partisyen sebenar (cth: /dev/sdb, /dev/nvme0n1).',
      'Diinisialisasikan dengan perintah: pvcreate /dev/sdb',
      'Dibahagikan kepada blok kecil dipanggil Physical Extents (PE), biasanya bersaiz 4MB.',
      'Asas kepada penggabungan beberapa cakera fizikal menjadi satu kolam storan.'
    ],
    note: 'Semak dengan: pvs atau pvdisplay'
  });

  addCard(s, {
    x: 4.8, y: 2.1, w: 3.7, h: 4.6, topColor: C_TEAL,
    title: '2. Volume Group (VG)',
    bullets: [
      'Kolam storan (storage pool) yang menggabungkan satu atau lebih PV.',
      'Dicipta dengan perintah: vgcreate vg_data /dev/sdb',
      'Membolehkan kapasiti storan ditambah pada bila-bila masa dengan hanya menambah PV baharu: vgextend vg_data /dev/sdc.',
      'Menghapuskan had kapasiti satu cakera fizikal.'
    ],
    note: 'Semak dengan: vgs atau vgdisplay'
  });

  addCard(s, {
    x: 8.9, y: 2.1, w: 3.7, h: 4.6, topColor: C_PURPLE,
    title: '3. Logical Volume (LV)',
    bullets: [
      'Partisyen maya yang diperuntukkan daripada Volume Group.',
      'Dicipta dengan perintah: lvcreate -L 1G -n lv_kes vg_data',
      'Berfungsi seperti peranti blok standard (/dev/vg_data/lv_kes).',
      'Boleh dibesarkan atau dikecilkan mengikut keperluan tanpa memformat semula.'
    ],
    note: 'Semak dengan: lvs atau lvdisplay'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 01:00 - 01:05\n\nLVM memberikan fleksibiliti mutlak. Kita boleh membesarkan storan pangkalan data atau fail kehakiman tanpa mengganggu operasi sistem.');
}

// ==========================================
// SLIDE 14: XFS Filesystem & Online Expansion
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'SISTEM FAIL ENTERPRISE', 'Sistem Fail XFS & Pembesaran Secara Langsung', 'Teknologi Sistem Fail Berprestasi Tinggi dengan Ciri Zero-Downtime Expansion');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Mengapa XFS Pilihan Utama RHEL/CentOS?',
    bullets: [
      'Direka khas untuk beban kerja I/O selari berskala besar (parallel I/O).',
      'Menyokong saiz fail dan sistem fail sehingga ratusan Terabyte tanpa degradasi prestasi.',
      'Menggunakan teknologi journaling pantas untuk pemulihan integriti segera sekiranya bekalan elektrik terputus.',
      'Sistem fail default untuk CentOS Stream 10 dan Red Hat Enterprise Linux.'
    ],
    note: 'Format peranti dengan: mkfs.xfs /dev/vg_data/lv_kes'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'Pembesaran Online (Zero Downtime)',
    bullets: [
      'Langkah 1: Besarkan volum logikal LVM:',
      '  sudo lvextend -L +500M /dev/vg_data/lv_kes',
      'Langkah 2: Besarkan sistem fail XFS secara langsung semasa volum sedang di-mount:',
      '  sudo xfs_growfs /mnt/data_kes',
      'Atau gunakan flag pintar yang melaksanakan kedua-dua langkah serentak:',
      '  sudo lvextend -L +500M -r /dev/vg_data/lv_kes',
      'Perhatian Penting: Sistem fail XFS boleh dibesarkan secara online, tetapi TIDAK boleh dikecilkan (cannot shrink).'
    ],
    note: 'Tiada unmount diperlukan — perkhidmatan kekal aktif!'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 01:05 - 01:10\n\nCiri xfs_growfs membolehkan storan pangkalan data dibesarkan ketika pengguna sedang menggunakan sistem.');
}

// ==========================================
// SLIDE 15: Demo 3 - Storage & LVM Expansion
// ==========================================
addDemoSlide(pptx.addSlide(), {
  num: 3,
  title: 'Konfigurasi LVM & Pembesaran Storan XFS Online',
  duration: '10 Minit',
  commands: [
    'sudo pvcreate /dev/loop0',
    'sudo vgcreate vg_poj /dev/loop0',
    'sudo lvcreate -L 800M -n lv_dokumen vg_poj',
    'sudo mkfs.xfs /dev/vg_poj/lv_dokumen',
    'sudo mount /dev/vg_poj/lv_dokumen /opt/poj/dokumen_kehakiman',
    'df -hT /opt/poj/dokumen_kehakiman',
    'sudo lvextend -L +400M -r /dev/vg_poj/lv_dokumen',
    'df -hT /opt/poj/dokumen_kehakiman'
  ],
  observations: [
    'PV dan VG berjaya dicipta menggunakan peranti blok loopback.',
    'LV bersaiz 800MB diformat dengan sistem fail XFS dan di-mount.',
    'Arahan lvextend -r membesarkan LV ke 1.2GB dan terus membesarkan XFS.',
    'Output df -hT membuktikan kapasiti meningkat serta-merta tanpa unmount.'
  ],
  outcome: 'Storan kehakiman dibesarkan secara langsung daripada 800MB ke 1.2GB dengan status Clean.',
  notesText: 'Tempoh Slaid: 10 minit\nMasa Kumulatif: 01:10 - 01:20\n\nSila buka terminal dan jalankan Latihan 3.'
});

// ==========================================
// SLIDE 16: Module 4 - Network Security & firewalld
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'MODUL 4: KESELAMATAN RANGKAIAN', 'Pengurusan Port Rangkaian & firewalld', 'Audit Port Aktif dan Pengurusan Tembok Api Dinamik Berasaskan Zon');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Audit Port Rangkaian dengan ss',
    bullets: [
      'Perintah ss (socket statistics) menggantikan perintah netstat legasi.',
      'Sintaks standard: ss -tulpn',
      '  • -t : Port TCP sahaja',
      '  • -u : Port UDP sahaja',
      '  • -l : Port yang sedang mendengar (listening)',
      '  • -p : Papar nama proses dan PID pemilik port',
      '  • -n : Papar nombor port tanpa resolusi DNS perlahan',
      'Penting: Kenal pasti sebarang port terdedah sebelum mengaktifkan tembok api.'
    ],
    note: 'Jalankan audit berkala untuk mengesan port mencurigakan'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'Konsep Zon firewalld',
    bullets: [
      'firewalld adalah daemon dinamik yang menguruskan peraturan nftables.',
      'Berasaskan konsep Zon: public, internal, trusted, drop, dmz.',
      'Setiap antaramuka rangkaian (cth: eth0) diletakkan di bawah satu zon aktif.',
      'Zon "public" biasanya menjadi zon lalai bagi pelayan.',
      'Perubahan peraturan boleh dibuat serta-merta tanpa memutuskan sambungan aktif sedia ada.'
    ],
    note: 'Status semasa disemak dengan: sudo firewall-cmd --state'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 01:20 - 01:25\n\nDalam CentOS, kita menggunakan ss untuk audit dan firewalld untuk kawalan akses port.');
}

// ==========================================
// SLIDE 17: firewalld Rich Rules
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'PERATURAN KAYA TEMBOK API', 'Mengurus firewalld & Peraturan Kaya (Rich Rules)', 'Kawalan Trafik Berbutir Halus Berdasarkan IP Sumber, Port, dan Had Sambungan');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Peraturan Standard vs Peraturan Kekal',
    bullets: [
      'Peraturan Runtime: Berkuat kuasa serta-merta tetapi hilang selepas pelayan reboot.',
      'Peraturan Permanent (--permanent): Disimpan ke cakera tetapi memerlukan reload untuk aktif.',
      'Amalan Terbaik: Jalankan arahan dengan --permanent kemudian laksanakan: sudo firewall-cmd --reload',
      'Membuka perkhidmatan standard:',
      '  sudo firewall-cmd --add-service=http --permanent',
      '  sudo firewall-cmd --add-port=8088/tcp --permanent'
    ],
    note: 'Sentiasa sahkan dengan: sudo firewall-cmd --list-all'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_PURPLE,
    title: 'Kelebihan Rich Rules',
    bullets: [
      'Membolehkan penetapan syarat logik kompleks dalam satu peraturan.',
      'Mengehadkan akses servis hanya daripada subnet IP yang dibenarkan:',
      '  rule family="ipv4" source address="10.0.0.0/24" service name="ssh" accept',
      'Menolak capaian daripada IP tertentu berserta rekod log audit:',
      '  rule family="ipv4" source address="192.168.1.50" reject log prefix="POJ-BLOCK: "',
      'Mengehadkan kadar cubaan sambungan (rate limiting) untuk menghalang serangan DoS.'
    ],
    note: 'Kunci keselamatan akses pelayan dalam rangkaian agensi kerajaan'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 01:25 - 01:30\n\nRich Rules membolehkan kita membuka port hanya kepada pegawai tertentu, bukan kepada seluruh dunia.');
}

// ==========================================
// SLIDE 18: Demo 4 - Network & Firewall
// ==========================================
addDemoSlide(pptx.addSlide(), {
  num: 4,
  title: 'Audit Rangkaian & Konfigurasi firewalld Rich Rules',
  duration: '10 Minit',
  commands: [
    'ss -tulpn | grep -E "80|8088|22"',
    'sudo firewall-cmd --state',
    'sudo firewall-cmd --list-all',
    'sudo firewall-cmd --add-service=http --permanent',
    'sudo firewall-cmd --add-rich-rule=\'rule family="ipv4" port port="8088" protocol="tcp" accept\' --permanent',
    'sudo firewall-cmd --reload',
    'sudo firewall-cmd --list-all'
  ],
  observations: [
    'Perintah ss menyenaraikan servis nginx (port 80) dan monitor (port 8088).',
    'firewalld aktif dalam zon public.',
    'Peraturan ditambah dengan flag --permanent dan dimuat semula.',
    'Output --list-all membuktikan perkhidmatan http dan port 8088 kini terbuka.'
  ],
  outcome: 'Peraturan firewall berjaya dikuatkuasakan secara kekal merentasi sesi reboot sistem.',
  notesText: 'Tempoh Slaid: 10 minit\nMasa Kumulatif: 01:30 - 01:40\n\nMari kita jalankan Latihan 4 di terminal.'
});

// ==========================================
// SLIDE 19: Module 5 - Package Management & Cron
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'MODUL 5: PENGURUSAN PAKEJ & AUTOMASI', 'Pengurusan Pakej DNF & Automasi Berjadual Cron', 'Penyelenggaraan Perisian, Audit Integriti Pakej, dan Automasi Tugas Sandaran');

  addCard(s, {
    x: 0.7, y: 2.1, w: 5.7, h: 4.6, topColor: C_BLUE,
    title: 'Pengurusan Pakej DNF / RPM',
    bullets: [
      'DNF (Dandified YUM) adalah pengurus pakej generasi moden CentOS Stream.',
      'Sokongan transaksi lengkap dan jejak sejarah perubahan: sudo dnf history',
      'Keupayaan rollback kemas kini sekiranya berlaku masalah: sudo dnf history undo <id>',
      'Audit Integriti Fail Binari: Gunakan rpm -V <package> untuk menyemak sama ada fail konfigurasi atau binari telah diubah suai secara tidak sah.',
      'Pemeriksaan keselamatan berkala: sudo dnf check-update --security'
    ],
    note: 'Integriti binari sistem dapat dikesan serta-merta'
  });

  addCard(s, {
    x: 6.8, y: 2.1, w: 5.8, h: 4.6, topColor: C_TEAL,
    title: 'Automasi Tugas Berkala dengan Cron',
    bullets: [
      'Perkhidmatan cronie menguruskan jadual tugas automatik sistem.',
      'Anatomi format cron: minit jam hari bulan hari_dalam_minggu pengguna arahan',
      'Contoh: 0 2 * * * root /opt/poj/scripts/backup-kes.sh',
      'Amalan Terbaik Enterprise: Letakkan fail jadual berasingan di /etc/cron.d/ (contoh: /etc/cron.d/poj-backup).',
      'Sentiasa salurkan output log bagi tujuan pemantauan: >> /var/log/poj-backup.log 2>&1'
    ],
    note: 'Memastikan sandaran data kehakiman sentiasa berjalan tepat masa'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 5 minit\nMasa Kumulatif: 01:40 - 01:45\n\nDNF history dan rpm -V membolehkan audit sistem dijalankan dengan pantas, manakala cron menjamin automasi berterusan.');
}

// ==========================================
// SLIDE 20: Demo 5 - Backup Script & Cron Automation
// ==========================================
addDemoSlide(pptx.addSlide(), {
  num: 5,
  title: 'Skrip Sandaran Dokumen Kehakiman & Automasi Cron',
  duration: '10 Minit',
  commands: [
    'cat /opt/poj/scripts/backup-kes.sh',
    'sudo /opt/poj/scripts/backup-kes.sh',
    'ls -lh /opt/poj/backups/',
    'sudo tar -tzf /opt/poj/backups/dokumen-*.tar.gz',
    'echo "0 2 * * * root /opt/poj/scripts/backup-kes.sh >> /var/log/poj-backup.log 2>&1" | sudo tee /etc/cron.d/poj-backup',
    'sudo rpm -V nginx'
  ],
  observations: [
    'Skrip sandaran memampatkan dokumen kehakiman dengan timestamp dinamik.',
    'Arkib tar.gz berjaya dihasilkan dalam direktori /opt/poj/backups/.',
    'Kandungan fail arkib disahkan sahih menggunakan tar -tzf.',
    'Jadual cron didaftarkan secara modular di /etc/cron.d/poj-backup.',
    'Perintah rpm -V mengesahkan integriti fail pakej nginx.'
  ],
  outcome: 'Skrip sandaran automasi dan jadual cron bersedia untuk operasi pengeluaran 24/7.',
  notesText: 'Tempoh Slaid: 10 minit\nMasa Kumulatif: 01:45 - 01:55\n\nSila beralih ke terminal untuk latihan amali terakhir, Latihan 5.'
});

// ==========================================
// SLIDE 21: Summary & Best Practices Checklist
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'RUMUSAN KESELURUHAN BENGKEL', '5 Teras Kestabilan & Senarai Semak Amalan Terbaik SysAdmin', 'Garis Panduan Operasi Harian Pelayan Linux Enterprise Jabatan Kehakiman Malaysia');

  const pillars = [
    { num: '1', title: 'Siasat Berbukti', desc: 'Sentiasa gunakan systemctl status dan journalctl -u untuk mengenal pasti punca sebelum membuat sebarang perubahan.', color: C_BLUE },
    { num: '2', title: 'Least Privilege', desc: 'Elakkan log masuk terus akaun root; gunakan akaun peribadi dengan kawalan granular di /etc/sudoers.d/.', color: C_TEAL },
    { num: '3', title: 'Storan Dinamik', desc: 'Letakkan direktori data di atas LVM dengan sistem fail XFS untuk keupayaan pembesaran online sifar henti.', color: C_PURPLE },
    { num: '4', title: 'Tembok Api Aktif', desc: 'Pastikan firewalld sentiasa berjalan dan gunakan Rich Rules bagi menyekat akses mengikut subnet berdaftar.', color: C_AMBER },
    { num: '5', title: 'Automasi & Integriti', desc: 'Automasi sandaran dengan fail jadual di /etc/cron.d/ dan laksanakan audit integriti perisian dengan rpm -V.', color: C_RED }
  ];

  pillars.forEach((p, idx) => {
    const x = 0.7 + idx * 2.45;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.1, w: 2.3, h: 4.4,
      fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
    });
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.1, w: 2.3, h: 0.45,
      fill: { color: p.color }, line: { color: p.color, width: 0 }, rectRadius: 0.15
    });
    s.addText(`TERAS ${p.num}`, {
      x, y: 2.15, w: 2.3, h: 0.35,
      fontSize: 9.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
    });
    s.addText(p.title, {
      x: x + 0.1, y: 2.7, w: 2.1, h: 0.45,
      fontSize: 11, bold: true, color: p.color, align: 'center'
    });
    s.addText(p.desc, {
      x: x + 0.15, y: 3.25, w: 2.0, h: 3.0,
      fontSize: 9, color: C_SLATE, lineSpacing: 15
    });
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 2 minit\nMasa Kumulatif: 01:55 - 01:57\n\nIni adalah 5 teras utama pentadbiran CentOS yang membezakan pentadbir profesional dengan amatur.');
}

// ==========================================
// SLIDE 22: Q&A and Feedback
// ==========================================
{
  const s = pptx.addSlide();
  s.background = { color: C_BG };
  addHeader(s, 'SESI SOAL JAWAB & MAKLUM BALAS', 'Sesi Perbincangan Terbuka & Penilaian Bengkel', 'Ruang Soal Jawab Teknikal, Khidmat Nasihat Operasi & Penilaian Peserta POJ');

  // Left card: Open Discussion Topics
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: 2.1, w: 7.2, h: 4.6,
    fill: { color: 'FFFFFF' }, line: { color: C_BORDER, width: 1 }, rectRadius: 0.15
  });
  s.addText('Sesi Perbincangan Terbuka', {
    x: 1.0, y: 2.35, w: 6.6, h: 0.35,
    fontSize: 14, bold: true, color: C_DARK
  });
  s.addText('Sila kemukakan sebarang soalan teknikal berkaitan pentadbiran CentOS Stream 10, operasi di POJ, atau amalan terbaik SysAdmin Enterprise:', {
    x: 1.0, y: 2.75, w: 6.6, h: 0.45,
    fontSize: 9.5, color: C_MUTED
  });

  const topics = [
    { num: '1', title: 'Pengurusan Servis & Log', desc: 'systemd, journalctl, cgroups, dan siasatan crash log', color: C_BLUE },
    { num: '2', title: 'Akaun, Akses Kolaborasi & Granular Sudo', desc: 'Kumpulan wheel, SetGID 2770, dan fail modular /etc/sudoers.d/', color: C_TEAL },
    { num: '3', title: 'Storan Enterprise & LVM Dinamik', desc: 'PV / VG / LV, sistem fail XFS, dan pembesaran volum secara langsung', color: C_AMBER },
    { num: '4', title: 'Sekuriti Rangkaian & Automasi', desc: 'firewalld Rich Rules, integriti pakej dnf/rpm, dan automasi cron', color: C_PURPLE },
  ];

  topics.forEach((t, idx) => {
    const ty = 3.35 + idx * 0.7;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 1.0, y: ty, w: 0.45, h: 0.45,
      fill: { color: 'F1F5F9' }, line: { color: C_BORDER, width: 0.8 }, rectRadius: 0.08
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

  // Thank you banner
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.0, y: 6.25, w: 6.6, h: 0.38,
    fill: { color: 'F0FDF4' }, line: { color: 'BBF7D0', width: 0.8 }, rectRadius: 0.08
  });
  s.addText('Setinggi-tinggi penghargaan & terima kasih atas kerjasama padu warga Jabatan Kehakiman Malaysia (POJ).', {
    x: 1.0, y: 6.25, w: 6.6, h: 0.38,
    fontSize: 8.5, bold: true, color: '15803D', align: 'center', valign: 'middle'
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
  s.addText('Sila imbas kod QR di atas menggunakan telefon pintar anda untuk melengkapkan borang penilaian bengkel.', {
    x: 8.5, y: 5.05, w: 3.8, h: 0.65,
    fontSize: 9, color: C_MUTED, align: 'center'
  });
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 9.0, y: 5.8, w: 2.8, h: 0.42,
    fill: { color: C_PURPLE }, line: { color: C_PURPLE, width: 0 }, rectRadius: 0.21
  });
  s.addText('Borang Penilaian Kursus', {
    x: 9.0, y: 5.8, w: 2.8, h: 0.42,
    fontSize: 9.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle'
  });

  addFooter(s, slideIndex++);
  s.addNotes('Tempoh Slaid: 3 minit\nMasa Kumulatif: 01:57 - 02:00\n\nKita kini membuka ruang untuk sebarang soalan teknikal dan perbincangan terbuka.\nSila luangkan masa untuk mengimbas kod QR dan mengisi borang maklum balas bengkel.\nBagi pihak Cognitoz I.T Training, terima kasih banyak dan selamat maju jaya!');
}

const outPptx = 'D:/betalab.cognitoz.com/workshops/poj_centos/myslides/slides.pptx';
console.log(`Writing ${totalSlides} slides to ${outPptx}...`);
await pptx.writeFile({ fileName: outPptx });
console.log('✅ Successfully generated PowerPoint presentation:', outPptx);
