---
title: "Lab 3: Pengurusan Storan & LVM (Logical Volume Manager)"
---

Dalam persekitaran produksi pelayan database dan rekod kehakiman, keperluan ruang storan sentiasa meningkat. Sekatan partisi tradisional memerlukan proses partition semula (*repartitioning*) dan henti servis (*downtime*). **LVM (Logical Volume Manager)** menyelesaikan cabaran ini dengan membenarkan gabungan dan pembesaran volum storan secara anjal dan langsung (*online expansion*).

## 1. Meneliti Susun Atur Storan Semasa

Semak blok peranti storan dan titik pelekap (*mount points*) yang aktif pada sistem anda:

```terminal:execute
command: |-
  lsblk
  df -hT /
```

## 2. Mengenal Pasti Cakera Tambahan untuk LVM

Pelayan makmal anda telah dibekalkan dengan fail imej cakera 2GB di `/var/lib/poj_disk.img` yang telah dipautkan ke peranti blok loopback Linux:

```terminal:execute
command: |-
  LOOP_DEV=$(losetup -j /var/lib/poj_disk.img | cut -d: -f1)
  echo "Peranti blok latihan anda ialah: $LOOP_DEV"
  lsblk "$LOOP_DEV"
```

## 3. Mencipta Physical Volume (PV)

Langkah pertama LVM ialah menginisialisasi peranti blok mentah menjadi Physical Volume:

```terminal:execute
command: |-
  LOOP_DEV=$(losetup -j /var/lib/poj_disk.img | cut -d: -f1)
  sudo pvcreate "$LOOP_DEV"
  sudo pvs
```

Perhatikan output `pvs` yang memaparkan saiz fizikal cakera (`PSize ~ 2.00g`).

## 4. Membina Volume Group (VG)

Kumpulkan Physical Volume ke dalam kumpulan volum dinamik yang dinamakan **`vg_kehakiman`**:

```terminal:execute
command: |-
  LOOP_DEV=$(losetup -j /var/lib/poj_disk.img | cut -d: -f1)
  sudo vgcreate vg_kehakiman "$LOOP_DEV"
  sudo vgs
```

Volume Group `vg_kehakiman` kini menjadi kolam storan (*storage pool*) berpusat.

## 5. Mencipta Logical Volume (LV)

Potong sebahagian daripada Volume Group untuk mencipta Logical Volume dinamakan **`lv_kes`** bersaiz 1GB:

```terminal:execute
command: |-
  sudo lvcreate -n lv_kes -L 1G vg_kehakiman
  sudo lvs
```

Perhatikan bahawa Logical Volume boleh diakses melalui laluan `/dev/vg_kehakiman/lv_kes`.

## 6. Memformat dengan Sistem Fail XFS

CentOS Stream 10 menggunakan **XFS** sebagai sistem fail berprestasi tinggi lalai (*default enterprise filesystem*). Formatkan LV baharu tersebut:

```terminal:execute
command: |-
  sudo mkfs.xfs /dev/vg_kehakiman/lv_kes
```

## 7. Memasang Mount Point & Uji Simpanan Data

Cipta direktori mount `/mnt/storan_kes` dan lekapkan volum LVM:

```terminal:execute
command: |-
  sudo mkdir -p /mnt/storan_kes
  sudo mount /dev/vg_kehakiman/lv_kes /mnt/storan_kes
  df -hT /mnt/storan_kes
```

Tulis data fail rekod kehakiman ke dalam volum baharu:

```terminal:execute
command: |-
  echo "REKOD_POJ_2026: Arkib Fail Kes Mahkamah Tinggi Putrajaya" | sudo tee /mnt/storan_kes/arkib_kes_01.dat
  ls -lh /mnt/storan_kes
```

## 8. Pembesaran Volum Secara Dinamik (Online Storage Expansion)

Bayangkan pangkalan data kehakiman anda hampir penuh (95% kapasiti). Dengan LVM dan XFS, anda boleh menambah saiz storan sebanyak **+500MB** secara **langsung tanpa henti servis** menggunakan bendera `-r` (*resize filesystem*):

```terminal:execute
command: |-
  sudo lvextend -L +500M -r /dev/vg_kehakiman/lv_kes
```

Semak saiz volum sekarang:

```terminal:execute
command: |-
  df -hT /mnt/storan_kes
```

{{< note >}}
Perhatikan saiz `/mnt/storan_kes` meningkat daripada **1.0G ke 1.5G** serta-merta tanpa perlu unmount atau memulakan semula pelayan! Fail `arkib_kes_01.dat` tetap utuh dan selamat.
{{< /note >}}

## 9. Konfigurasi Lekapan Kekal (/etc/fstab)

Dapatkan UUID unik volum LVM untuk konfigurasi ketekunan but:

```terminal:execute
command: |-
  sudo blkid /dev/vg_kehakiman/lv_kes
```

Entri standard di dalam `/etc/fstab` menggunakan UUID menjamin sistem sentiasa melekapkan cakera ke `/mnt/storan_kes` secara automatik semasa setiap kali sistem dimulakan.

Klik butang **Next** untuk melangkah ke **Lab 4: Rangkaian & Keselamatan Port dengan firewalld**.
