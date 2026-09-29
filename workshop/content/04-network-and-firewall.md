---
title: "Lab 4: Rangkaian & Tembok Api (firewalld)"
---

Sebagai sistem operasi enterprise, keselamatan rangkaian CentOS dikawal secara dinamik oleh **firewalld**. Berbeza dengan kaedah lapuk `iptables` statik, `firewalld` menyokong zon keselamatan (*Security Zones*) dan peraturan boleh diubah suai secara langsung tanpa memutuskan sambungan pengguna semasa (*zero connection drop*).

## 1. Diagnostik Rangkaian & Antara Muka IP

Periksa antara muka rangkaian pelayan dan alamat IP yang ditetapkan:

```terminal:execute
command: |-
  ip -br addr
  ip route
```

## 2. Pemeriksaan Soket Pendengar (Listening Sockets)

Gunakan utiliti moden **`ss`** (pengganti `netstat`) untuk menganalisis perkhidmatan yang sedang mendengar sambungan:

```terminal:execute
command: |-
  sudo ss -tulpn
```

{{< note >}}
Perhatikan port penting yang sedang mendengar (*LISTEN*):
- **Port 22**: `sshd` (Kawalan terminal SSH)
- **Port 80**: `nginx` (Pelayan web portal POJ)
- **Port 8088**: `poj-case-monitor` (Servis pemantau kes yang telah kita pulihkan di Lab 1)
{{< /note >}}

## 3. Semakan Status & Zon Semasa firewalld

Sahkan status perkhidmatan firewall dan zon aktif:

```terminal:execute
command: |-
  sudo firewall-cmd --state
  sudo firewall-cmd --get-active-zones
```

Lihat senarai penuh peraturan keselamatan dalam zon **public**:

```terminal:execute
command: |-
  sudo firewall-cmd --zone=public --list-all
```

Perhatikan bahawa dalam senarai `services:`, pada asalnya hanya perkhidmatan **`ssh`** (dan `dhcpv6-client`) dibenarkan masuk.

## 4. Menguji Akses Web Tempatan

Uji sama ada Nginx sedang melayani laman web tempatan melalui antara muka loopback:

```terminal:execute
command: |-
  curl -s http://127.0.0.1 | head -n 15
```

Laman web portal dalaman POJ berjaya dicapai secara dalaman.

## 5. Membenarkan Servis Web (HTTP) Secara Kekal

Untuk membenarkan akses HTTP (port 80) melalui zon awam pelayan, daftarkan servis `http` ke dalam firewall dengan bendera `--permanent`:

```terminal:execute
command: |-
  sudo firewall-cmd --zone=public --add-service=http --permanent
```

Muat semula dasar keselamatan firewall tanpa memutuskan sebarang sambungan aktif:

```terminal:execute
command: |-
  sudo firewall-cmd --reload
```

Sahkan bahawa `http` kini tersenarai dalam perkhidmatan yang diluluskan:

```terminal:execute
command: |-
  sudo firewall-cmd --zone=public --list-services
```

## 6. Menguatkuasakan Peraturan Kaya (Rich Rules)

Dalam persekitaran kehakiman, port aplikasi pengurusan dalaman seperti port `8088` (`poj-case-monitor`) tidak wajar didedahkan kepada umum. Kita boleh menguatkuasakan **Rich Rule** untuk mengehadkan akses hanya kepada alamat IP yang sah:

```terminal:execute
command: |-
  sudo firewall-cmd --zone=public --add-rich-rule='rule family="ipv4" source address="127.0.0.1" port port="8088" protocol="tcp" accept' --permanent
  sudo firewall-cmd --reload
```

Semak senarai peraturan rich rule aktif:

```terminal:execute
command: |-
  sudo firewall-cmd --zone=public --list-rich-rules
```

Kini, port 8088 hanya akan menerima sambungan daripada hos tempatan dan secara automatik menolak cubaan sambungan dari luar.

Klik butang **Next** untuk melangkah ke **Lab 5: Pengurusan Pakej (dnf/rpm) & Automasi Tugas Berjadual (Cron)**.
