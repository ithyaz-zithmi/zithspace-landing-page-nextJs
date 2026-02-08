import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 1x1 transparent GIF
const TRANSPARENT_GIF = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

const DATA_FILE = path.join(process.cwd(), 'data', 'tracking.json');

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

function appendTrackingRecord(record) {
  ensureDataDir();
  
  let records = [];
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    records = JSON.parse(data);
  } catch {
    records = [];
  }
  
  records.push(record);
  fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract tracking info
    const headers = request.headers;
    const record = {
      timestamp: new Date().toISOString(),
      ip: headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown',
      userAgent: headers.get('user-agent') || 'unknown',
      referrer: headers.get('referer') || 'direct',
      page: searchParams.get('page') || 'unknown',
      params: Object.fromEntries(searchParams.entries()),
    };
    
    // Store asynchronously (fire and forget)
    appendTrackingRecord(record);
    
    // Return 1x1 transparent GIF
    return new NextResponse(TRANSPARENT_GIF, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Tracking error:', error);
    // Still return the pixel even if tracking fails
    return new NextResponse(TRANSPARENT_GIF, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
      },
    });
  }
}
