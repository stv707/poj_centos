<script setup lang="ts">
// Feedback and Q&A slide component for MariaDB Administration
</script>

<template>
  <div class="feedback-slide-container">
    <div class="header-section">
      <h1 class="main-title">Sesi Soal &amp; Jawab (Q&amp;A) &amp; Maklum Balas</h1>
      <p class="subtitle">Ruang Perbincangan Teknikal, Khidmat Nasihat &amp; Penilaian Bengkel</p>
    </div>

    <div class="content-grid">
      <!-- Left Panel: Q&A -->
      <div class="qa-card">
        <div>
          <div class="card-title">
            <span class="badge badge-blue">Q&amp;A</span>
            <span>Sesi Perbincangan Terbuka</span>
          </div>
          <p class="card-desc">
            Sila kemukakan sebarang soalan teknikal berkaitan pentadbiran CentOS Stream 10, operasi di POJ, atau amalan terbaik SysAdmin Enterprise:
          </p>

          <div class="topic-list">
            <div class="topic-item">
              <span class="topic-num blue">1</span>
              <span>Pengurusan Servis &amp; Log (<code class="inline-code">systemd</code>, <code class="inline-code">journalctl</code>, <code class="inline-code">cgroups</code>)</span>
            </div>
            <div class="topic-item">
              <span class="topic-num teal">2</span>
              <span>Akaun, Akses Kolaborasi &amp; Granular Sudo (<code class="inline-code">wheel</code>, <code class="inline-code">setgid 2770</code>, <code class="inline-code">/etc/sudoers.d/</code>)</span>
            </div>
            <div class="topic-item">
              <span class="topic-num amber">3</span>
              <span>Storan Enterprise &amp; LVM Dinamik (<code class="inline-code">PV / VG / LV</code>, <code class="inline-code">XFS Online Expansion</code>)</span>
            </div>
            <div class="topic-item">
              <span class="topic-num purple">4</span>
              <span>Sekuriti Rangkaian &amp; Automasi (<code class="inline-code">firewalld Rich Rules</code>, <code class="inline-code">dnf / rpm</code>, <code class="inline-code">cron</code>)</span>
            </div>
          </div>
        </div>

        <div class="thank-you-box">
          <p>Setinggi-tinggi penghargaan dan terima kasih atas komitmen serta kerjasama warga <strong>Jabatan Kehakiman Malaysia (POJ) Putrajaya</strong>.</p>
        </div>
      </div>

      <!-- Right Panel: Feedback QR Code -->
      <div class="feedback-card">
        <div class="qr-container">
          <img src="/feedback-qr.svg" alt="Borang Maklum Balas" class="qr-image" />
        </div>
        <p class="qr-label">Sila imbas kod QR di atas menggunakan telefon pintar untuk melengkapkan borang penilaian bengkel.</p>
        <span class="badge-feedback">Penilaian Peserta POJ</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feedback-slide-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.75rem;
}

.header-section {
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.main-title {
  font-size: 1.6rem !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  margin: 0 !important;
}

.subtitle {
  font-size: 0.85rem !important;
  color: #64748b !important;
  margin: 0.2rem 0 0 0 !important;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 1.25rem;
  margin-top: 0.25rem;
}

.qa-card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: #334155;
}

.topic-num {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}

.topic-num.blue { background: #e0f2fe; color: #0284c7; }
.topic-num.teal { background: #ccfbf1; color: #0d9488; }
.topic-num.amber { background: #fef3c7; color: #d97706; }
.topic-num.purple { background: #f3e8ff; color: #7e22ce; }

.inline-code {
  background: #f1f5f9;
  color: #0369a1;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.72rem;
}

.thank-you-box {
  margin-top: 0.8rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.76rem;
  color: #166534;
}

.thank-you-box p {
  margin: 0 !important;
}

.feedback-card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.qr-container {
  width: 160px;
  height: 160px;
  padding: 8px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 0.75rem;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-label {
  font-size: 0.76rem;
  color: #64748b;
  margin: 0 0 0.6rem 0 !important;
  max-width: 220px;
}

.badge-feedback {
  background: #0284c7;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  letter-spacing: 0.03em;
}
</style>
