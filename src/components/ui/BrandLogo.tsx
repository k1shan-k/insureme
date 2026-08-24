import type { MarketMark } from "@/lib/marketMarks";

type BrandLogoProps = {
  brand: MarketMark["logo"];
  className?: string;
};

const textStyle = {
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: 700,
} as const;

export function BrandLogo({ brand, className = "" }: BrandLogoProps) {
  const common = {
    className,
    viewBox: "0 0 156 48",
    role: "img",
    "aria-hidden": true,
  } as const;

  switch (brand) {
    case "lloyds":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="152" height="34" rx="1" fill="#111111" />
          <text
            x="78"
            y="30.5"
            fill="white"
            fontFamily="Georgia, Times New Roman, serif"
            fontSize="20"
            fontWeight="700"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            LLOYD&apos;S
          </text>
        </svg>
      );
    case "swiss-re":
      return (
        <svg {...common}>
          <g
            fill="none"
            stroke="#D52B1E"
            strokeLinecap="round"
            strokeWidth="2.4"
          >
            <path d="M8 33V18c0-5 4-9 9-9s9 4 9 9v15" />
            <path d="M15 33V20c0-4 3-7 7-7s7 3 7 7v13" opacity=".72" />
            <path d="M22 33V22c0-3 2-5 5-5s5 2 5 5v11" opacity=".45" />
          </g>
          <text x="42" y="31" fill="#1B1B1B" fontSize="21" style={textStyle}>
            Swiss Re
          </text>
        </svg>
      );
    case "munich-re":
      return (
        <svg {...common}>
          <g fill="none" stroke="#005EB8" strokeWidth="1.8">
            <circle cx="22" cy="24" r="16" />
            <ellipse cx="22" cy="24" rx="10" ry="16" />
            <ellipse cx="22" cy="24" rx="4" ry="16" />
            <path d="M6 24h32M9 16h26M9 32h26" />
          </g>
          <text x="47" y="30.5" fill="#17365D" fontSize="18" style={textStyle}>
            Munich Re
          </text>
        </svg>
      );
    case "hannover-re":
      return (
        <svg {...common}>
          <path d="M6 11h12v10h11V11h12v26H29V27H18v10H6z" fill="#005B96" />
          <path d="M33 11h8v8zM6 29l8 8H6z" fill="#E77817" />
          <text x="49" y="22" fill="#24465C" fontSize="12.5" style={textStyle}>
            HANNOVER
          </text>
          <text x="49" y="35" fill="#E77817" fontSize="12.5" style={textStyle}>
            RE
          </text>
        </svg>
      );
    case "allianz":
      return (
        <svg {...common}>
          <circle
            cx="23"
            cy="24"
            r="18"
            fill="none"
            stroke="#003781"
            strokeWidth="2.6"
          />
          <path
            d="M13 31V17l6 4v10M22 31V15l3 2 3-2v16M31 31V21l6-4v14"
            fill="none"
            stroke="#003781"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <text x="49" y="31" fill="#003781" fontSize="21" style={textStyle}>
            Allianz
          </text>
        </svg>
      );
    case "aig":
      return (
        <svg {...common}>
          <rect
            x="4"
            y="8"
            width="61"
            height="32"
            fill="none"
            stroke="#00A4E4"
            strokeWidth="3"
          />
          <text
            x="34.5"
            y="32"
            fill="#00A4E4"
            fontSize="25"
            style={textStyle}
            textAnchor="middle"
          >
            AIG
          </text>
          <text
            x="75"
            y="29"
            fill="#46535C"
            fontSize="11"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="600"
          >
            INSURANCE
          </text>
        </svg>
      );
    case "zurich":
      return (
        <svg {...common}>
          <circle cx="23" cy="24" r="18" fill="#005EB8" />
          <path
            d="M13 15h21L17 33h18"
            fill="none"
            stroke="white"
            strokeLinecap="square"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <text x="49" y="31" fill="#005EB8" fontSize="22" style={textStyle}>
            Zurich
          </text>
        </svg>
      );
    case "marsh":
      return (
        <svg {...common}>
          <path
            d="M6 34V14l10 11 10-11 10 11 10-11v20"
            fill="none"
            stroke="#005587"
            strokeLinejoin="round"
            strokeWidth="4"
          />
          <text x="56" y="31" fill="#005587" fontSize="22" style={textStyle}>
            Marsh
          </text>
        </svg>
      );
    case "pendle":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" fill="#081A22" />
          <path
            d="M14 17c8-8 22-4 22 6 0 9-10 14-18 9 8 0 13-4 13-9 0-6-8-8-17-6z"
            fill="#37E5D2"
          />
          <text x="50" y="31" fill="#132932" fontSize="21" style={textStyle}>
            Pendle
          </text>
        </svg>
      );
    case "morpho":
      return (
        <svg {...common}>
          <g fill="#2470FF">
            <ellipse
              cx="17"
              cy="17"
              rx="11"
              ry="7"
              transform="rotate(30 17 17)"
            />
            <ellipse
              cx="31"
              cy="17"
              rx="11"
              ry="7"
              transform="rotate(-30 31 17)"
            />
            <ellipse
              cx="16"
              cy="31"
              rx="9"
              ry="6"
              transform="rotate(-28 16 31)"
              opacity=".72"
            />
            <ellipse
              cx="32"
              cy="31"
              rx="9"
              ry="6"
              transform="rotate(28 32 31)"
              opacity=".72"
            />
          </g>
          <path
            d="M24 14v21"
            stroke="#0B2C84"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <text x="50" y="31" fill="#15224C" fontSize="21" style={textStyle}>
            Morpho
          </text>
        </svg>
      );
    case "ethena":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="19" fill="#111111" />
          <path d="M14 14h20l-8 8h-8v4h8l8 8H14V14z" fill="white" />
          <path d="M25 22l9-8v20l-9-8z" fill="#B9FF66" />
          <text x="50" y="31" fill="#111111" fontSize="21" style={textStyle}>
            Ethena
          </text>
        </svg>
      );
    case "frax":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" fill="#111111" />
          <circle
            cx="24"
            cy="24"
            r="11"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          />
          <path
            d="M24 6v12M24 30v12M6 24h12M30 24h12M11 11l8 8M29 29l8 8M37 11l-8 8M19 29l-8 8"
            stroke="white"
            strokeWidth="2.5"
          />
          <text x="50" y="31" fill="#111111" fontSize="21" style={textStyle}>
            Frax
          </text>
        </svg>
      );
    case "convex":
      return (
        <svg {...common}>
          <path d="M24 5l17 10v19L24 44 7 34V15z" fill="#172321" />
          <path d="M24 9l13 8-13 8-13-8z" fill="#F45B69" />
          <path d="M11 20l13 8v12l-13-8z" fill="#43C88B" />
          <path d="M37 20l-13 8v12l13-8z" fill="#35A8E0" />
          <text x="50" y="31" fill="#172321" fontSize="20" style={textStyle}>
            Convex
          </text>
        </svg>
      );
    case "yearn":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="19" fill="#006AE3" />
          <path
            d="M14 13l10 12 10-12M24 25v11"
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <text x="50" y="31" fill="#006AE3" fontSize="21" style={textStyle}>
            yearn
          </text>
        </svg>
      );
    case "balancer":
      return (
        <svg {...common}>
          <ellipse cx="24" cy="13" rx="18" ry="7" fill="#111111" />
          <path
            d="M8 23c4 3 9 4 16 4s12-1 16-4v5c0 5-7 9-16 9S8 33 8 28z"
            fill="#111111"
          />
          <path
            d="M12 18c3 2 7 3 12 3s9-1 12-3v4c-3 2-7 3-12 3s-9-1-12-3z"
            fill="#111111"
            opacity=".62"
          />
          <text x="50" y="31" fill="#111111" fontSize="20" style={textStyle}>
            Balancer
          </text>
        </svg>
      );
    case "maple":
      return (
        <svg {...common}>
          <path
            d="M24 5l4 9 8-3-3 9 7 3-8 6 3 8-9-4-2 11-2-11-9 4 3-8-8-6 7-3-3-9 8 3z"
            fill="#E54B4B"
          />
          <path
            d="M24 16v18"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <text x="50" y="31" fill="#24232A" fontSize="21" style={textStyle}>
            Maple
          </text>
        </svg>
      );
  }
}
