#!/usr/bin/env node

/**
 * Test script to add a test entry to Google Sheets
 * 
 * Usage:
 *   node test-rsvp.js
 *   node test-rsvp.js "Your Name" "yes" "Test option"
 * 
 * Make sure VITE_GOOGLE_SHEETS_URL is set in your .env file
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config({ path: join(__dirname, '.env') });

// Get URL from environment or command line
const googleSheetsUrl = process.env.VITE_GOOGLE_SHEETS_URL || process.argv[2];

if (!googleSheetsUrl) {
  console.error('❌ Error: Google Sheets URL not found!');
  console.error('');
  console.error('Options:');
  console.error('  1. Set VITE_GOOGLE_SHEETS_URL in your .env file');
  console.error('  2. Pass the URL as the first argument: node test-rsvp.js <URL>');
  process.exit(1);
}

// Get test data from command line arguments or use defaults
const testName = process.argv[3] || 'Test User';
const testResponseType = process.argv[4] || 'yes';
const testOption = process.argv[5] || 'Test option for debugging';

const testData = {
  name: testName,
  responseType: testResponseType,
  selectedOption: testOption,
};

console.log('🧪 Testing Google Sheets RSVP submission...');
console.log('');
console.log('📋 Test Data:');
console.log('   Name:', testData.name);
console.log('   Response Type:', testData.responseType);
console.log('   Selected Option:', testData.selectedOption);
console.log('');
console.log('🔗 URL:', googleSheetsUrl.substring(0, 50) + '...');
console.log('');

try {
  const response = await fetch(googleSheetsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData),
  });

  console.log('📡 Response Status:', response.status, response.statusText);
  console.log('');

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ Error Response:', errorText);
    process.exit(1);
  }

  const result = await response.text();
  console.log('📥 Response Body:', result);
  console.log('');

  try {
    const jsonResult = JSON.parse(result);
    if (jsonResult.success) {
      console.log('✅ Success! Test entry added to Google Sheets!');
      console.log('');
      console.log('💡 Check your Google Sheet to verify the entry was added.');
    } else {
      console.error('❌ Google Sheets returned an error:', jsonResult.error);
      process.exit(1);
    }
  } catch (parseError) {
    console.warn('⚠️  Response is not JSON. Raw response:', result);
    console.warn('This might still be successful - check your Google Sheet!');
  }
} catch (error) {
  console.error('❌ Failed to send test data:', error.message);
  console.error('');
  console.error('Common issues:');
  console.error('  - Check that your Google Apps Script is deployed');
  console.error('  - Verify the URL is correct and ends with /exec');
  console.error('  - Make sure "Who has access" is set to "Anyone"');
  process.exit(1);
}

