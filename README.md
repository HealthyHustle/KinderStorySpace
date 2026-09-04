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

## 🚀 Cara Menjalankan Secara Lokal (Localhost)

### 1. Prasyarat
Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 16 ke atas direkomendasikan).

### 2. Instalasi Dependensi
Clone repository dan pasang paket yang diperlukan:
```bash
git clone https://github.com/HealthyHustle/KinderStorySpace.git
cd KinderStorySpace
npm install
```

### 3. Menjalankan Server
```bash
npm start
```
Buka peramban (browser) dan akses:
```
http://localhost:3000
```

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
