@echo off
echo ============================================
echo  Server Lokal - Mahir Belajar dan Mengajar
echo ============================================
echo.
echo Membuka server di http://localhost:8000
echo.
echo Tekan Ctrl+C untuk menghentikan server
echo.
start http://localhost:8000/integrated-platform.html
python -m http.server 8000
