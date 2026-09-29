---
title: "Lab 1: Siasatan Servis (systemd & journalctl)"
---

Dalam persekitaran enterprise Linux, **systemd** bertindak sebagai pengurus sistem dan perkhidmatan (*Service & System Manager*) dengan PID 1. Apabila berlaku gangguan perkhidmatan, pentadbir sistem perlu bertindak pantas menggunakan bukti telemetri rasmi dan bukannya meneka masalah.

## 1. Mengenal Pasti Perkhidmatan Yang Terjejas

Mulakan dengan memeriksa sama ada terdapat sebarang servis yang gagal dimulakan dalam pelayan anda:

```terminal:execute
command: |-
  systemctl --failed
```

Perhatikan bahawa unit **`poj-case-monitor.service`** disenaraikan dalam status **failed**. Servis ini bertanggungjawab memantau giliran pendaftaran kes elektronik POJ.

## 2. Analisis Status Awal Unit Servis

Periksa status terperinci servis tersebut menggunakan `systemctl status`:

```terminal:execute
command: |-
  systemctl status poj-case-monitor.service --no-pager
```

{{< note >}}
Perhatikan petunjuk status:
- **Loaded**: `loaded (/etc/systemd/system/poj-case-monitor.service; enabled)`
- **Active**: `failed (Result: exit-code)`
- Perhatikan kod keluar (*exit code*): `code=exited, status=2`.
{{< /note >}}

## 3. Siasatan Mendalam Menggunakan journalctl

`systemctl status` hanya memaparkan beberapa baris log ringkas. Untuk mendapatkan kronologi punca kegagalan sebenar, gunakan utiliti telemetri berpusat **journalctl**:

```terminal:execute
command: |-
  journalctl -u poj-case-monitor.service -n 20 --no-pager
```

Teliti baris log ralat merah:
```text
[ERROR] Invalid PORT configuration '99999' in /etc/poj/case-monitor.conf! Port must be between 1024 and 65535.
```

Punca masalah telah ditemui berpandukan bukti: Port `99999` melebihi julat maksimum nombor port protokol TCP (65535).

## 4. Membaiki Konfigurasi dan Memulakan Servis Semula

Lihat kandungan fail konfigurasi servis:

```terminal:execute
command: |-
  cat /etc/poj/case-monitor.conf
```

Betulkan nilai `PORT=99999` kepada port sah `PORT=8088` menggunakan arahan di bawah:

```terminal:execute
command: |-
  sudo sed -i 's/PORT=99999/PORT=8088/' /etc/poj/case-monitor.conf
  cat /etc/poj/case-monitor.conf
```

Kini, mulakan semula servis `poj-case-monitor` menggunakan `systemctl`:

```terminal:execute
command: |-
  sudo systemctl restart poj-case-monitor.service
```

## 5. Sahkan Kejayaan Pemulihan Perkhidmatan

Semak semula status servis:

```terminal:execute
command: |-
  systemctl status poj-case-monitor.service --no-pager
```

Pastikan servis kini dalam status **Active: active (running)** dengan teks berwarna hijau.

Gunakan arahan ringkas untuk skrip automasi pengesahan:

```terminal:execute
command: |-
  systemctl is-active poj-case-monitor.service
```

Saksikan denyutan nadi (*heartbeat telemetry*) servis yang sedang berjalan secara langsung:

```terminal:execute
command: |-
  journalctl -u poj-case-monitor.service -n 5 --no-pager
```

## 6. Pengurusan Unit Targets & Default Boot

Periksa sasaran but semasa sistem operasi (*Runlevel moden*):

```terminal:execute
command: |-
  systemctl get-default
```

Output `multi-user.target` mengesahkan pelayan beroperasi dalam mod pelayan konsol tanpa antaramuka grafik X-Window, menjimatkan penggunaan CPU dan RAM.

Klik butang **Next** untuk melangkah ke **Lab 2: Pengurusan Akaun Pengguna, Kumpulan & Polisi Keselamatan Sudo**.
