---
title: "Lab 2: Pengurusan Pengguna, Kumpulan & Hak Sudo"
---

Dalam sistem keselamatan maklumat sektor awam dan kehakiman, prinsip **Least Privilege** menetapkan bahawa setiap pengguna atau perkhidmatan hanya diberikan hak capaian minimum yang mencukupi untuk menjalankan tugas masing-masing. Memberikan kata laluan `root` kepada semua pegawai IT adalah risiko audit yang serius.

## 1. Mencipta Kumpulan Berasaskan Peranan (RBAC)

Cipta dua kumpulan berasingan untuk membezakan peranan pentadbir kes dan juruaudit:

```terminal:execute
command: |-
  sudo groupadd poj_admin
  sudo groupadd poj_audit
  getent group poj_admin poj_audit
```

## 2. Pendaftaran Akaun Pengguna Pegawai

Daftarkan pengguna baharu untuk pentadbir kes (`ahmad_admin`) dan juruaudit keselamatan (`siti_audit`):

```terminal:execute
command: |-
  sudo useradd -m -s /bin/bash -g poj_admin ahmad_admin
  sudo useradd -m -s /bin/bash -g poj_audit siti_audit
```

Tetapkan kata laluan untuk akaun tersebut:

```terminal:execute
command: |-
  echo "ahmad_admin:PojAdminPass2026!" | sudo chpasswd
  echo "siti_audit:PojAuditPass2026!" | sudo chpasswd
```

Sahkan maklumat identiti dan UID/GID kedua-dua pengguna:

```terminal:execute
command: |-
  id ahmad_admin
  id siti_audit
```

## 3. Kawalan Keselamatan Direktori Dokumen Kehakiman

Direktori `/opt/poj/dokumen_kehakiman` mengandungi fail-fail fail kes mahkamah. Hanya kumpulan `poj_admin` dibenarkan menulis, manakala pihak lain disekat sepenuhnya.

Tetapkan pemilikan kumpulan dan bit keselamatan khas **setgid (2770)**:

```terminal:execute
command: |-
  sudo chown -R root:poj_admin /opt/poj/dokumen_kehakiman
  sudo chmod -R 2770 /opt/poj/dokumen_kehakiman
  ls -ld /opt/poj/dokumen_kehakiman
```

{{< note >}}
Bit **setgid** (angka 2 pada `2770`, dipaparkan sebagai `s` pada `rwxrws---`) memastikan mana-mana fail baharu yang dicipta di dalam direktori ini akan mewarisi kumpulan `poj_admin` secara automatik, bukan kumpulan peribadi pengguna.
{{< /note >}}

Uji hak akses kolaborasi sebagai `ahmad_admin`:

```terminal:execute
command: |-
  sudo -u ahmad_admin touch /opt/poj/dokumen_kehakiman/kes_baharu_ahmad.txt
  ls -l /opt/poj/dokumen_kehakiman/kes_baharu_ahmad.txt
```

Kini uji capaian sebagai `siti_audit`. Percubaan akses sepatutnya dinafikan (*Permission denied*):

```terminal:execute
command: |-
  sudo -u siti_audit ls /opt/poj/dokumen_kehakiman
```

## 4. Konfigurasi Sudoers Khusus (Granular Sudo Privilege)

Pegawai `ahmad_admin` perlu memulakan semula servis `poj-case-monitor` apabila berlaku gangguan, tetapi dia **TIDAK** sepatutnya mendapat akses root penuh.

Bina peraturan kebenaran terperinci di `/etc/sudoers.d/99-poj-admin`:

```terminal:execute
command: |-
  sudo bash -c 'cat <<EOF > /etc/sudoers.d/99-poj-admin
  # Hak akses minimum terperinci untuk Pegawai Pentadbir Kes POJ
  ahmad_admin ALL=(root) /usr/bin/systemctl restart poj-case-monitor, /usr/bin/systemctl status poj-case-monitor
  EOF'
  sudo chmod 0440 /etc/sudoers.d/99-poj-admin
```

Sahkan sintaks sudoers sah tanpa ralat menggunakan `visudo`:

```terminal:execute
command: |-
  sudo visudo -cf /etc/sudoers.d/99-poj-admin
```

## 5. Uji Penguatkuasaan Dasar Least Privilege

Semak senarai arahan sudo yang dibenarkan untuk `ahmad_admin`:

```terminal:execute
command: |-
  sudo -l -U ahmad_admin
```

Uji arahan yang dibenarkan (memeriksa status servis):

```terminal:execute
command: |-
  sudo -u ahmad_admin sudo /usr/bin/systemctl status poj-case-monitor --no-pager
```

Sekarang, cuba jalankan arahan yang tidak dibenarkan (contohnya melihat fail kata laluan sistem `/etc/shadow`):

```terminal:execute
command: |-
  sudo -u ahmad_admin sudo cat /etc/shadow || echo "[DISEKAT] Akses dinafikan seperti yang diharapkan!"
```

Akses dinafikan serta-merta dan percubaan ini direkodkan dalam log keselamatan audit!

Klik butang **Next** untuk melangkah ke **Lab 3: Pengurusan Storan Cakera & LVM (Logical Volume Manager)**.
