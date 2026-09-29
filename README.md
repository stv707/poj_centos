# CentOS Stream 10 Administration for POJ Putrajaya

Pakej kursus **Cognitoz BetaLab** ini adalah bengkel amali pentadbiran sistem Linux **CentOS Stream 10 (2 Jam)** yang dirangka khusus untuk pegawai IT Jabatan Kehakiman Malaysia (POJ Putrajaya).

## Modul Makmal Amali (Hands-on Labs)

1. **Lab 1: Siasatan Sistem & Servis (systemd & journalctl)**
   - Mendiagnosis servis gagal menggunakan `systemctl status` & `journalctl -u`.
   - Mengesan kod ralat dan membetulkan konfigurasi `/etc/poj/case-monitor.conf`.
   - Mengesahkan status aktif servis `systemctl is-active`.

2. **Lab 2: Pengurusan Pengguna, Kumpulan & Polisi Keselamatan Sudo**
   - Melaksanakan prinsip *Least Privilege* berasaskan peranan (RBAC).
   - Menguatkuasakan kebenaran direktori kolaboratif dengan bit `setgid` (2770).
   - Mengkonfigurasi fail kebenaran sudoers granular dalam `/etc/sudoers.d/99-poj-admin`.

3. **Lab 3: Pengurusan Storan Cakera & LVM (Logical Volume Manager)**
   - Menjana Physical Volume (PV), Volume Group (`vg_kehakiman`), dan Logical Volume (`lv_kes`).
   - Memformat sistem fail enterprise XFS (`mkfs.xfs`).
   - Melaksanakan pembesaran saiz volum secara langsung (*online expansion*) tanpa gangguan servis (`lvextend -r`).

4. **Lab 4: Diagnostik Rangkaian & Tembok Api (firewalld)**
   - Memeriksa soket dan port pendengar dengan `ss -tulpn`.
   - Mengurus zon keselamatan `firewalld` (zon `public`).
   - Mendaftarkan perkhidmatan `http` secara kekal dan menguatkuasakan *Rich Rules*.

5. **Lab 5: Pengurusan Pakej (dnf/rpm) & Automasi Berjadual (Cron)**
   - Meneliti repositori dan sejarah transaksi pakej DNF (`dnf history`).
   - Mengaudit integriti fail binari sistem menggunakan `rpm -V`.
   - Menguji skrip sandaran dan menjadualkan pelaksanaan berkala dalam `/etc/cron.d/`.

## Senibina Infrastruktur Automasi (Ansible)

- **Cloud Provider:** DigitalOcean
- **OS Image:** `centos-stream-10-x64`
- **Droplet Sku:** `s-2vcpu-4gb`
- **DNS Automation:** Azure DNS A-Record (`ssh.stuXX.steven.asia`)
- **Pengguna Pentadbir:** `droot` (Ahli kumpulan `wheel` dengan hak `sudo`)
