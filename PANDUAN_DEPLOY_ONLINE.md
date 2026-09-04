# 🌐 Panduan Mengonlinekan Website Kinder Story Space (Tanpa Localhost)

Panduan ini memudahkan Anda untuk membuat website **Kinder Story Space** dapat diakses secara langsung melalui internet dengan link resmi (misalnya: `https://kinder-story-space.onrender.com`), sehingga **bisa dibuka langsung oleh dosen penguji, guru, maupun orang tua dari HP atau laptop mana pun tanpa perlu menjalankan localhost di komputer Anda**.

---

## 🚀 Cara 1: Menggunakan Render.com (Paling Direkomendasikan ⭐⭐⭐⭐⭐)

**Render.com** adalah layanan cloud gratis yang menjalankan server Node.js dan Express secara penuh, sehingga fitur baca cerita, modul, simpan progres, dan unduh PDF berjalan 100% sempurna.

### Langkah-langkah (Hanya 3 Menit):

1. **Pastikan Kode Terbaru Sudah Masuk ke GitHub**:
   Jalankan perintah ini di terminal (atau upload perubahan ke GitHub):
   ```bash
   git add .
   git commit -m "Siapkan konfigurasi deployment online"
   git push origin main
   ```

2. **Daftar & Masuk ke Render**:
   - Buka [https://render.com](https://render.com).
   - Klik **"Sign Up"** (atau **"Log In"**) dan pilih **"Continue with GitHub"** (gunakan akun GitHub Anda: `HealthyHustle`).

3. **Hubungkan Repository**:
   - Di Dashboard Render, klik tombol **"New +"** di pojok kanan atas, lalu pilih **"Web Service"**.
   - Pilih opsi **"Build and deploy from a Git repository"** lalu klik **Next**.
   - Cari dan pilih repository: **`HealthyHustle/KinderStorySpace`** (klik **Connect**).

4. **Konfirmasi Pengaturan (Otomatis Terisi)**:
   Render akan membaca file `render.yaml` yang sudah kami siapkan. Jika mengisi manual, cukup pastikan:
   - **Name**: `kinder-story-space` *(atau nama yang Anda inginkan)*
   - **Region**: `Singapore` *(paling cepat untuk akses di Indonesia)*
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free** ($0 / gratis selamanya)

5. **Klik "Deploy Web Service"**:
   - Klik tombol **"Create Web Service" / "Deploy"**.
   - Tunggu sekitar 1–2 menit hingga status berubah menjadi **"Live"**.
   - Anda akan mendapatkan link website resmi di bagian atas, contohnya:
     ```text
     https://kinder-story-space.onrender.com
     ```
   - **Selesai!** Kirimkan link tersebut ke siapa saja, dan website langsung terbuka tanpa perlu menyalakan komputer Anda.

---

## ⚡ Cara 2: Menggunakan Vercel (Alternatif Super Cepat ⭐⭐⭐⭐)

1. Buka [https://vercel.com](https://vercel.com).
2. Login dengan akun GitHub Anda.
3. Klik tombol **"Add New..."** -> pilih **"Project"**.
4. Cari repository **`HealthyHustle/KinderStorySpace`** lalu klik **"Import"**.
5. Tanpa perlu mengubah setting apa pun (karena file `vercel.json` sudah kami sediakan), klik **"Deploy"**.
6. Tunggu sekitar 30 detik. Website Anda akan langsung aktif dengan link:
   ```text
   https://kinder-story-space.vercel.app
   ```

---

## 💻 Cara 3: Membuka Langsung di Laptop Sekali Klik (Tanpa Buka Terminal / CMD)

Jika Anda ingin membuka aplikasi di komputer ini secara instan tanpa internet atau tanpa mengetik perintah apa pun di terminal:

1. Buka folder penelitian ini: `c:\Users\wow10\Documents\penelitian\PGPAUD`
2. **Klik 2x pada file**:
   ```text
   Buka_KinderStorySpace.bat
   ```
3. Website akan langsung otomatis terbuka di Google Chrome / Browser bawaan Anda!

---

## 💡 Informasi Akun Login Demo

Setelah website online dibuka, Anda dan pengguna lain dapat langsung menggunakan akun bawaan:

| Peran (Role) | Email | Kata Sandi (Password) |
| :--- | :--- | :--- |
| **Admin** | `admin@kinderstoryspace.com` | `admin123` |
| **Pengguna** | `budi@kinderstory.com` | `user123` |
