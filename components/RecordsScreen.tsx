"use client";

import { Card } from "./Card";
import { Movement, pal, gradBg } from "@/lib/types";

interface RecordsScreenProps {
  name: string;
  movements: Movement[];
  onOpenSettings: () => void;
}

export function RecordsScreen({ name, movements, onOpenSettings }: RecordsScreenProps) {
  const total = movements.reduce((s, m) => s + m.value, 0);
  const totalLabel = total.toLocaleString("fr-FR").replace(/,/g, " ").replace(/\u202f/g, " ");

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: 8, marginBottom: 32 }}>
        <div>
          <div className="overline">Records</div>
          <div className="title">{name}</div>
        </div>
        <button onClick={onOpenSettings} style={{ padding: 6, color: "rgba(255,255,255,0.5)" }} aria-label="Réglages">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="2.5" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      <div style={{ marginBottom: 40 }}>
        <div className="overline" style={{ marginBottom: 12 }}>
          Total · {movements.length} mouvements
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: 64, fontWeight: 200, color: "#fff", letterSpacing: "-2.5px", lineHeight: 1 }}>
            {totalLabel}
          </span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>kg</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {movements.map((m, i) => {
          const c = pal(m.color);
          return (
            <Card key={m.id} background={gradBg(c)} border={c.border} flareDelay={i * 0.9}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: 5,
                    height: 30,
                    borderRadius: 3,
                    background: `linear-gradient(180deg, ${c.text}, ${c.text}80)`,
                    opacity: 0.85,
                    flexShrink: 0,
                  }} />
                  <div style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.92)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {m.name}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: c.text, letterSpacing: "0.3px" }}>
                    {m.delta >= 0 ? "+" : ""}{m.delta} %
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 300, color: "#fff", letterSpacing: "-0.5px", minWidth: 52, textAlign: "right" }}>
                    {m.value}<span className="kg-suffix">kg</span>
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
