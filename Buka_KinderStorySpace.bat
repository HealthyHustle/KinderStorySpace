@echo off
title Kinder Story Space - Platform Buku Cerita PGPAUD
color 0B

echo ============================================================
echo       MEMBUKA KINDER STORY SPACE (PGPAUD)
echo ============================================================
echo.
echo Website sedang disiapkan dan akan langsung terbuka di browser...
echo.

cd /d "%~dp0"

:: Periksa folder node_modules
if not exist "node_modules\" (
    echo [1/2] Menginstal paket aplikasi pertama kali, mohon tunggu sebentar...
    call npm install
    echo.
)

echo [2/2] Membuka website di browser Anda...
echo.

:: Buka website di browser secara otomatis
start "" "http://localhost:3000"

:: Jalankan server aplikasi
npm start

pause
