"use client";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  letterSpacing?: number;
}

export function Logo({ size = 44, showWordmark = true, letterSpacing = 6 }: LogoProps) {
  const id = `logo-grad-${size}`;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="Atlas">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e8c8a0" />
            <stop offset="100%" stopColor="#8a6940" />
          </linearGradient>
        </defs>
        <path d="M24 6 L42 38 L30 38 L24 28 L18 38 L6 38 Z" fill={`url(#${id})`} />
        <rect x="4" y="40.5" width="40" height="1" fill={`url(#${id})`} opacity="0.4" />
      </svg>
      {showWordmark && (
        <div style={{
          fontSize: 10,
          letterSpacing: `${letterSpacing}px`,
          color: "var(--accent)",
          fontWeight: 300,
          textTransform: "uppercase",
        }}>
          Atlas
        </div>
      )}
    </div>
  );
}
