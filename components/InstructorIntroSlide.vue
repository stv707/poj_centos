<script setup lang="ts">
// Instructor Intro slide with QR code - MariaDB Database Administration Edition
</script>

<template>
  <div class="instructor-container">
    <div class="header-section">
      <h1 class="instructor-name">Steven Nagendran</h1>
      <p class="instructor-role">Arkitek Infrastruktur Enterprise &amp; Perunding Teknikal Utama</p>

      <div class="badges-row">
        <div class="cert-badge border-blue">
          <img src="/microsoft-logo.svg" alt="Microsoft" class="badge-icon" />
          <span>Microsoft Certified Trainer (MCT)</span>
        </div>
        <div class="cert-badge border-red">
          <img src="/redhat.svg" alt="Red Hat" class="badge-icon" />
          <span>Red Hat Certified Instructor</span>
        </div>
        <div class="brand-badge">
          <span>Cognitoz I.T Training</span>
        </div>
      </div>
    </div>

    <div class="cards-grid">
      <!-- Card 1: Profil Pengajar + QR Code -->
      <div class="profile-card">
        <div class="profile-content">
          <div class="card-heading text-blue">
            <span class="heading-dot bg-blue"></span>
            <span>Profil Pengajar</span>
          </div>
          <ul class="info-list">
            <li><strong>22+ Tahun Pengalaman</strong> dalam reka bentuk seni bina infrastruktur enterprise, pusat data, dan kejuruteraan sistem.</li>
            <li>Berpengalaman melatih warga agensi sektor awam Malaysia, institusi perbankan, dan syarikat multinasional.</li>
            <li>Pakar merentasi persekitaran <strong>Enterprise Linux</strong>, <strong>RDBMS (MariaDB, PostgreSQL, MySQL)</strong>, dan <strong>Windows Server</strong>.</li>
          </ul>
        </div>

        <!-- QR Code Block -->
        <div class="qr-panel">
          <div class="qr-box">
            <img src="/steven-qr.svg" alt="Steven Nagendran Profile QR" class="qr-code-img" />
          </div>
          <a href="https://www.steven.com.my/" target="_blank" rel="noopener noreferrer" class="qr-url">
            steven.com.my
          </a>
          <span class="qr-caption">Imbas Profil</span>
        </div>
      </div>

      <!-- Card 2: Fokus Utama untuk POJ -->
      <div class="focus-card">
        <div class="card-heading text-emerald">
          <span class="heading-dot bg-emerald"></span>
          <span>Fokus Utama untuk POJ Hari Ini</span>
        </div>
        <ul class="info-list">
          <li><strong>Struktur &amp; Storage Engine:</strong> Seni bina server, pemboleh ubah runtime, InnoDB vs Aria, dan diagnostik kesihatan servis.</li>
          <li><strong>Kawalan Akses &amp; Privileges:</strong> Pengasingan identiti User@Host, prinsip Least Privilege, dan penguatkuasaan keselamatan akaun.</li>
          <li><strong>Transaksi, Indexing &amp; Backup:</strong> Bukti COMMIT/ROLLBACK, analisis query EXPLAIN, dan strategi backup mariadb-dump tanpa downtime.</li>
        </ul>
      </div>
    </div>

    <div class="objective-banner">
      <strong>Objektif Bengkel:</strong> Menguasai kemahiran pentadbiran database MariaDB yang praktikal, berteraskan amalan terbaik industri, dan sedia diguna pakai di persekitaran POJ.
    </div>
  </div>
</template>

<style scoped>
.instructor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.instructor-name {
  font-size: 2.1rem !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  margin: 0 !important;
  line-height: 1.15 !important;
}

.instructor-role {
  font-size: 1.05rem !important;
  color: #475569 !important;
  font-weight: 600 !important;
  margin: 0.15rem 0 0.65rem 0 !important;
}

.badges-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.cert-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.85rem;
  background: #ffffff;
  border-radius: 9999px;
  font-size: 0.76rem;
  font-weight: 700;
  color: #1e293b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.cert-badge.border-blue {
  border: 1px solid #bfdbfe;
}

.cert-badge.border-red {
  border: 1px solid #fecaca;
}

.badge-icon {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.brand-badge {
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.76rem;
  font-weight: 700;
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.cards-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.1rem;
  align-items: stretch;
}

.profile-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  display: flex;
  gap: 1rem;
  align-items: center;
}

.profile-content {
  flex: 1;
}

.qr-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 0.9rem;
  border-left: 1px solid #f1f5f9;
  flex-shrink: 0;
  text-align: center;
}

.qr-box {
  background: #ffffff;
  padding: 0.35rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.qr-code-img {
  width: 82px;
  height: 82px;
  display: block;
}

.qr-url {
  font-size: 0.72rem;
  font-weight: 700;
  color: #0284c7;
  text-decoration: none;
  margin-top: 0.3rem;
}

.qr-url:hover {
  text-decoration: underline;
}

.qr-caption {
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 500;
}

.focus-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 1.1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-heading {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-heading.text-blue {
  color: #0078d4;
}

.card-heading.text-emerald {
  color: #059669;
}

.heading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.heading-dot.bg-blue {
  background: #0078d4;
}

.heading-dot.bg-emerald {
  background: #059669;
}

.info-list {
  list-style: disc;
  padding-left: 1.1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-list li {
  font-size: 0.76rem !important;
  color: #334155 !important;
  line-height: 1.45 !important;
}

.objective-banner {
  margin-top: 0.85rem;
  padding: 0.65rem 1rem;
  background: rgba(239, 246, 255, 0.85);
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  font-size: 0.78rem;
  color: #1e3a8a;
  text-align: center;
}
</style>
