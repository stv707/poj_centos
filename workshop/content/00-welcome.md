---
title: "Selamat Datang: Pentadbiran CentOS Stream 10 POJ"
---

Selamat datang ke sesi **Bengkel Amali Pentadbiran Sistem Linux CentOS Stream 10** khusus untuk warga Jabatan Kehakiman Malaysia (POJ Putrajaya).

Sesi 2 jam ini dirangka khas untuk memberikan pendedahan teori operasi dan latihan amali hands-on berpandukan senario sebenar pentadbiran pelayan enterprise.

## Modul Pembelajaran Makmal

1. **Lab 1: Siasatan Sistem & Servis (systemd & journalctl)** — Mendiagnosis servis yang gagal, membaca telemetri log, dan pemulihan operasi.
2. **Lab 2: Pengurusan Akaun & Polisi Keselamatan (sudo)** — Kawalan akses berasaskan peranan (RBAC), kumpulan fail, dan prinsip *Least Privilege*.
3. **Lab 3: Pengurusan Storan & LVM (Logical Volume Manager)** — Analisis ruang cakera, penciptaan PV/VG/LV, sistem fail XFS, dan konfigurasi mount `/etc/fstab`.
4. **Lab 4: Rangkaian & Keselamatan Port (firewalld)** — Diagnostik port pendengar (`ss`), zon keselamatan firewall, dan pembukaan perkhidmatan Nginx.
5. **Lab 5: Pengurusan Pakej (dnf/rpm) & Automasi Berjadual (Cron)** — Pengurusan perisian rasmi, semakan integriti binari, dan skrip sandaran data berkala.

## Persekitaran Pelayan CentOS Stream 10

Anda sedang disambungkan terus ke pelayan dedikasi **CentOS Stream 10 (x86_64)** di cloud. Pelayan ini dilengkapi dengan persekitaran pengurusan pentadbir `droot` yang mempunyai akses kawalan keselamatan penuh.

Mari kita mulakan dengan mengesahkan persekitaran sistem operasi hos:

```terminal:execute
command: |-
  cat /etc/os-release
```

Semak seni bina perkakasan dan kernel Linux semasa:

```terminal:execute
command: |-
  uname -mrs
```

Semak status pengesahan pengguna semasa dan keahlian kumpulan:

```terminal:execute
command: |-
  id
```

{{< note >}}
Pada sistem keluarga Red Hat / CentOS, pengguna pentadbir dimasukkan ke dalam kumpulan **wheel** untuk membolehkan arahan `sudo`. Ini berbeza dengan sistem Debian/Ubuntu yang menggunakan kumpulan `sudo`.
{{< /note >}}

Semak kapasiti memori dan ruang storan utama pelayan:

```terminal:execute
command: |-
  free -h
  df -h /
```

Klik butang **Next** untuk melangkah ke **Lab 1: Siasatan Sistem & Pengurusan Servis dengan systemd & journalctl**.
