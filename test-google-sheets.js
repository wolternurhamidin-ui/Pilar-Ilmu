// ==========================================
// TEST SCRIPT - Jalankan di Browser Console
// ==========================================
// 1. Buka portfolio website
// 2. Tekan F12 → Console
// 3. Copy-paste kode di bawah ini
// 4. Tekan Enter
// ==========================================

// Test data untuk dikirim ke Google Sheets
const testData = {
  action: 'addUser',
  data: {
    name: 'Test User',
    email: 'test@example.com',
    uid: 'test-uid-12345',
    role: 'user',
    status: 'active'
  }
};

// Fungsi test
async function testGoogleSheets() {
  try {
    console.log('🧪 Testing Google Sheets connection...');
    console.log('📤 Sending test data:', testData);

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('✅ Request sent successfully!');
    console.log('📊 Check your Google Sheet - should have new test data');
    console.log('🔍 If no data appears, check:');
    console.log('   1. Apps Script URL is correct');
    console.log('   2. Web App is deployed with "Anyone" access');
    console.log('   3. No syntax errors in Apps Script');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('🔧 Troubleshooting:');
    console.log('   1. Check if GOOGLE_SHEETS_URL is set correctly');
    console.log('   2. Make sure Apps Script is deployed');
    console.log('   3. Check Apps Script logs for errors');
  }
}

// Jalankan test
testGoogleSheets();

// ==========================================
// CARA LAIN TEST: Manual URL Test
// ==========================================
// 1. Copy URL di bawah ini
// 2. Ganti YOUR_SCRIPT_ID dengan ID dari Apps Script
// 3. Paste di browser address bar
// 4. Tekan Enter
// ==========================================
// https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=test
// ==========================================</content>
<parameter name="filePath">c:\Users\ps4gr\Downloads\portfolio-wolter\test-google-sheets.js