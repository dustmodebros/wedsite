# Google Sheets Integration Setup

This guide will help you set up Google Sheets to store your wedding RSVP responses.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet (or use an existing one)
3. Name it something like "Wedding RSVPs"
4. In the first row (Row 1), add these column headers:
   - **A1**: `Timestamp`
   - **B1**: `Name`
   - **C1**: `Response Type`
   - **D1**: `Selected Option`

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of `google-apps-script.js` from this project
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) and give your project a name like "Wedding RSVP Handler"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Set the following:
   - **Description**: "Wedding RSVP Form Handler" (optional)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone** ⚠️ **CRITICAL: Must be "Anyone" for browser requests to work**
4. Click **Deploy**
5. **IMPORTANT**: You'll see a popup asking for authorization. Click **Authorize access**
6. Choose your Google account
7. You may see a warning that the app isn't verified - click **Advanced** → **Go to [Your Project Name] (unsafe)**
8. Click **Allow** to grant permissions
9. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/...`)
10. **IMPORTANT**: Make sure the URL ends with `/exec` (not `/dev`)

**If you get CORS errors:**
- Make sure "Who has access" is set to **"Anyone"** (not "Only myself")
- Redeploy the script after making changes
- The app will use `no-cors` mode as a fallback, which still saves data but can't verify the response

## Step 4: Configure Your React App

1. In your project root, create a `.env` file (copy from `.env.example` if it exists)
2. Add your Web App URL:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Restart your development server (`npm run dev` or `bun run dev`)

## Step 5: Test It!

1. Fill out the RSVP form on your website
2. Submit a response
3. Check your Google Sheet - you should see a new row with the response data!

## Troubleshooting

- **"Script function not found"**: Make sure you saved the Apps Script code
- **"Access denied"**: Make sure you set "Who has access" to "Anyone" in the deployment settings
- **Data not appearing**: Check the Apps Script execution log (View → Executions) for errors
- **CORS errors**: Make sure you're using the correct Web App URL (ends with `/exec`)

## Viewing Responses

Simply open your Google Sheet to see all RSVP responses in real-time! You can:
- Sort and filter responses
- Export to CSV
- Share with others (view-only or edit access)
- Create charts and summaries

