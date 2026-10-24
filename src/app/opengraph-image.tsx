import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MarmitaCode — Solução entregue quentinha';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(circle at 20% 20%, #1a0f00 0%, #000 60%)',
          padding: 80,
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: '#FF8C00', fontWeight: 900 }}>
          MARMITACODE
        </div>
        <div
          style={{
            fontSize: 110,
            fontWeight: 900,
            lineHeight: 1,
            marginTop: 60,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            letterSpacing: -4,
          }}
        >
          Solução
          <br />
          entregue <span style={{ color: '#FF8C00' }}>quentinha</span>.
        </div>
        <div
          style={{
            marginTop: 'auto',
            fontSize: 28,
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 700,
          }}
        >
          Sites profissionais para pequenas empresas.
        </div>
      </div>
    ),
    { ...size }
  );
}
