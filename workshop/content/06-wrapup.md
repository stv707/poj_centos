---
title: "Penutup: Rumusan & Amalan Terbaik SysAdmin"
---

Tahniah! Anda telah berjaya menamatkan semua latihan amali dalam **Bengkel Pentadbiran Sistem Linux CentOS Stream 10** untuk Jabatan Kehakiman Malaysia (POJ Putrajaya).

## Rumusan Pencapaian Makmal Amali

Sepanjang sesi 2 jam ini, anda telah menguasai dan membuktikan kemahiran operasi utama pentadbir sistem:

| Modul | Topik Operasi | Kemahiran Yang Dikuasai |
|---|---|---|
| **Lab 1** | **systemd & journalctl** | Mendiagnosis servis gagal menggunakan bukti log ralat, mengurus unit targets, dan mengesahkan status operasi. |
| **Lab 2** | **Akaun & Sudo (RBAC)** | Menguatkuasakan prinsip *Least Privilege*, kawalan hak direktori dengan *setgid*, dan sekatan sudoers terperinci. |
| **Lab 3** | **Storan & LVM** | Pembinaan Physical Volume, Volume Group, Logical Volume, format sistem fail XFS, dan pembesaran volum secara *online*. |
| **Lab 4** | **Rangkaian & firewalld** | Analisis soket pendengar dengan `ss`, zon keselamatan, pembukaan servis HTTP, dan peraturan sekatan *Rich Rules*. |
| **Lab 5** | **Pakej (dnf/rpm) & Cron** | Pengurusan repositori rasmi, semakan integriti binari sistem dengan `rpm -V`, dan automasi skrip sandaran berkala. |

## Senarai Semak Amalan Terbaik (SysAdmin Best Practices Checklist)

1. **Elakkan Menggunakan Akses Root Terus:**
   - Sentiasa log masuk sebagai pengguna pentadbir biasa (`droot`) dan gunakan `sudo` mengikut keperluan spesifik.
2. **Siasat Berpandukan Bukti Log:**
   - Gunakan `journalctl -u <servis> -e` untuk membaca punca sebenar isu sebelum melakukan sebarang perubahan konfigurasi.
3. **Manfaatkan Fleksibiliti LVM:**
   - Sentiasa peruntukkan ruang cakera penting (termasuk pangkalan data dan arkib dokumen) di atas Logical Volume (LVM) agar boleh dibesarkan tanpa henti servis.
4. **Kuatkuasakan Tembok Api Dinamik:**
   - Pastikan `firewalld` sentiasa aktif dan hanya buka port atau servis yang benar-benar diperlukan untuk operasi.
5. **Jadualkan & Uji Sandaran Data Secara Berkala:**
   - Automasi sandaran menggunakan cron dan jalankan ujian pemulihan (*disaster recovery test*) secara berkala untuk memastikan integriti arkib data.

---

Terima kasih atas penyertaan aktif anda. Semoga ilmu yang dipelajari dapat dimanfaatkan sepenuhnya dalam memperkukuh kestabilan dan keselamatan infrastruktur ICT di Jabatan Kehakiman Malaysia.
