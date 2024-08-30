export function getSiteURL() {
  let url = process.env.NEXT_PUBLIC_SITE_URL ??
  // Set this to your site URL in production env.
  process.env.NEXT_PUBLIC_VERCEL_URL ??
  // Automatically set by Vercel.
  // 'https://shabby-backend.vercel.app';
  // 'https://shabby-backend.onrender.com'
  'http://localhost:7000'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://shabby-backend.vercel.app`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}