/**
 * Ilustracao vetorial de uma marmita em acos inox com tampa
 * suspensa, vapor saindo, e um codigo visivel la dentro.
 * Pensado pra viver no hero: traz o assunto do site pra vista.
 */
export function MarmitaIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustracao de uma marmita de aco com codigo dentro e vapor subindo"
    >
      <defs>
        {/* glow atras da marmita */}
        <radialGradient id="glow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#F97316" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#F97316" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>

        {/* corpo do pote: metal escovado */}
        <linearGradient id="pot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7D9C1" />
          <stop offset="18%" stopColor="#C9B798" />
          <stop offset="55%" stopColor="#6B5A49" />
          <stop offset="100%" stopColor="#2A1F18" />
        </linearGradient>

        {/* reflexo superior do pote */}
        <linearGradient id="potShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5EFE4" stopOpacity="0" />
          <stop offset="30%" stopColor="#F5EFE4" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#F5EFE4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F5EFE4" stopOpacity="0" />
        </linearGradient>

        {/* tampa suspensa */}
        <linearGradient id="lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2E4C7" />
          <stop offset="40%" stopColor="#C5B092" />
          <stop offset="100%" stopColor="#5C4938" />
        </linearGradient>

        {/* interior quente — codigo e comida misturados */}
        <radialGradient id="inside" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="45%" stopColor="#C84C09" />
          <stop offset="100%" stopColor="#1A0A00" />
        </radialGradient>

        {/* fumaca */}
        <linearGradient id="steam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#F5EFE4" stopOpacity="0" />
          <stop offset="40%" stopColor="#F5EFE4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F5EFE4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* glow de fundo */}
      <circle cx="240" cy="260" r="220" fill="url(#glow)" />

      {/* fumaca — tres fios sinuosos */}
      <g opacity="0.9">
        <path
          d="M 170 95 Q 160 55, 180 30 Q 200 5, 180 -20"
          stroke="url(#steam)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 230 80 Q 215 45, 240 15 Q 265 -15, 240 -45"
          stroke="url(#steam)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 290 100 Q 305 65, 285 35 Q 265 5, 290 -20"
          stroke="url(#steam)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* tampa suspensa inclinada */}
      <g transform="translate(135 90) rotate(-14)">
        <ellipse cx="110" cy="18" rx="105" ry="18" fill="url(#lid)" />
        <ellipse cx="110" cy="14" rx="105" ry="14" fill="#F5EFE4" opacity="0.15" />
        {/* alca da tampa */}
        <rect x="95" y="-14" width="30" height="16" rx="8" fill="#2A1F18" />
        <rect x="100" y="-10" width="20" height="4" rx="2" fill="#F5EFE4" opacity="0.4" />
      </g>

      {/* vapor saindo da boca do pote */}
      <ellipse cx="240" cy="188" rx="130" ry="10" fill="#F5EFE4" opacity="0.12" />

      {/* interior visivel: comida/codigo laranja quente */}
      <ellipse cx="240" cy="200" rx="128" ry="22" fill="url(#inside)" />

      {/* linhas de "codigo" flutuando na superficie */}
      <g fontFamily="ui-monospace, SFMono-Regular, monospace" fontSize="10" fill="#FFE8C8" opacity="0.85">
        <text x="150" y="196">const site =</text>
        <text x="235" y="204" opacity="0.75">pronto()</text>
        <text x="175" y="210" opacity="0.6">&lt;/MarmitaCode&gt;</text>
      </g>

      {/* corpo do pote */}
      <path
        d="M 112 200
           L 130 410
           Q 240 440, 350 410
           L 368 200
           Q 240 230, 112 200 Z"
        fill="url(#pot)"
      />

      {/* reflexo do pote */}
      <path
        d="M 115 220 Q 240 250, 365 220 L 362 240 Q 240 268, 118 240 Z"
        fill="url(#potShine)"
        opacity="0.55"
      />

      {/* sombras verticais do pote */}
      <path d="M 160 215 L 175 415" stroke="#1A0E06" strokeWidth="1.5" opacity="0.4" />
      <path d="M 320 215 L 305 415" stroke="#1A0E06" strokeWidth="1.5" opacity="0.4" />

      {/* base do pote */}
      <ellipse cx="240" cy="415" rx="112" ry="14" fill="#0F0804" />
      <ellipse cx="240" cy="413" rx="108" ry="10" fill="#1F1710" />

      {/* etiqueta de preco grampeada */}
      <g transform="translate(300 300) rotate(12)">
        <rect
          x="0"
          y="0"
          width="90"
          height="56"
          fill="#F5EFE4"
          stroke="#2A1F18"
          strokeWidth="1"
        />
        <circle cx="10" cy="10" r="3" fill="#2A1F18" />
        <text
          x="45"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="11"
          fill="#80725F"
          fontStyle="italic"
        >
          a partir de
        </text>
        <text
          x="45"
          y="46"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fontWeight="600"
          fill="#C84C09"
          fontStyle="italic"
        >
          R$ 97
        </text>
      </g>

      {/* carimbo CHEF */}
      <g transform="translate(70 335) rotate(-10)">
        <circle
          cx="42"
          cy="42"
          r="40"
          fill="none"
          stroke="#F97316"
          strokeWidth="2.5"
          opacity="0.9"
        />
        <text
          x="42"
          y="30"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="7"
          fontWeight="700"
          letterSpacing="2"
          fill="#F97316"
        >
          APROVADO
        </text>
        <text
          x="42"
          y="50"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="18"
          fontStyle="italic"
          fill="#F97316"
        >
          chef
        </text>
        <text
          x="42"
          y="62"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="7"
          fontWeight="700"
          letterSpacing="2"
          fill="#F97316"
        >
          NA COZINHA
        </text>
      </g>
    </svg>
  );
}
