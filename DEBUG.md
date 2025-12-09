# Debugging Google Sheets Integration

## Step 1: Check if .env file exists

Run this in your terminal:
```bash
cat .env
```

If the file doesn't exist or is empty, create it:
```bash
echo "VITE_GOOGLE_SHEETS_URL=your_url_here" > .env
```

## Step 2: Verify the URL format

Your `VITE_GOOGLE_SHEETS_URL` should look like:
```
https://script.google.com/macros/s/AKfycby.../exec
```

**Important**: Make sure it ends with `/exec` (not `/dev`)

## Step 3: Check browser console

1. Open your website in the browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to the Console tab
4. Submit an RSVP
5. Look for messages like:
   - "Google Sheets URL: Configured" or "Not configured"
   - "Sending RSVP data: ..."
   - "Response from Google Sheets: ..."
   - Any error messages

## Step 4: Verify Google Apps Script deployment

1. Go to your Google Sheet
2. Open Extensions → Apps Script
3. Click "Deploy" → "Manage deployments"
4. Make sure:
   - Status is "Active"
   - "Who has access" is set to "Anyone"
   - You've authorized the script (click "Authorize access" if needed)

## Step 5: Test the Google Apps Script directly

1. In Apps Script, click the function dropdown
2. Select `test` function
3. Click Run ▶️
4. Check the Execution log (View → Executions)
5. Check your Google Sheet - you should see a test row

## Step 6: Check Google Apps Script execution logs

1. In Apps Script, go to View → Executions
2. Look for recent executions when you submit the form
3. Check if there are any errors

## Step 7: Common Issues

### Issue: "Google Sheets URL not configured"
**Solution**: Create a `.env` file with your Web App URL

### Issue: CORS errors in browser console
**Solution**: 
- Make sure the deployment has "Who has access" set to "Anyone"
- Redeploy the script after making changes

### Issue: "Script function not found"
**Solution**: 
- Make sure you saved the Apps Script code
- Make sure the function is named `doPost` (case-sensitive)

### Issue: Data not appearing in sheet
**Solution**:
- Check the Apps Script execution logs for errors
- Make sure the sheet has the correct headers in row 1
- Try running the `test` function manually

### Issue: "Access denied" or authorization errors
**Solution**:
- In the deployment, click "Authorize access"
- Grant all requested permissions
- You may need to click "Advanced" → "Go to [Project Name] (unsafe)" if you see a warning

## Step 8: Manual test with curl

Test your Google Apps Script URL directly:

```bash
curl -X POST "YOUR_GOOGLE_SHEETS_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","responseType":"yes","selectedOption":"Test option"}'
```

If this works, you should see `{"success":true}` and a new row in your sheet.

