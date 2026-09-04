# 📚 Kinder Story Space (PGPAUD)

> **Platform Digital Buku Cerita Anak Interaktif & Modul Pembelajaran PAUD**  
> Dikembangkan untuk penelitian dan media pembelajaran Pendidikan Guru Pendidikan Anak Usia Dini (PGPAUD).

---

## 🌟 Fitur Utama

- 📖 **Koleksi Cerita Dwibahasa (Bilingual)**: Dilengkapi teks Bahasa Indonesia & Bahasa Inggris, pesan moral, dan reader ramah anak.
- 🧩 **Modul Pembelajaran Interaktif**: Meliputi aspek perkembangan anak (Kognitif, Bahasa, Sosial Emosional, Motorik, dan Lingkungan).
- 🖨️ **Unduh PDF Cerita & Modul**: Fitur cetak/unduh format dokumen PDF otomatis menggunakan PDFKit.
- 📊 **Dashboard Manajemen Admin**: Manajemen buku, modul, statistik pembaca, dan pemantauan aktivitas pengguna.
- 🔐 **Autentikasi & Otorisasi**: Sistem login berbasis JWT dan enkripsi password bcrypt untuk multi-role (Pengguna & Admin).

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3 kustom (Responsive & Child-friendly UI), Vanilla JavaScript, Font Awesome.
- **Backend**: Node.js, Express.js.
- **Data Store**: File-based JSON Database (`data/kinder_database.json`).
- **Dokumen Generator**: PDFKit.

---

## 🌐 Cara Akses Online (Tanpa Localhost) & Hosting

### Pilihan 1: Hosting Langsung di GitHub Pages (100% Gratis & Permanen)
Aplikasi ini sudah dipaksa dan dioptimalkan agar berjalan **100% statis di GitHub Pages** tanpa perlu server backend Node.js!
- Ikuti langkah 1 menit di **[PANDUAN_GITHUB_PAGES.md](PANDUAN_GITHUB_PAGES.md)** untuk mengaktifkan URL:
  ```
  https://healthyhustle.github.io/KinderStorySpace/
  ```

### Pilihan 2: Cloud Backend Hosting (Render / Vercel)
Jika ingin menjalankan backend Node.js Express lengkap dengan server-side PDF generator:
- **Render.com**: Ikuti petunjuk lengkap di [PANDUAN_DEPLOY_ONLINE.md](PANDUAN_DEPLOY_ONLINE.md) (`render.yaml`).
- **Vercel**: Deploy instan dengan konfigurasi `vercel.json`.

### Pilihan 3: Buka Langsung Sekali Klik di Komputer (Offline Launcher)
Cukup **klik 2x file `Buka_KinderStorySpace.bat`** di folder utama. Server akan menyala di latar belakang dan browser akan langsung terbuka otomatis tanpa perlu membuka CMD/terminal.

---

## 🚀 Cara Menjalankan Manual (Terminal / CMD)

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 16 ke atas direkomendasikan).

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server
```bash
npm start
```
Buka peramban (browser) dan akses: `http://localhost:3000`

---

## 🔑 Akun Demo / Default

| Peran (Role) | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@kinderstoryspace.com` | `admin123` |
| **Pengguna** | `budi@kinderstory.com` | `budi123` |

---

## 📁 Struktur Direktori

```text
├── data/              # Database JSON (kinder_database.json)
├── public/            # File statis Frontend (HTML, CSS, JS, Assets)
│   ├── assets/        # Ilustrasi cover cerita & modul SVG/PNG
│   ├── css/           # Styling kustom (theme, reader, admin, components)
│   └── js/            # Client logic (router, api, pages, components)
├── scripts/           # Script verifikasi & testing CRUD
├── server/            # Backend Express.js
│   ├── routes/        # Endpoint API (auth, books, modules, admin)
│   ├── db.js          # Helper database
│   ├── pdfService.js  # Generator file PDF
│   └── server.js      # Titik masuk aplikasi (entry point)
└── package.json       # Konfigurasi dependensi Node.js
```

---

## 📄 Lisensi
Hak Cipta © 2026 Penelitian PGPAUD - Kinder Story Space.
