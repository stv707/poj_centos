---
title: "Lab 5: Pengurusan Pakej (dnf/rpm) & Automasi Cron"
---

Pentadbir sistem enterprise bergantung pada **DNF** (*Dandified YUM*) dan **RPM** untuk memasang, mengemas kini, dan mengaudit perisian secara selamat. Manakala daemon **crond** membolehkan automasi sandaran dan penyelenggaraan berkala dijalankan tanpa campur tangan manual manusia.

## 1. Meneliti Repositori & Transaksi DNF

Periksa senarai repositori pakej rasmi yang aktif pada pelayan CentOS Stream 10 anda:

```terminal:execute
command: |-
  dnf repolist
```

Lihat maklumat terperinci dan integriti pakej sesebuah aplikasi:

```terminal:execute
command: |-
  dnf info nginx
```

Periksa sejarah transaksi pemasangan perisian pada sistem (*DNF History*):

```terminal:execute
command: |-
  dnf history
```

{{< note >}}
DNF menyimpan lejar rekod setiap pakej yang dipasang atau dibuang. Jika sesuatu kemas kini menyebabkan konflik, pentadbir boleh mengembalikan (*rollback*) sistem ke keadaan asal menggunakan `dnf history undo <ID>`.
{{< /note >}}

## 2. Pengauditan Integriti Fail Binari dengan RPM

Dalam forensik keselamatan siber kehakiman, pentadbir perlu mengesahkan sama ada sesuatu fail binari sistem telah diusik (*tampered*) oleh penceroboh.

Kenal pasti pakej asal pemilik fail eksekutabel Nginx:

```terminal:execute
command: |-
  rpm -qf /usr/sbin/nginx
```

Jalankan semakan integriti kriptografi fail (*Verification*):

```terminal:execute
command: |-
  rpm -V nginx
```

Jika tiada sebarang output dipaparkan, ini bermakna semua fail binari, saiz, dan nilai hash SHA-256 adalah 100% tulen dan belum diubah suai sejak dipasang daripada repositori rasmi.

## 3. Meneliti Skrip Sandaran Dokumen Mahkamah

Pelayan anda telah dilengkapi dengan skrip sandaran berpusat di `/opt/poj/scripts/backup-kes.sh`:

```terminal:execute
command: |-
  cat /opt/poj/scripts/backup-kes.sh
```

Uji pelaksanaan manual skrip tersebut:

```terminal:execute
command: |-
  sudo /opt/poj/scripts/backup-kes.sh
```

Sahkan fail arkib sandaran `.tar.gz` yang telah berjaya dihasilkan dalam direktori `/backup`:

```terminal:execute
command: |-
  ls -lh /backup
  cat /var/log/poj-backup.log
```

## 4. Menjadualkan Tugas Sandaran Berkala dengan Cron

Sahkan bahawa daemon penjadual tugas **`crond`** sentiasa aktif:

```terminal:execute
command: |-
  systemctl status crond --no-pager
```

Cipta entri jadual berkala rasmi di `/etc/cron.d/poj-kes-backup`. Untuk tujuan demonstrasi makmal ini, kita jadualkan skrip sandaran berjalan **setiap minit**:

```terminal:execute
command: |-
  sudo bash -c 'cat <<EOF > /etc/cron.d/poj-kes-backup
  # Sandaran automatik dokumen kehakiman POJ Putrajaya
  SHELL=/bin/bash
  PATH=/sbin:/bin:/usr/sbin:/usr/bin
  * * * * * root /opt/poj/scripts/backup-kes.sh > /dev/null 2>&1
  EOF'
  sudo chmod 0644 /etc/cron.d/poj-kes-backup
```

Tunggu beberapa saat untuk kitaran cron pertama terlaksana, kemudian pantau log cron sistem:

```terminal:execute
command: |-
  sleep 5
  sudo grep backup-kes.sh /var/log/cron | tail -n 5
```

Periksa pertambahan arkib sandaran baharu dan log rekod audit:

```terminal:execute
command: |-
  tail -n 10 /var/log/poj-backup.log
  ls -lh /backup
```

Automasi tugas berkala kini beroperasi sepenuhnya di latar belakang dengan selamat dan konsisten!

Klik butang **Next** untuk ke bahagian rumusan bengkel dan amalan terbaik pentadbir sistem.
