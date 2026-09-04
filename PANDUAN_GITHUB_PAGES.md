# 🚀 Panduan Mengaktifkan GitHub Pages (Kinder Story Space)

Aplikasi **Kinder Story Space** kini telah dilengkapi dengan **Client-Side Database** dan sistem aset relatif. Ini memungkinkan aplikasi berjalan **100% secara statis di GitHub Pages** tanpa membutuhkan server backend Node.js.

Setelah Anda mengunggah (push) perubahan ini ke GitHub, ikuti langkah mudah di bawah ini untuk mengaktifkan website:

---

## 📌 Langkah 1: Upload (Push) Kode ke GitHub

Buka terminal di folder proyek ini dan jalankan:
```bash
git add .
git commit -m "Aktifkan dukungan penuh hosting statis GitHub Pages"
git push origin main
```

---

## ⚙️ Langkah 2: Mengaktifkan GitHub Pages di Repository

1. Buka browser dan kunjungi repository Anda:
   👉 **[https://github.com/HealthyHustle/KinderStorySpace](https://github.com/HealthyHustle/KinderStorySpace)**

2. Klik tab **Settings** (ikon gerigi di sebelah kanan atas menu repository).

3. Pada menu sidebar sebelah kiri, cari dan klik menu **Pages** (di bawah kategori *Code and automation*).

4. Di bagian **Build and deployment**:
   - **Pilihan 1 (Paling Direkomendasikan - Otomatis via Actions):**
     - Pada dropdown **Source**, pilih: **`GitHub Actions`**.
     - *Selesai! GitHub Actions akan membaca file `.github/workflows/deploy-pages.yml` yang sudah kami siapkan dan otomatis mendeploy dalam 1–2 menit.*
   
   - **Pilihan 2 (Alternatif Manual Branch /docs):**
     - Pada dropdown **Source**, pilih: **`Deploy from a branch`**.
     - Pada pilihan Branch, pilih: **`main`** dan folder: **`/docs`**.
     - Klik tombol **Save**.

---

## 🌐 Langkah 3: Mengakses Website Anda

Tunggu sekitar 1–2 menit, lalu refresh halaman **Settings > Pages**. Anda akan melihat kotak hijau berisi link publik website Anda:
```text
https://healthyhustle.github.io/KinderStorySpace/
```

Link ini adalah alamat resmi di internet. Anda dapat langsung membagikannya ke dosen penguji, guru PAUD, atau orang tua untuk dibuka dari HP Android, iPhone, tablet, maupun laptop mana pun tanpa perlu menyalakan komputer Anda!

---

## 🔑 Akun Demo untuk Uji Coba

| Peran | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@kinderstoryspace.com` | `admin123` |
| **Pengguna / Guru / Murid** | `budi@kinderstory.com` | `user123` |

*(Anda juga dapat mendaftar akun baru melalui tombol **Daftar Sekarang** di halaman login).*

---

## ✨ Fitur yang Tetap Berjalan Penuh di GitHub Pages:
- 📖 **8 Buku Cerita Interaktif** lengkap dengan ilustrasi sampul dan halaman cerita.
- 🇮🇩 / 🇬🇧 **Bilingual Switcher** (Bahasa Indonesia & English secara realtime).
- 🧩 **6 Modul Pembelajaran PAUD** (Kognitif, Bahasa, Sosial Emosional, Motorik, Lingkungan, Numerasi).
- 📊 **Dashboard Manajemen Admin**: Tambah cerita baru, edit buku, kelola modul, dan lihat statistik.
- 🖨️ **Cetak & Unduh PDF**: Menggunakan generator layout cetak ramah A4 langsung dari peramban (*Print to PDF*).
- 💾 **Penyimpanan Progres**: Progres membaca dan data tersimpan otomatis di browser (*LocalStorage*).
