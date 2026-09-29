---
theme: default
background: false
colorSchema: 'light'
title: "Pentadbiran CentOS Stream 10: Siasatan Sistem, Keselamatan, Storan LVM & Automasi"
info: |
  ## Pentadbiran CentOS Stream 10: Siasatan Sistem, Keselamatan, Storan LVM & Automasi
  Disampaikan oleh Cognitoz I.T Training Sdn Bhd untuk Jabatan Kehakiman Malaysia (POJ), Putrajaya.
class: text-left
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
mdc: true
aspectRatio: '16/9'
canvasWidth: 980
---

<div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
  <div class="flex items-center gap-3">
    <img src="/cognitoz-logo.png" alt="Cognitoz" class="h-8 object-contain" />
  </div>
  <div class="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold text-red-700">CentOS Stream 10</span>
    </div>
    <span class="text-slate-300">|</span>
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold text-blue-700">Enterprise Linux Admin</span>
    </div>
  </div>
</div>

# Pentadbiran CentOS Stream 10 Moden
### Siasatan Sistem, Keselamatan, Storan LVM &amp; Automasi Operasi

<div class="pt-1.5 flex items-center gap-2 flex-wrap">
  <span class="badge badge-blue">POJ, Putrajaya</span>
  <span class="badge badge-emerald">29 September 2026</span>
  <span class="badge badge-purple">120 Minit (Teori &amp; Sesi Demo Hands-on)</span>
  <span class="badge badge-slate">Anjuran Cognitoz</span>
</div>

<div class="grid grid-cols-3 gap-4 mt-5 text-left">
  <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
    <div class="text-blue-700 font-bold text-sm mb-1.5">[1] Diagnostik systemd &amp; journalctl</div>
    <div class="text-xs text-slate-600 leading-relaxed">Siasatan kegagalan perkhidmatan berpandukan bukti telemetri rasmi, status PID 1, dan analisis log masa nyata.</div>
  </div>
  <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
    <div class="text-emerald-700 font-bold text-sm mb-1.5">[2] Keselamatan Pengguna &amp; Sudo (RBAC)</div>
    <div class="text-xs text-slate-600 leading-relaxed">Penguatkuasaan dasar Least Privilege, kawalan direktori kehakiman dengan setgid, dan sekatan hak akses sudoers terperinci.</div>
  </div>
  <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
    <div class="text-purple-700 font-bold text-sm mb-1.5">[3] Storan LVM, Firewall &amp; Cron</div>
    <div class="text-xs text-slate-600 leading-relaxed">Pengurusan storan anjal PV/VG/LV dengan pembesaran online XFS, kawalan port firewalld, dan automasi sandaran berjadual.</div>
  </div>
</div>

<!--
Tempoh Slaid: 1 minit
Masa Kumulatif: 00:00 - 00:01 (Masa Berlalu: 1 min)

Cadangan Penerangan:
Selamat tengah hari dan salam sejahtera kepada semua warga Jabatan Kehakiman Malaysia (POJ Putrajaya). Selamat datang ke bengkel "Pentadbiran CentOS Stream 10: Siasatan Sistem, Keselamatan, Storan LVM & Automasi."
Nama saya Steven Nagendran daripada Cognitoz I.T Training. Hari ini kita akan memfokuskan kepada amalan pentadbiran sistem Linux enterprise sebenar pada sistem operasi CentOS Stream 10.
-->

---

<InstructorIntroSlide />

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:01 - 00:03 (Masa Berlalu: 3 min)

Cadangan Penerangan:
Pengenalan latar belakang pengajar dan penglibatan dalam perundingan Linux enterprise serta latihan sektor awam.
-->

---

# Aliran &amp; Objektif Bengkel 2 Jam
## Pendekatan Berganding: Teori Operasi Diikuti Pembuktian Langsung di BetaLab

<div class="grid grid-cols-5 gap-3 mt-6">
  <div class="tech-card tech-card-blue p-3.5">
    <span class="badge badge-blue">LAB 1</span>
    <h3 class="text-xs font-bold mt-2">systemd &amp; Logs</h3>
    <p class="text-[11px] text-slate-600 mt-1.5 leading-relaxed">Siasatan servis gagal dan telemetri journalctl.</p>
  </div>
  <div class="tech-card tech-card-emerald p-3.5">
    <span class="badge badge-emerald">LAB 2</span>
    <h3 class="text-xs font-bold mt-2">Akaun &amp; Sudo</h3>
    <p class="text-[11px] text-slate-600 mt-1.5 leading-relaxed">Prinsip Least Privilege &amp; kawalan hak setgid.</p>
  </div>
  <div class="tech-card tech-card-purple p-3.5">
    <span class="badge badge-purple">LAB 3</span>
    <h3 class="text-xs font-bold mt-2">Storan &amp; LVM</h3>
    <p class="text-[11px] text-slate-600 mt-1.5 leading-relaxed">PV, VG, LV &amp; pembesaran XFS tanpa henti servis.</p>
  </div>
  <div class="tech-card tech-card-amber p-3.5">
    <span class="badge badge-amber">LAB 4</span>
    <h3 class="text-xs font-bold mt-2">Rangkaian &amp; FW</h3>
    <p class="text-[11px] text-slate-600 mt-1.5 leading-relaxed">Diagnostik port `ss` &amp; zon firewalld.</p>
  </div>
  <div class="tech-card tech-card-slate p-3.5">
    <span class="badge badge-slate">LAB 5</span>
    <h3 class="text-xs font-bold mt-2">DNF &amp; Cron</h3>
    <p class="text-[11px] text-slate-600 mt-1.5 leading-relaxed">Pengurusan pakej &amp; automasi sandaran berkala.</p>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:03 - 00:05 (Masa Berlalu: 5 min)
-->

---

# Topologi Makmal BetaLab POJ
## Pelayan Dedikasi CentOS Stream 10 di Cloud dengan Akses Terminal Web

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-blue p-5">
    <div class="flex items-center gap-2 mb-3">
      <span class="badge badge-blue">PERSEKITARAN ANDA</span>
      <h3 class="text-sm font-bold text-blue-700 m-0">Infrastruktur Makmal Setiap Peserta</h3>
    </div>
    <ul class="text-xs space-y-2 text-slate-700 m-0 pl-4">
      <li><strong>OS:</strong> CentOS Stream 10 (x86_64 Enterprise Linux)</li>
      <li><strong>Spesifikasi VM:</strong> 2 vCPU / 4 GB RAM / Dedicated NVMe Storage</li>
      <li><strong>Pengguna Utama:</strong> <code>droot</code> (Kumpulan pentadbir <code>wheel</code>)</li>
      <li><strong>Akses Rangkaian:</strong> Subdomain unik <code>ssh.stuXX.steven.asia</code></li>
      <li><strong>Antaramuka:</strong> Terminal pelayar web interaktif di BetaLab</li>
    </ul>
  </div>

  <div class="tech-card tech-card-emerald p-5">
    <div class="flex items-center gap-2 mb-3">
      <span class="badge badge-emerald">ISOLASI &amp; KESELAMATAN</span>
      <h3 class="text-sm font-bold text-emerald-700 m-0">Jaminan Integriti Latihan</h3>
    </div>
    <ul class="text-xs space-y-2 text-slate-700 m-0 pl-4">
      <li>Setiap peserta mempunyai pelayan cloud yang terasing sepenuhnya.</li>
      <li>Sebarang eksperimen, pembesaran storan, atau gangguan servis tidak menjejaskan rakan sekelas.</li>
      <li>Semua latihan dijalankan secara langsung (live environment).</li>
    </ul>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:05 - 00:07 (Masa Berlalu: 7 min)
-->

---

# Modul 1: Senibina systemd &amp; Pengurusan Servis
## Mengapa systemd? PID 1 Sebagai Pengurus Sistem Berpusat

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-blue p-4">
    <span class="badge badge-blue mb-2">CIRI UTAMA SYSTEMD</span>
    <h3 class="text-sm font-bold mt-1">Pengganti Init System Tradisional</h3>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><strong>PID 1:</strong> Proses induk kepada semua proses pengguna dan sistem.</li>
      <li><strong>Paralelisme:</strong> Memulakan perkhidmatan serentak menggunakan soket.</li>
      <li><strong>Cgroups:</strong> Mengasingkan dan mengehadkan sumber CPU/RAM setiap servis.</li>
      <li><strong>Unit Types:</strong> <code>.service</code>, <code>.target</code>, <code>.socket</code>, <code>.mount</code>.</li>
    </ul>
  </div>

  <div class="tech-card tech-card-amber p-4">
    <span class="badge badge-amber mb-2">ARAHAN OPERASI PENTING</span>
    <h3 class="text-sm font-bold mt-1">Kawalan Kitaran Hayat Servis</h3>
    <div class="text-xs font-mono space-y-2 mt-2 bg-slate-900 text-slate-100 p-3 rounded-lg">
      <div>systemctl status &lt;servis&gt;</div>
      <div>systemctl start | stop | restart &lt;servis&gt;</div>
      <div>systemctl reload &lt;servis&gt;</div>
      <div>systemctl enable | disable &lt;servis&gt;</div>
      <div>systemctl --failed</div>
    </div>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:07 - 00:09 (Masa Berlalu: 9 min)
-->

---

# Metodologi Siasatan 5-Langkah (5-Step Triage)
## Pendekatan Sistematik Semasa Mendiagnosis Gangguan Perkhidmatan

<div class="flex flex-col gap-2.5 mt-4 text-xs">
  <div class="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="badge badge-blue font-bold">LANGKAH 1</span>
      <span class="font-bold text-blue-900">Kenal Pasti Unit Terjejas</span>
    </div>
    <code class="bg-white px-2 py-0.5 rounded border border-blue-200">systemctl --failed</code>
  </div>

  <div class="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="badge badge-slate font-bold">LANGKAH 2</span>
      <span class="font-bold text-slate-800">Semak Status &amp; Kod Keluar Unit</span>
    </div>
    <code class="bg-white px-2 py-0.5 rounded border border-slate-200">systemctl status &lt;servis&gt;</code>
  </div>

  <div class="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="badge badge-amber font-bold">LANGKAH 3</span>
      <span class="font-bold text-amber-900">Periksa Telemetri Log Terperinci</span>
    </div>
    <code class="bg-white px-2 py-0.5 rounded border border-amber-200">journalctl -u &lt;servis&gt; -n 25 --no-pager</code>
  </div>

  <div class="p-3 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="badge badge-purple font-bold">LANGKAH 4</span>
      <span class="font-bold text-purple-900">Baiki Konfigurasi &amp; Muat Semula</span>
    </div>
    <code class="bg-white px-2 py-0.5 rounded border border-purple-200">systemctl daemon-reload &amp;&amp; systemctl restart &lt;servis&gt;</code>
  </div>

  <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="badge badge-emerald font-bold">LANGKAH 5</span>
      <span class="font-bold text-emerald-900">Sahkan Kestabilan Servis Berjalan</span>
    </div>
    <code class="bg-white px-2 py-0.5 rounded border border-emerald-200">systemctl is-active &lt;servis&gt;</code>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:09 - 00:11 (Masa Berlalu: 11 min)
-->

---

# Telemetri &amp; Analisis Log dengan journalctl
## Pengurusan Log Kriptografi Berstruktur Menggantikan Fail Teks Statik

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-blue p-4">
    <span class="badge badge-blue mb-2">KELEBIHAN JOURNALCTL</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><strong>Format Berstruktur:</strong> Log disimpan dengan metadata masa, PID, dan unit.</li>
      <li><strong>Penapisan Pantas:</strong> Cari mesej ralat tanpa perlu `grep` fail bersaiz gergasi.</li>
      <li><strong>Integriti:</strong> Rekod log terlindung daripada manipulasi manual teks biasa.</li>
    </ul>
  </div>

  <div class="tech-card tech-card-purple p-4">
    <span class="badge badge-purple mb-2">CONTOH PENAPISAN TELEMETRI</span>
    <div class="text-xs font-mono space-y-2 mt-2 bg-slate-900 text-slate-100 p-3 rounded-lg">
      <div># Tapis log servis tertentu sahaja</div>
      <div class="text-blue-400">journalctl -u poj-case-monitor</div>
      <div># Paparkan log tahap ralat sahaja</div>
      <div class="text-amber-400">journalctl -p err -b</div>
      <div># Ikuti log secara langsung (live tail)</div>
      <div class="text-emerald-400">journalctl -u poj-case-monitor -f</div>
    </div>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:11 - 00:13 (Masa Berlalu: 13 min)
-->

---

# Demonstrasi Makmal 1: Triage Servis Gagal
## Panduan Hands-on Memulihkan poj-case-monitor

<div class="tech-card tech-card-blue p-5 mt-3">
  <h3 class="text-sm font-bold text-blue-800 mb-2">Senario Masalah:</h3>
  <p class="text-xs text-slate-600 leading-relaxed mb-3">
    Servis <code>poj-case-monitor.service</code> gagal dimulakan selepas pertukaran konfigurasi semalam. Pengguna sistem kehakiman tidak dapat melihat status giliran pemfailan kes.
  </p>
  <div class="grid grid-cols-3 gap-3 text-xs">
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-red-600 block mb-1">1. Simptom:</span>
      <code>failed (Result: exit-code)</code> kod keluar 2.
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-amber-600 block mb-1">2. Bukti:</span>
      <code>journalctl</code> menunjukkan port 99999 tidak sah.
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-emerald-600 block mb-1">3. Pemulihan:</span>
      Ubah ke port 8088 &amp; restart servis.
    </div>
  </div>
</div>

<div class="p-3 mt-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-center justify-between">
  <span>Sila laksanakan arahan di panel sebelah kanan: <strong>Lab 1: Siasatan Servis (systemd &amp; journalctl)</strong></span>
  <span class="badge badge-blue">Masa Amali: 15 Minit</span>
</div>

<!--
Tempoh Slaid: 1 minit
Masa Kumulatif: 00:13 - 00:14 (Masa Berlalu: 14 min)
-->

---

# Modul 2: Keselamatan Akses &amp; Least Privilege
## Mengapa Elakkan Akaun Root Terus? Kawalan Hak Akses (RBAC)

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-red p-4">
    <span class="badge badge-red mb-2">RISIKO LOG MASUK ROOT TERUS</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><strong>Tiada Kebertanggungjawaban:</strong> Sukar mengesan pegawai mana yang melaksanakan arahan bahaya.</li>
      <li><strong>Kesilapan Manusia:</strong> Arahan salah seperti `rm -rf /` terus memadamkan keseluruhan pelayan.</li>
      <li><strong>Sasaran Utama Siber:</strong> Penceroboh sentiasa menyasarkan nama pengguna `root` dalam serangan brute-force.</li>
    </ul>
  </div>

  <div class="tech-card tech-card-emerald p-4">
    <span class="badge badge-emerald mb-2">AMALAN TERBAIK ENTERPRISE</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li>Semua pegawai log masuk menggunakan akaun peribadi yang disahkan.</li>
      <li>Setiap arahan `sudo` direkodkan bersama cap masa dan nama pegawai dalam `/var/log/secure`.</li>
      <li>Hanya kebenaran arahan tertentu diberikan mengikut peranan kerja.</li>
    </ul>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:29 - 00:31 (Masa Berlalu: 31 min)
-->

---

# Kebenaran Direktori Khas: Bit SetGID (2770)
## Kolaborasi Pasukan Tanpa Perlu Kompromi Keselamatan Fail

<div class="flex flex-col gap-3 mt-3">
  <div class="tech-card tech-card-purple p-4">
    <div class="flex items-center gap-2 mb-2">
      <span class="badge badge-purple">ANATOMI KEBENARAN 2770</span>
      <h3 class="text-xs font-bold font-mono text-purple-800 m-0">drwxrws--- (setgid aktif pada kumpulan)</h3>
    </div>
    <p class="text-xs text-slate-600 leading-relaxed m-0">
      Pada direktori kolaboratif seperti <code>/opt/poj/dokumen_kehakiman</code>, bit <strong>setgid</strong> (angka 2 di hadapan) memastikan mana-mana fail baharu yang dicipta oleh mana-mana pegawai akan <strong>secara automatik mewarisi kumpulan direktori tersebut (poj_admin)</strong>, bukan kumpulan peribadi pencipta fail.
    </p>
  </div>

  <div class="grid grid-cols-2 gap-4 text-xs font-mono">
    <div class="p-3 bg-slate-900 text-slate-100 rounded-lg">
      <span class="text-slate-400 block mb-1"># Konfigurasi Kebenaran Kolaboratif:</span>
      <div class="text-emerald-400">chown -R root:poj_admin /opt/poj/dokumen</div>
      <div class="text-purple-400">chmod -R 2770 /opt/poj/dokumen</div>
    </div>
    <div class="p-3 bg-slate-900 text-slate-100 rounded-lg">
      <span class="text-slate-400 block mb-1"># Hasil Penciptaan Fail Baharu:</span>
      <div>-rw-rw---- 1 ahmad poj_admin fail1.txt</div>
      <div>-rw-rw---- 1 ali   poj_admin fail2.txt</div>
    </div>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:31 - 00:33 (Masa Berlalu: 33 min)
-->

---

# Konfigurasi Sudoers Berbutir Halus (Granular Sudo)
## Menyekat Capaian Mengikut Peranan Menggunakan /etc/sudoers.d/

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-blue p-4">
    <span class="badge badge-blue mb-2">SINTAKS PERATURAN SUDOERS</span>
    <div class="text-xs font-mono space-y-2 mt-2 bg-slate-900 text-slate-100 p-3 rounded-lg">
      <div class="text-slate-400"># Siapa Di-mana=(Sebagai) Arahan</div>
      <div class="text-amber-400">ahmad_admin ALL=(root) \</div>
      <div class="text-emerald-400">  /usr/bin/systemctl restart poj-case-monitor, \</div>
      <div class="text-emerald-400">  /usr/bin/systemctl status poj-case-monitor</div>
    </div>
    <p class="text-[11px] text-slate-600 mt-2">Pegawai hanya boleh mengurus servis tertentu tanpa akses membaca fail sulit atau menukar kata laluan pengguna lain.</p>
  </div>

  <div class="tech-card tech-card-emerald p-4">
    <span class="badge badge-emerald mb-2">AMALAN KESELAMATAN SUDO</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li>Sentiasa simpan peraturan modular dalam <code>/etc/sudoers.d/&lt;nama&gt;</code> dengan mod <code>0440</code>.</li>
      <li>Sentiasa uji sintaks fail menggunakan arahan rasmi <code>visudo -cf &lt;fail&gt;</code> sebelum membenarkan penggunaan.</li>
      <li>Gunakan laluan penuh arahan (contoh: <code>/usr/bin/systemctl</code>) bagi mengelakkan eksploitasi $PATH.</li>
    </ul>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:33 - 00:35 (Masa Berlalu: 35 min)
-->

---

# Demonstrasi Makmal 2: Kuatkuasa Hak Akses Sudo
## Panduan Hands-on Peranan ahmad_admin vs siti_audit

<div class="tech-card tech-card-emerald p-5 mt-3">
  <h3 class="text-sm font-bold text-emerald-800 mb-2">Objektif Pembuktian:</h3>
  <div class="grid grid-cols-3 gap-3 text-xs">
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-blue-700 block mb-1">1. Pengasingan Akaun:</span>
      Pendaftaran `ahmad_admin` (Admin Kes) dan `siti_audit` (Juruaudit).
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-emerald-700 block mb-1">2. Perlindungan Direktori:</span>
      `setgid 2770` memastikan `siti_audit` disekat daripada melihat fail rahsia.
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-purple-700 block mb-1">3. Ujian Sudo:</span>
      `ahmad_admin` boleh restart servis, tetapi cubaan membuka `/etc/shadow` disekat!
    </div>
  </div>
</div>

<div class="p-3 mt-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
  <span>Sila teruskan ke: <strong>Lab 2: Pengurusan Pengguna, Kumpulan &amp; Hak Sudo</strong></span>
  <span class="badge badge-emerald">Masa Amali: 15 Minit</span>
</div>

<!--
Tempoh Slaid: 1 minit
Masa Kumulatif: 00:35 - 00:36 (Masa Berlalu: 36 min)
-->

---

# Modul 3: Seni Bina Storan Dinamik (LVM)
## Mengatasi Kekangan Partisi Tradisional dengan Logical Volume Manager

<div class="flex flex-col gap-3 mt-3">
  <div class="grid grid-cols-3 gap-3 text-xs">
    <div class="p-3 bg-blue-50 rounded-lg border border-blue-200">
      <span class="badge badge-blue mb-1">1. PHYSICAL VOLUME (PV)</span>
      <p class="text-slate-600 mt-1">Cakera fizikal atau partisi mentah yang diinisialisasi (contoh: <code>/dev/sdb</code>).</p>
    </div>
    <div class="p-3 bg-purple-50 rounded-lg border border-purple-200">
      <span class="badge badge-purple mb-1">2. VOLUME GROUP (VG)</span>
      <p class="text-slate-600 mt-1">Gabungan beberapa PV menjadi kolam storan berpusat (contoh: <code>vg_kehakiman</code>).</p>
    </div>
    <div class="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
      <span class="badge badge-emerald mb-1">3. LOGICAL VOLUME (LV)</span>
      <p class="text-slate-600 mt-1">Partisi maya fleksibel yang diformat dengan XFS (contoh: <code>/dev/vg_kehakiman/lv_kes</code>).</p>
    </div>
  </div>

  <div class="tech-card tech-card-blue p-4">
    <h3 class="text-xs font-bold text-blue-800 mb-1">Kelebihan Kritikal untuk POJ Putrajaya:</h3>
    <ul class="text-xs space-y-1 text-slate-700 pl-4 m-0">
      <li>Pangkalan data dokumen mahkamah tidak akan tersekat apabila saiz fail bertambah.</li>
      <li>Storan boleh dibesarkan secara langsung (*online*) tanpa perlu menutup pelayan.</li>
      <li>Menyokong teknologi snapshot untuk tujuan sandaran segera sebelum migrasi sistem.</li>
    </ul>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:51 - 00:53 (Masa Berlalu: 53 min)
-->

---

# Sistem Fail XFS &amp; Pembesaran Volum Secara Langsung
## Mengapa XFS Menjadi Piawaian Default pada CentOS Stream 10?

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-teal p-4">
    <span class="badge badge-teal mb-2">CIRI SISTEM FAIL XFS</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><strong>Prestasi I/O Skala Besar:</strong> Direka khusus untuk volum bersaiz multi-terabyte dan fail besar.</li>
      <li><strong>Struktur B+ Tree:</strong> Pencarian fail pantas dan indeks direktori berprestasi tinggi.</li>
      <li><strong>Online Growth:</strong> Boleh dibesarkan serta-merta semasa sistem sedang membaca/menulis fail.</li>
    </ul>
  </div>

  <div class="tech-card tech-card-purple p-4">
    <span class="badge badge-purple mb-2">ARAHAN PEMBESARAN SATU BARIS</span>
    <div class="text-xs font-mono space-y-2 mt-2 bg-slate-900 text-slate-100 p-3 rounded-lg">
      <div class="text-slate-400"># Besarkan LV dan sistem fail serentak:</div>
      <div class="text-emerald-400">lvextend -L +500M -r /dev/vg_kehakiman/lv_kes</div>
      <div class="text-slate-400"># Sahkan saiz meningkat tanpa downtime:</div>
      <div class="text-blue-400">df -hT /mnt/storan_kes</div>
    </div>
    <p class="text-[11px] text-slate-600 mt-2">Bendera <code>-r</code> memanggil utiliti <code>xfs_growfs</code> secara automatik.</p>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 00:53 - 00:55 (Masa Berlalu: 55 min)
-->

---

# Demonstrasi Makmal 3: Pengurusan Storan &amp; LVM
## Panduan Hands-on Membina dan Membesarkan Storan Rekod Mahkamah

<div class="tech-card tech-card-purple p-5 mt-3">
  <h3 class="text-sm font-bold text-purple-800 mb-2">Langkah Pembuktian Amali:</h3>
  <div class="grid grid-cols-4 gap-2 text-xs">
    <div class="p-2.5 bg-white rounded border border-slate-200">
      <span class="font-bold text-blue-700 block mb-1">1. pvcreate</span>
      Inisialisasi cakera 2GB.
    </div>
    <div class="p-2.5 bg-white rounded border border-slate-200">
      <span class="font-bold text-purple-700 block mb-1">2. vgcreate</span>
      Cipta kolam `vg_kehakiman`.
    </div>
    <div class="p-2.5 bg-white rounded border border-slate-200">
      <span class="font-bold text-emerald-700 block mb-1">3. lvcreate &amp; XFS</span>
      Cipta 1GB &amp; format XFS.
    </div>
    <div class="p-2.5 bg-white rounded border border-slate-200">
      <span class="font-bold text-amber-700 block mb-1">4. lvextend -r</span>
      Besarkan +500MB secara online!
    </div>
  </div>
</div>

<div class="p-3 mt-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center justify-between">
  <span>Sila teruskan ke: <strong>Lab 3: Pengurusan Storan &amp; LVM (Logical Volume Manager)</strong></span>
  <span class="badge badge-purple">Masa Amali: 15 Minit</span>
</div>

<!--
Tempoh Slaid: 1 minit
Masa Kumulatif: 00:55 - 00:56 (Masa Berlalu: 56 min)
-->

---

# Modul 4: Keselamatan Rangkaian &amp; firewalld
## Konsep Zon Dinamik &amp; Analisis Soket Pendengar (Listening Sockets)

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-blue p-4">
    <span class="badge badge-blue mb-2">ANALISIS SOKET DENGAN SS</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><code>ss -tulpn</code> &bull; Pengganti moden `netstat` yang jauh lebih pantas.</li>
      <li>Memaparkan port TCP/UDP yang sedang mendengar berserta nombor PID aplikasi.</li>
      <li>Membolehkan kita mengesahkan sama ada web server sebenarnya memegang port 80.</li>
    </ul>
  </div>

  <div class="tech-card tech-card-amber p-4">
    <span class="badge badge-amber mb-2">ZON KESELAMATAN FIREWALLD</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><strong>drop:</strong> Menolak semua sambungan tanpa sebarang balasan (stealth mode).</li>
      <li><strong>public:</strong> Zon lalai; hanya port perkhidmatan yang diluluskan dibenarkan.</li>
      <li><strong>trusted:</strong> Menerima semua sambungan (khusus untuk subnet rangkaian dalaman).</li>
    </ul>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 01:11 - 01:13 (Masa Berlalu: 73 min)
-->

---

# Mengurus firewalld &amp; Peraturan Kaya (Rich Rules)
## Sekatan Capaian Berasaskan IP Sumber &amp; Port Aplikasi

<div class="flex flex-col gap-3 mt-3">
  <div class="tech-card tech-card-blue p-4">
    <div class="flex items-center gap-2 mb-2">
      <span class="badge badge-blue">MEMBUKA SERVIS SECARA KEKAL</span>
    </div>
    <div class="text-xs font-mono bg-slate-900 text-slate-100 p-2.5 rounded">
      <div>firewall-cmd --zone=public --add-service=http --permanent</div>
      <div>firewall-cmd --reload</div>
    </div>
    <p class="text-[11px] text-slate-600 mt-1.5 m-0">Bendera <code>--permanent</code> memastikan peraturan kekal selepas pelayan dimulakan semula, manakala <code>--reload</code> memuatkan dasar tanpa memutuskan sambungan aktif.</p>
  </div>

  <div class="tech-card tech-card-purple p-4">
    <div class="flex items-center gap-2 mb-2">
      <span class="badge badge-purple">RICH RULES UNTUK SEKATAN KHAS</span>
    </div>
    <div class="text-xs font-mono bg-slate-900 text-slate-100 p-2.5 rounded">
      <div>firewall-cmd --zone=public --add-rich-rule='rule family="ipv4" source address="127.0.0.1" port port="8088" protocol="tcp" accept' --permanent</div>
    </div>
    <p class="text-[11px] text-slate-600 mt-1.5 m-0">Memastikan port aplikasi pengurusan dalaman hanya boleh diakses oleh hos tempatan dan disekat sepenuhnya daripada capaian internet awam.</p>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 01:13 - 01:15 (Masa Berlalu: 75 min)
-->

---

# Demonstrasi Makmal 4: Rangkaian &amp; Tembok Api
## Panduan Hands-on Mengesahkan Port 80 Nginx &amp; Rich Rules

<div class="tech-card tech-card-amber p-5 mt-3">
  <h3 class="text-sm font-bold text-amber-800 mb-2">Langkah Siasatan &amp; Pengukuhan Rangkaian:</h3>
  <div class="grid grid-cols-3 gap-3 text-xs">
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-blue-700 block mb-1">1. Semak Soket:</span>
      `ss -tulpn` mengesahkan Nginx (80) &amp; Case Monitor (8088).
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-emerald-700 block mb-1">2. Benarkan HTTP:</span>
      Daftar servis `http` pada zon public &amp; muat semula.
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-purple-700 block mb-1">3. Kawal Port 8088:</span>
      Kuatkuasakan Rich Rule hanya untuk 127.0.0.1.
    </div>
  </div>
</div>

<div class="p-3 mt-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
  <span>Sila teruskan ke: <strong>Lab 4: Rangkaian &amp; Tembok Api (firewalld)</strong></span>
  <span class="badge badge-amber">Masa Amali: 15 Minit</span>
</div>

<!--
Tempoh Slaid: 1 minit
Masa Kumulatif: 01:15 - 01:16 (Masa Berlalu: 76 min)
-->

---

# Modul 5: Pengurusan Pakej DNF &amp; Automasi Cron
## Integriti Kriptografi Binari RPM &amp; Penjadualan Sandaran

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="tech-card tech-card-blue p-4">
    <span class="badge badge-blue mb-2">DNF &amp; AUDIT RPM</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><code>dnf history</code> &bull; Lejar penuh rekod perisian sistem; boleh dibatalkan dengan <code>undo</code>.</li>
      <li><code>rpm -qf &lt;fail&gt;</code> &bull; Cari pakej asal pemilik sesuatu fail konfigurasi atau binari.</li>
      <li><code>rpm -V &lt;pakej&gt;</code> &bull; Sahkan nilai hash SHA-256 bagi memastikan fail tidak diceroboh.</li>
    </ul>
  </div>

  <div class="tech-card tech-card-emerald p-4">
    <span class="badge badge-emerald mb-2">PENJADUALAN CRON</span>
    <ul class="text-xs space-y-2 text-slate-700 mt-2 pl-4">
      <li><strong>5 Medan Standard:</strong> Minit, Jam, Hari Bulan, Bulan, Hari Minggu.</li>
      <li><strong>Daemon crond:</strong> Berjalan di latar belakang dan membaca jadual dalam <code>/etc/cron.d/</code>.</li>
      <li><strong>Log Pengauditan:</strong> Setiap pelaksanaan tugas direkodkan dalam <code>/var/log/cron</code>.</li>
    </ul>
  </div>
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 01:31 - 01:33 (Masa Berlalu: 93 min)
-->

---

# Demonstrasi Makmal 5: DNF, Audit &amp; Automasi Cron
## Panduan Hands-on Skrip Sandaran Dokumen Kehakiman

<div class="tech-card tech-card-slate p-5 mt-3">
  <h3 class="text-sm font-bold text-slate-800 mb-2">Pelaksanaan Tugasan Akhir:</h3>
  <div class="grid grid-cols-3 gap-3 text-xs">
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-blue-700 block mb-1">1. Semak DNF &amp; RPM:</span>
      Audit integriti pakej Nginx dengan `rpm -V`.
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-emerald-700 block mb-1">2. Uji Skrip Sandaran:</span>
      Jalankan `/opt/poj/scripts/backup-kes.sh`.
    </div>
    <div class="p-3 bg-white rounded border border-slate-200">
      <span class="font-bold text-purple-700 block mb-1">3. Automasi Cron:</span>
      Jadualkan di `/etc/cron.d/` dan pantau `/var/log/cron`.
    </div>
  </div>
</div>

<div class="p-3 mt-4 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-800 flex items-center justify-between">
  <span>Sila teruskan ke: <strong>Lab 5: Pengurusan Pakej (dnf/rpm) &amp; Automasi Cron</strong></span>
  <span class="badge badge-slate">Masa Amali: 15 Minit</span>
</div>

<!--
Tempoh Slaid: 1 minit
Masa Kumulatif: 01:33 - 01:34 (Masa Berlalu: 94 min)
-->

---

# Rumusan &amp; Senarai Semak Amalan Terbaik SysAdmin
## 5 Teras Kestabilan &amp; Keselamatan Sistem Linux Enterprise POJ

<div class="grid grid-cols-5 gap-3 mt-4 text-xs">
  <div class="p-3 bg-blue-50 rounded-xl border border-blue-200">
    <span class="font-bold text-blue-800 block mb-1">1. Siasat Berbukti</span>
    Gunakan <code>journalctl -u</code> dan status unit sebelum membuat perubahan.
  </div>
  <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
    <span class="font-bold text-emerald-800 block mb-1">2. Least Privilege</span>
    Elakkan log masuk root; gunakan kebenaran sudo terperinci.
  </div>
  <div class="p-3 bg-purple-50 rounded-xl border border-purple-200">
    <span class="font-bold text-purple-800 block mb-1">3. Storan Anjal</span>
    Sentiasa letakkan direktori data di atas volum LVM dengan sistem fail XFS.
  </div>
  <div class="p-3 bg-amber-50 rounded-xl border border-amber-200">
    <span class="font-bold text-amber-800 block mb-1">4. Tembok Api</span>
    Pastikan `firewalld` aktif dan kawal port menggunakan Rich Rules.
  </div>
  <div class="p-3 bg-slate-100 rounded-xl border border-slate-300">
    <span class="font-bold text-slate-800 block mb-1">5. Automasi Cron</span>
    Automasi sandaran data dan pantau log pelaksanaan secara berkala.
  </div>
</div>

<div class="mt-6 text-center text-sm font-bold text-slate-700">
  Sesi Soal Jawab (Q&amp;A) &bull; Terima Kasih Warga Jabatan Kehakiman Malaysia (POJ Putrajaya)
</div>

<!--
Tempoh Slaid: 2 minit
Masa Kumulatif: 01:50 - 02:00 (Masa Berlalu: 120 min)
-->
