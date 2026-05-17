# 📊 PANDUAN LENGKAP: Setup Google Sheets untuk Portfolio

## 🎯 **Tujuan:**
Agar data registrasi user otomatis masuk ke Google Sheets dan bisa lihat siapa saja yang daftar.

---

## 📋 **METODE 1: Google Apps Script (REKOMENDASI)**

### **LANGKAH 1: Buat Google Sheet**
```
1. Buka browser → https://sheets.google.com
2. Klik tombol "+" (New Spreadsheet)
3. Beri nama: "Portfolio Database"
4. Tunggu sheet terbuka
```

### **LANGKAH 2: Buka Apps Script**
```
1. Di Google Sheet, klik menu "Extensions"
2. Klik "Apps Script"
3. Tunggu editor terbuka (akan ada kode default)
```

### **LANGKAH 3: Copy Kode Script**
```
1. Hapus semua kode yang ada di editor
2. Copy kode di bawah ini:
```

```javascript
// ==========================================
// GOOGLE APPS SCRIPT for Portfolio Registration
// ==========================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch(action) {
      case 'addUser':
        return addUserToSheet(data.data);
      case 'passwordReset':
        return logPasswordReset(data);
      default:
        return ContentService
          .createTextOutput(JSON.stringify({success: false, message: 'Invalid action'}))
          .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addUserToSheet(userData) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');

    // Buat sheet jika belum ada
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Users');
      // Header row
      newSheet.appendRow(['Timestamp', 'Name', 'Email', 'UID', 'Role', 'Status', 'IP Address', 'User Agent']);
      newSheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#1e3a5f').setFontColor('white');
    }

    const sheetToUse = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Users');

    // Tambahkan data user
    const timestamp = new Date();
    const ipAddress = 'N/A'; // IP tidak bisa didapat langsung
    const userAgent = 'Portfolio Website';

    sheetToUse.appendRow([
      timestamp,
      userData.name,
      userData.email,
      userData.uid,
      userData.role,
      userData.status,
      ipAddress,
      userAgent
    ]);

    // Format timestamp column
    const lastRow = sheetToUse.getLastRow();
    sheetToUse.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');

    // Auto-resize columns
    sheetToUse.autoResizeColumns(1, 8);

    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'User added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error adding user: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function logPasswordReset(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Password_Resets');

    // Buat sheet jika belum ada
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Password_Resets');
      // Header row
      newSheet.appendRow(['Timestamp', 'Email', 'Type', 'IP Address', 'User Agent']);
      newSheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#5f1e3a').setFontColor('white');
    }

    const sheetToUse = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Password_Resets');

    // Tambahkan log reset password
    const timestamp = new Date();
    const ipAddress = 'N/A';
    const userAgent = 'Portfolio Website';

    sheetToUse.appendRow([
      timestamp,
      data.email,
      data.type,
      ipAddress,
      userAgent
    ]);

    // Format timestamp column
    const lastRow = sheetToUse.getLastRow();
    sheetToUse.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');

    // Auto-resize columns
    sheetToUse.autoResizeColumns(1, 5);

    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Password reset logged'}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error logging password reset: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### **LANGKAH 4: Save Script**
```
1. Klik tombol "Save" (ikon disk) atau tekan Ctrl+S
2. Beri nama project: "Portfolio API"
3. Tunggu "Saving..." selesai
```

### **LANGKAH 5: Deploy Web App**
```
1. Klik tombol biru "Deploy" (kanan atas)
2. Klik "New deployment"
3. Pilih type: "Web app"
4. Description: "Portfolio Registration API"
5. Execute as: "Me (your email)"
6. Who has access: ⭐⭐⭐ "Anyone" (PENTING!)
7. Klik "Deploy"
8. Klik "Authorize access" jika diminta
9. Pilih akun Google Anda
10. Klik "Allow" untuk memberikan permission
```

### **LANGKAH 6: Copy Web App URL**
```
1. Setelah deploy berhasil, akan muncul URL
2. Copy URL tersebut (contoh: https://script.google.com/macros/s/SCRIPT_ID/exec)
3. Klik "Done"
```

### **LANGKAH 7: Update Portfolio HTML**
```
1. Buka file portfolio_v3.html
2. Cari baris ini:
   const GOOGLE_SHEETS_URL = 'GANTI_DENGAN_URL_GOOGLE_APPS_SCRIPT_ANDA';

3. Ganti dengan URL yang Anda copy:
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

---

## 🧪 **TESTING INTEGRATION**

### **Test 1: Registrasi User**
```
1. Buka portfolio website
2. Klik "DAFTAR"
3. Isi form: nama, email, password
4. Klik "BUAT AKUN"
5. Tunggu toast "Akun berhasil dibuat"
6. Buka Google Sheet → harus ada data baru di sheet "Users"
```

### **Test 2: Forgot Password**
```
1. Klik "Lupa password?"
2. Masukkan email yang sudah daftar
3. Klik "KIRIM LINK RESET"
4. Check email untuk link reset
5. Buka Google Sheet → harus ada data di sheet "Password_Resets"
```

---

## 📊 **YANG AKAN TERLIHAT DI GOOGLE SHEETS**

### **Sheet "Users":**
| Timestamp | Name | Email | UID | Role | Status | IP Address | User Agent |
|-----------|------|-------|-----|------|--------|------------|------------|
| 2026-04-26 10:30:00 | John Doe | john@email.com | abc123 | user | active | N/A | Portfolio Website |

### **Sheet "Password_Resets":**
| Timestamp | Email | Type | IP Address | User Agent |
|-----------|-------|------|------------|------------|
| 2026-04-26 10:35:00 | john@email.com | forgot_password_request | N/A | Portfolio Website |

---

## 🔧 **TROUBLESHOOTING**

### **❌ Error: "Script function not found: doPost"**
```
✅ Pastikan kode doPost() sudah di-copy dengan benar
✅ Pastikan tidak ada syntax error (cek dengan Run > Test function)
```

### **❌ Error: "Authorization is required"**
```
✅ Pastikan deploy dengan "Who has access: Anyone"
✅ Pastikan klik "Authorize access" saat deploy
```

### **❌ Data tidak masuk ke Sheets**
```
✅ Check Apps Script logs: View > Logs
✅ Pastikan URL di portfolio sudah benar
✅ Test dengan buka URL langsung di browser
```

### **❌ CORS Error di browser**
```
✅ Normal untuk Google Apps Script, tidak masalah
✅ Data tetap terkirim ke Sheets
```

---

## 📞 **BUTUH BANTUAN?**

Jika masih bingung, kirim screenshot error atau langkah yang stuck, saya akan bantu satu per satu! 🚀

---

## 🎉 **SELESAI!**

Setelah setup berhasil, setiap kali ada user daftar atau reset password, data akan otomatis masuk ke Google Sheets Anda! 📊✨</content>
<parameter name="filePath">c:\Users\ps4gr\Downloads\portfolio-wolter\SETUP_GOOGLE_SHEETS.md