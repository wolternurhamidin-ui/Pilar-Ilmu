// ==========================================
// GOOGLE APPS SCRIPT for Portfolio Registration
// ==========================================
// 1. Buat Google Sheet baru
// 2. Buka Extensions > Apps Script
// 3. Copy-paste kode di bawah ini
// 4. Deploy sebagai Web App
// 5. Copy Web App URL dan ganti GOOGLE_SHEETS_URL di portfolio_v3.html
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
    const ipAddress = getClientIP();
    const userAgent = getUserAgent();

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
    const ipAddress = getClientIP();
    const userAgent = getUserAgent();

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

function getClientIP() {
  try {
    return e.parameter.ip || 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
}

function getUserAgent() {
  try {
    return e.parameter.userAgent || 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
}

// Fungsi untuk testing (opsional)
function testAddUser() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    uid: 'test-uid-123',
    role: 'user',
    status: 'active'
  };

  const result = addUserToSheet(testData);
  Logger.log('Test result: ' + result.getContent());
}