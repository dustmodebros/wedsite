/**
 * Google Apps Script for Wedding RSVP Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet (or use an existing one)
 * 2. In the first row, add these headers: Timestamp, Name, Response Type, Selected Option
 * 3. Open Extensions > Apps Script
 * 4. Delete the default code and paste this entire file
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web App URL and use it as VITE_GOOGLE_SHEETS_URL in your .env file
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const { name, responseType, selectedOption } = data;

    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add a new row with the RSVP data
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      name || '',
      responseType || '',
      selectedOption || ''
    ]);

    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Log error for debugging
    Logger.log('Error in doPost: ' + error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS request for CORS preflight
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Test function to verify the script works
function test() {
  const testData = {
    name: "Test User",
    responseType: "yes",
    selectedOption: "Test option"
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

