/**
 * Quatro ilustracoes vetoriais pra herois das paginas internas.
 * Mesmo vocabulario visual da MarmitaIllustration da home:
 * aco escovado, laranja quente, carimbo e etiqueta.
 */

/* paleta compartilhada */
const INK = '#2A1F18';
const CREAM = '#F5EFE4';
const ORANGE = '#F97316';
const ORANGE_DEEP = '#C84C09';
const FAINT = '#80725F';

/* glow comum em volta das ilustracoes */
function Glow() {
  return (
    <defs>
      <radialGradient id="heroGlow" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stopColor={ORANGE} stopOpacity="0.35" />
        <stop offset="55%" stopColor={ORANGE} stopOpacity="0.06" />
        <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
      </radialGradient>
      <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E7D9C1" />
        <stop offset="25%" stopColor="#C9B798" />
        <stop offset="60%" stopColor="#6B5A49" />
        <stop offset="100%" stopColor="#2A1F18" />
      </linearGradient>
      <linearGradient id="metalLid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F2E4C7" />
        <stop offset="40%" stopColor="#C5B092" />
        <stop offset="100%" stopColor="#5C4938" />
      </linearGradient>
      <radialGradient id="hotFill" cx="50%" cy="20%" r="80%">
        <stop offset="0%" stopColor={ORANGE} />
        <stop offset="45%" stopColor={ORANGE_DEEP} />
        <stop offset="100%" stopColor="#1A0A00" />
      </radialGradient>
    </defs>
  );
}

/* ──────────────────────────────────────────────────────────────
   TEMPLATES — cardapio aberto de madeira com 3 pratos listados
   ────────────────────────────────────────────────────────────── */
export function TemplatesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 440" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Cardapio aberto com tres pratos">
      <Glow />
      <circle cx="240" cy="240" r="200" fill="url(#heroGlow)" />

      {/* prancheta de madeira do cardapio */}
      <g>
        <path
          d="M 70 70 L 410 70 L 410 390 L 70 390 Z"
          fill="#3A2918"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M 78 78 L 402 78 L 402 382 L 78 382 Z"
          fill={CREAM}
        />
        {/* dois buracos de pedaco grampeado no topo */}
        <circle cx="140" cy="60" r="4" fill={INK} />
        <circle cx="340" cy="60" r="4" fill={INK} />
        {/* string prendendo */}
        <path d="M 140 60 Q 240 40, 340 60" stroke="#8B5A2B" strokeWidth="1.5" fill="none" />
      </g>

      {/* cabecalho do cardapio */}
      <text x="240" y="115" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="22" fill={INK}>
        cardápio da casa
      </text>
      <line x1="140" y1="130" x2="340" y2="130" stroke={ORANGE_DEEP} strokeWidth="1" />

      {/* tres linhas de pratos */}
      {[
        { y: 170, name: 'Feijão com Arroz', price: 'R$ 97', dot: ORANGE },
        { y: 230, name: 'Prato Feito', price: 'R$ 197', dot: ORANGE },
        { y: 290, name: 'À la Carte', price: 'R$ 397', dot: ORANGE_DEEP },
      ].map((p, i) => (
        <g key={i}>
          <circle cx="110" cy={p.y - 5} r="4" fill={p.dot} />
          <text x="125" y={p.y} fontFamily="Georgia, serif" fontSize="18" fill={INK}>
            {p.name}
          </text>
          <text x="370" y={p.y} textAnchor="end" fontFamily="Georgia, serif" fontSize="18" fontStyle="italic" fill={ORANGE_DEEP}>
            {p.price}
          </text>
          <line x1="110" y1={p.y + 8} x2="370" y2={p.y + 8} stroke={INK} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.4" />
        </g>
      ))}

      {/* observacao do chef */}
      <text x="240" y="345" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="12" fill={FAINT}>
        servido em 7 dias · garantia de devolução
      </text>

      {/* carimbo */}
      <g transform="translate(380 310) rotate(-10)">
        <circle cx="0" cy="0" r="35" fill="none" stroke={ORANGE_DEEP} strokeWidth="2" opacity="0.85" />
        <text x="0" y="-8" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" letterSpacing="1.5" fontWeight="700" fill={ORANGE_DEEP}>
          FRESCO
        </text>
        <text x="0" y="8" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" fill={ORANGE_DEEP}>
          hoje
        </text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   PLANOS — tres potes alinhados em tamanhos crescentes
   ────────────────────────────────────────────────────────────── */
export function PlanosIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 440" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Tres potes em tamanhos crescentes">
      <Glow />
      <circle cx="240" cy="260" r="220" fill="url(#heroGlow)" />

      {/* chao/prateleira */}
      <rect x="40" y="370" width="400" height="2" fill={INK} opacity="0.3" />

      {/* Pote 1 — Feijao */}
      <g transform="translate(90 240)">
        <ellipse cx="40" cy="-8" rx="42" ry="8" fill="url(#metalLid)" />
        <path d="M 2 0 L 10 125 Q 40 135, 78 125 L 76 0 Q 40 10, 2 0 Z" fill="url(#metal)" />
        <ellipse cx="40" cy="5" rx="38" ry="4" fill={ORANGE_DEEP} opacity="0.7" />
        <text x="40" y="70" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontStyle="italic" fill={CREAM}>
          feijão
        </text>
        <text x="40" y="150" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontStyle="italic" fill={ORANGE_DEEP}>
          R$ 97
        </text>
      </g>

      {/* Pote 2 — Prato Feito (medio, destaque) */}
      <g transform="translate(195 190)">
        <ellipse cx="45" cy="-10" rx="48" ry="9" fill="url(#metalLid)" />
        <path d="M 3 0 L 12 175 Q 45 188, 87 175 L 85 0 Q 45 12, 3 0 Z" fill="url(#metal)" />
        <ellipse cx="45" cy="6" rx="42" ry="5" fill={ORANGE} />
        <text x="45" y="80" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic" fill={CREAM}>
          prato feito
        </text>
        <text x="45" y="200" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontStyle="italic" fontWeight="600" fill={ORANGE}>
          R$ 197
        </text>
        {/* fitinha de "recomendado" */}
        <g transform="translate(-35 -5) rotate(-18)">
          <rect x="0" y="0" width="60" height="18" fill={ORANGE_DEEP} />
          <text x="30" y="13" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fontWeight="700" letterSpacing="1" fill={CREAM}>
            RECOMENDO
          </text>
        </g>
      </g>

      {/* Pote 3 — A la Carte (maior) */}
      <g transform="translate(305 220)">
        <ellipse cx="50" cy="-12" rx="52" ry="10" fill="url(#metalLid)" />
        <path d="M 2 0 L 12 145 Q 50 158, 97 145 L 96 0 Q 50 12, 2 0 Z" fill="url(#metal)" />
        <ellipse cx="50" cy="5" rx="47" ry="5" fill={ORANGE_DEEP} opacity="0.85" />
        <text x="50" y="75" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fontStyle="italic" fill={CREAM}>
          à la carte
        </text>
        <text x="50" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontStyle="italic" fill={ORANGE_DEEP}>
          R$ 397
        </text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   CASES — marmita com carimbo "ENTREGUE" e ticket
   ────────────────────────────────────────────────────────────── */
export function CasesIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 440" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Marmita entregue com ticket de pedido">
      <Glow />
      <circle cx="240" cy="240" r="200" fill="url(#heroGlow)" />

      {/* caixa de entrega */}
      <g transform="translate(90 180)">
        {/* corpo da caixa marrom (vista 3D) */}
        <path d="M 0 60 L 160 60 L 160 200 L 0 200 Z" fill="#6B4E32" />
        <path d="M 0 60 L 40 20 L 200 20 L 160 60 Z" fill="#8B6440" />
        <path d="M 160 60 L 200 20 L 200 160 L 160 200 Z" fill="#4E3722" />
        {/* fita */}
        <rect x="70" y="20" width="20" height="180" fill={ORANGE_DEEP} opacity="0.85" />
        {/* etiqueta grampeada */}
        <g transform="translate(20 90)">
          <rect x="0" y="0" width="80" height="60" fill={CREAM} stroke={INK} strokeWidth="1" />
          <circle cx="10" cy="10" r="3" fill={INK} />
          <text x="40" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fontStyle="italic" fill={FAINT}>
            pedido
          </text>
          <text x="40" y="38" textAnchor="middle" fontFamily="Georgia, serif" fontSize="18" fontWeight="600" fill={INK}>
            #001
          </text>
          <text x="40" y="52" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8" fill={FAINT}>
            ApexEnem
          </text>
        </g>
      </g>

      {/* marmita em cima da caixa (um pote pequeno) */}
      <g transform="translate(300 170)">
        <ellipse cx="45" cy="-8" rx="48" ry="8" fill="url(#metalLid)" />
        <path d="M 3 0 L 12 100 Q 45 112, 87 100 L 85 0 Q 45 10, 3 0 Z" fill="url(#metal)" />
        <ellipse cx="45" cy="5" rx="42" ry="5" fill={ORANGE} />
        {/* vapor */}
        <path d="M 30 -25 Q 25 -45, 35 -60" stroke={CREAM} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M 55 -25 Q 65 -45, 55 -60" stroke={CREAM} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
      </g>

      {/* carimbo ENTREGUE grande */}
      <g transform="translate(370 300) rotate(-14)">
        <circle cx="0" cy="0" r="55" fill="none" stroke={ORANGE_DEEP} strokeWidth="3" />
        <circle cx="0" cy="0" r="48" fill="none" stroke={ORANGE_DEEP} strokeWidth="1" opacity="0.5" />
        <text x="0" y="-15" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" letterSpacing="2" fontWeight="700" fill={ORANGE_DEEP}>
          STATUS
        </text>
        <text x="0" y="8" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontStyle="italic" fill={ORANGE_DEEP}>
          entregue
        </text>
        <text x="0" y="24" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" letterSpacing="2" fontWeight="700" fill={ORANGE_DEEP}>
          NO AR
        </text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   FORA DO CARDAPIO — panela fechada com simbolos tecnicos saindo
   ────────────────────────────────────────────────────────────── */
export function ForaIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 440" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Panela com simbolos tecnicos saindo no vapor">
      <Glow />
      <circle cx="240" cy="260" r="200" fill="url(#heroGlow)" />

      {/* simbolos subindo no vapor */}
      <g opacity="0.85">
        {/* wifi */}
        <g transform="translate(130 70)" fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
          <path d="M -12 10 Q 0 -5, 12 10" />
          <path d="M -7 5 Q 0 -3, 7 5" />
          <circle cx="0" cy="8" r="2" fill={CREAM} stroke="none" />
        </g>
        {/* engrenagem */}
        <g transform="translate(240 50)" opacity="0.65">
          <circle cx="0" cy="0" r="12" fill="none" stroke={CREAM} strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill={CREAM} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="-2"
              y="-18"
              width="4"
              height="6"
              fill={CREAM}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
        {/* chat bubble */}
        <g transform="translate(340 85)" opacity="0.7">
          <path d="M -15 -8 L 15 -8 Q 20 -8, 20 -3 L 20 6 Q 20 11, 15 11 L 5 11 L 0 18 L 0 11 L -15 11 Q -20 11, -20 6 L -20 -3 Q -20 -8, -15 -8 Z" fill={CREAM} />
          <circle cx="-7" cy="2" r="1.5" fill={INK} />
          <circle cx="0" cy="2" r="1.5" fill={INK} />
          <circle cx="7" cy="2" r="1.5" fill={INK} />
        </g>
      </g>

      {/* vapor em fios cheio */}
      <g opacity="0.6">
        <path d="M 150 140 Q 140 110, 155 85 Q 170 60, 150 40" stroke={CREAM} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
        <path d="M 240 135 Q 250 100, 235 70 Q 220 40, 240 15" stroke={CREAM} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M 335 140 Q 345 110, 330 85 Q 315 60, 335 40" stroke={CREAM} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
      </g>

      {/* tampa */}
      <g>
        <ellipse cx="240" cy="165" rx="130" ry="18" fill="url(#metalLid)" />
        <ellipse cx="240" cy="160" rx="125" ry="14" fill={CREAM} opacity="0.2" />
        {/* alca da tampa */}
        <rect x="222" y="138" width="36" height="20" rx="10" fill={INK} />
        <rect x="228" y="143" width="24" height="5" rx="2" fill={CREAM} opacity="0.3" />
      </g>

      {/* panela larga */}
      <path
        d="M 115 180 L 128 365 Q 240 388, 352 365 L 365 180 Q 240 205, 115 180 Z"
        fill="url(#metal)"
      />

      {/* alcas laterais */}
      <ellipse cx="108" cy="230" rx="16" ry="10" fill={INK} />
      <ellipse cx="372" cy="230" rx="16" ry="10" fill={INK} />

      {/* base */}
      <ellipse cx="240" cy="370" rx="115" ry="12" fill="#0F0804" />

      {/* interrogacao estampada */}
      <text x="240" y="300" textAnchor="middle" fontFamily="Georgia, serif" fontSize="90" fontStyle="italic" fontWeight="600" fill={ORANGE_DEEP} opacity="0.85">
        ?
      </text>
    </svg>
  );
}
