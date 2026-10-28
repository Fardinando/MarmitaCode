import type { NextResponse } from 'next/server';

/**
 * Headers de segurança aplicados em todas as respostas.
 *
 * - CSP: previne XSS. Permite imagens Unsplash/Vercel/MP e fontes Google.
 * - HSTS: força HTTPS por 2 anos com preload.
 * - X-Frame-Options: previne clickjacking.
 * - X-Content-Type-Options: previne MIME sniffing.
 * - Referrer-Policy: minimiza vazamento de URL em links externos.
 * - Permissions-Policy: desabilita APIs sensíveis não usadas.
 * - X-DNS-Prefetch-Control: opt-in explícito.
 */
export function applySecurityHeaders(res: NextResponse): NextResponse {
  const csp = [
    "default-src 'self'",
    // Next inline scripts, Analytics da Vercel e MP checkout.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-insights.com https://*.vercel-analytics.com https://*.mercadopago.com https://*.mlstatic.com https://www.youtube.com https://s.ytimg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co https://*.mercadopago.com https://*.mlstatic.com https://i.ytimg.com https://*.ytimg.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://*.supabase.co https://*.vercel-insights.com https://*.vercel-analytics.com https://api.mercadopago.com https://api.resend.com https://sheets.googleapis.com",
    "frame-src 'self' https://*.mercadopago.com https://www.youtube.com https://www.youtube-nocookie.com",
    "frame-ancestors 'none'",
    "form-action 'self' https://*.mercadopago.com",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(self "https://mercadopago.com"), usb=(), magnetometer=(), accelerometer=(), gyroscope=()'
  );
  res.headers.set('X-DNS-Prefetch-Control', 'on');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  res.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  return res;
}
