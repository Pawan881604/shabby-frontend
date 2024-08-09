// /frontend/middleware.ts or /frontend/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Set the Referrer-Policy header
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
