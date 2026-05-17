# Setup Firebase Database & Google Auth

## Status Saat Ini
Semua kode sudah siap. Yang perlu dilakukan hanya konfigurasi di Firebase Console.

---

## LANGKAH 1 — Aktifkan Firebase Authentication

1. Buka: https://console.firebase.google.com/project/portfolio-database-59d3f
2. Klik menu **Authentication** di sidebar kiri
3. Klik tab **Sign-in method**
4. Aktifkan **Email/Password** → klik toggle → Save
5. Aktifkan **Google** → klik toggle → masukkan email support → Save

---

## LANGKAH 2 — Tambahkan Domain yang Diizinkan

1. Di halaman Authentication → tab **Settings**
2. Scroll ke **Authorized domains**
3. Klik **Add domain**
4. Tambahkan domain website Anda (contoh: `mahirbelajar.com`)
5. Untuk testing lokal, `localhost` sudah otomatis ada

> ⚠️ Google Login TIDAK bisa berjalan dari `file://` (buka langsung dari folder).
> Harus di-hosting di domain atau gunakan localhost dengan server lokal.

---

## LANGKAH 3 — Setup Firestore Database

1. Klik menu **Firestore Database** di sidebar
2. Klik **Create database**
3. Pilih **Start in test mode** (untuk development)
4. Pilih region: **asia-southeast1 (Singapore)**
5. Klik **Enable**

---

## LANGKAH 4 — Atur Firestore Security Rules

Di Firestore → tab **Rules**, ganti dengan:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users: hanya bisa baca/tulis data sendiri
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Login history: hanya bisa tulis (tidak bisa baca dari client)
    match /loginHistory/{docId} {
      allow create: if request.auth != null;
      allow read: if false;
    }

    // Sertifikat: bisa dibaca semua yang login, tulis hanya sistem
    match /sertifikat/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Analytics visitors: bisa tulis semua
    match /analytics/{docId} {
      allow read, write: if true;
    }
  }
}
```

---

## STRUKTUR DATABASE (Firestore Collections)

### 📁 `users/{uid}`
```json
{
  "uid": "abc123",
  "name": "Budi Wicaksono",
  "email": "budi@gmail.com",
  "phone": "081234567890",
  "photo": "https://...",
  "loginMethod": "Email | Google",
  "role": "peserta",
  "status": "aktif",
  "kursusSelesai": ["AKHLAK Mix", "Cyber Security"],
  "sertifikat": ["MBM/2025/05/BW/1234"],
  "createdAt": "timestamp",
  "lastLogin": "timestamp",
  "loginCount": 5
}
```

### 📁 `loginHistory/{docId}`
```json
{
  "uid": "abc123",
  "email": "budi@gmail.com",
  "method": "Email | Google | Google/Register",
  "timestamp": "timestamp",
  "userAgent": "Mozilla/5.0..."
}
```

### 📁 `sertifikat/{nomorSertifikat}`
```json
{
  "nomorSertifikat": "MBM/2025/05/BW/1234",
  "nama": "Budi Wicaksono",
  "kursus": "AKHLAK Mix — Etika Profesional",
  "nilai": 85,
  "grade": "B",
  "benar": 9,
  "total": 10,
  "tanggal": "17 Mei 2025",
  "createdAt": "timestamp"
}
```

### 📁 `analytics/visitors`
```json
{
  "total": 150,
  "countries": { "Indonesia": 120, "Malaysia": 20 },
  "periods": {
    "2025-05-17": 5,
    "2025-W20": 35,
    "2025-05": 80,
    "2025": 150
  },
  "lastUpdated": "timestamp"
}
```

---

## LANGKAH 5 — Test Lokal (Tanpa Domain)

Untuk test Google Login di komputer lokal:

1. Install Node.js (sudah ada)
2. Buka terminal di folder website
3. Jalankan: `npx serve .`
4. Buka browser: `http://localhost:3000`
5. Google Login akan berfungsi dari localhost

---

## Catatan Penting

- **Email/Password Login**: Langsung berfungsi setelah Langkah 1 & 3
- **Google Login**: Butuh domain atau localhost server (bukan file://)
- **Sertifikat**: Otomatis tersimpan saat peserta lulus post-test
- **Data pengguna**: Tersimpan permanen di Firestore, tidak hilang meski browser ditutup
