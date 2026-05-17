# 🚀 Setup Google Sheets Integration untuk Portfolio

## 📋 **Langkah Setup:**

### **1. Buat Google Sheet Baru**
1. Buka [sheets.google.com](https://sheets.google.com)
2. Klik **"+"** untuk membuat spreadsheet baru
3. Beri nama: `Portfolio Database`

### **2. Setup Google Apps Script**
1. Di Google Sheet yang baru dibuat, klik **Extensions > Apps Script**
2. Hapus kode default di editor
3. Copy-paste seluruh isi file `google-apps-script.js` ke editor
4. Klik **Save** (Ctrl+S)

### **3. Deploy sebagai Web App**
1. Klik tombol **Deploy** (biru) > **New deployment**
2. Pilih type: **Web app**
3. Description: `Portfolio Registration API`
4. Execute as: **Me**
5. Who has access: **Anyone** (penting!)
6. Klik **Deploy**
7. **Copy Web App URL** yang muncul

### **4. Update Portfolio HTML**
1. Buka file `portfolio_v3.html`
2. Cari baris: `const GOOGLE_SHEETS_URL = 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA';`
3. Ganti dengan URL yang Anda copy dari langkah 3

### **5. Test Integration**
1. Buka portfolio di browser
2. Daftar akun baru
3. Periksa Google Sheet - data harus muncul otomatis di sheet "Users"

## 📊 **Struktur Database:**

### **Sheet "Users":**
| Kolom | Deskripsi |
|-------|-----------|
| Timestamp | Waktu registrasi |
| Name | Nama lengkap user |
| Email | Alamat email |
| UID | Firebase User ID |
| Role | Role user (user/admin) |
| Status | Status akun (active/inactive) |
| IP Address | Alamat IP pendaftar |
| User Agent | Browser/Device info |

### **Sheet "Password_Resets":**
| Kolom | Deskripsi |
|-------|-----------|
| Timestamp | Waktu request reset |
| Email | Email yang request reset |
| Type | Tipe aktivitas |
| IP Address | Alamat IP |
| User Agent | Browser/Device info |

## 🔧 **Fitur Yang Tersedia:**

### ✅ **Auto Registration Logging**
- Setiap user daftar → otomatis masuk ke Google Sheets
- Data lengkap: nama, email, UID, timestamp, IP, dll

### ✅ **Password Reset Tracking**
- User klik "Lupa Password" → tercatat di sheet terpisah
- Bisa monitor siapa yang sering lupa password

### ✅ **Real-time Monitoring**
- Data langsung masuk tanpa delay
- Bisa buat dashboard atau notifikasi

## 🛠 **Troubleshooting:**

### **Error: "No 'Access-Control-Allow-Origin' header"**
- Pastikan Web App di-deploy dengan "Who has access: Anyone"

### **Data tidak masuk ke Sheets**
- Check Apps Script log: View > Logs
- Pastikan URL di portfolio sudah benar

### **CORS Error**
- Normal untuk Google Apps Script, tidak mempengaruhi fungsi

## 📞 **Support:**

Jika ada masalah, check:
1. **Apps Script Logs**: Extensions > Apps Script > View > Logs
2. **Browser Console**: F12 > Console (untuk error JavaScript)
3. **Network Tab**: Check jika request ke Google Apps Script berhasil

---

**🎉 Selamat! Sekarang Anda punya database lengkap untuk monitoring user portfolio!**