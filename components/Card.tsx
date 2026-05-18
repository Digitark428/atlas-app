"use client";

import { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  background: string;
  border?: string;
  radius?: number;
  padding?: string;
  flareDelay?: number;
  onClick?: () => void;
  style?: CSSProperties;
}

export function Card({
  children,
  background,
  border,
  radius = 14,
  padding = "14px 16px",
  flareDelay = 0,
  onClick,
  style,
}: CardProps) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        background,
        border: border ? `0.5px solid ${border}` : undefined,
        borderRadius: radius,
        padding,
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      <div className="flare" style={{ animationDelay: `${flareDelay}s` }} />
      {children}
    </div>
  );
}
