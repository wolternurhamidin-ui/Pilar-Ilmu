# 🚀 ALTERNATIF MUDAH: Google Forms + Sheets

Jika Google Apps Script terlalu ribet, gunakan **Google Forms** sebagai alternatif!

## ⚡ **CARA CEPAT (5 menit):**

### **1. Buat Google Form**
```
1. Buka https://forms.google.com
2. Klik "+" (Blank form)
3. Judul: "Portfolio Registration"
4. Tambahkan pertanyaan:
   - Name (Short answer)
   - Email (Short answer)
   - UID (Short answer) - hidden field
   - Role (Short answer) - hidden field
   - Status (Short answer) - hidden field
```

### **2. Link ke Google Sheets**
```
1. Di Form, klik "Responses"
2. Klik ikon spreadsheet (biru)
3. Pilih "Create a new spreadsheet"
4. Beri nama: "Portfolio Users"
5. Klik "Create"
```

### **3. Dapatkan Form URL**
```
1. Klik "Send" (kanan atas)
2. Copy link dari "Send via email or link"
3. URL akan seperti: https://docs.google.com/forms/d/FORM_ID/viewform
```

### **4. Update Portfolio Code**
Ganti fungsi `sendToGoogleSheets` di `portfolio_v3.html`:

```javascript
async function sendToGoogleSheets(userData) {
  try {
    // Gunakan Google Forms URL
    const formUrl = 'https://docs.google.com/forms/d/FORM_ID/formResponse';
    
    const formData = new FormData();
    formData.append('entry.123456789', userData.name);      // Ganti dengan field ID Name
    formData.append('entry.987654321', userData.email);     // Ganti dengan field ID Email
    formData.append('entry.111111111', userData.uid);       // Ganti dengan field ID UID
    formData.append('entry.222222222', userData.role);      // Ganti dengan field ID Role
    formData.append('entry.333333333', userData.status);    // Ganti dengan field ID Status

    const response = await fetch(formUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    console.log('Data sent to Google Forms successfully');
  } catch (error) {
    console.error('Error sending to Google Forms:', error);
  }
}
```

### **5. Cara Dapatkan Field ID**
```
1. Buka Form editor
2. Klik kanan pertanyaan → "Inspect element"
3. Cari "entry." di HTML
4. Copy angka setelah "entry." (contoh: entry.123456789)
```

## ✅ **KEUNTUNGAN:**
- **Mudah setup** - tidak perlu coding
- **Auto-create sheets** - Google Forms otomatis buat spreadsheet
- **No deployment** - langsung bisa pakai
- **Gratis** - fitur bawaan Google

## 📊 **HASIL:**
Data akan masuk ke Google Sheets otomatis setiap registrasi!

---

## 🎯 **PILIH SALAH SATU:**

| Metode | Kesulitan | Waktu Setup | Fitur |
|--------|-----------|-------------|-------|
| **Apps Script** | Sedang | 15-20 menit | Lengkap + Password Reset |
| **Google Forms** | Mudah | 5 menit | Basic Registration Only |

**Rekomendasi:** Jika belum pernah coding, pilih **Google Forms** dulu! 🚀</content>
<parameter name="filePath">c:\Users\ps4gr\Downloads\portfolio-wolter\ALTERNATIF_GOOGLE_FORMS.md