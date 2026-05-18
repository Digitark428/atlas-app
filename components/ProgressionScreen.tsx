"use client";

import { Card } from "./Card";
import { Movement, pal, gradBg } from "@/lib/types";

interface ProgressionScreenProps {
  movements: Movement[];
  onNewRM: (movementId: string) => void;
  onHistory: (movementId: string) => void;
}

export function ProgressionScreen({ movements, onNewRM, onHistory }: ProgressionScreenProps) {
  return (
    <div className="screen">
      <div style={{ marginTop: 8, marginBottom: 28 }}>
        <div className="overline">Progression</div>
        <div className="title">Mes mouvements</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {movements.map((m, i) => {
          const c = pal(m.color);
          return (
            <Card
              key={m.id}
              background={gradBg(c)}
              border={c.border}
              radius={18}
              padding="18px 18px 14px"
              flareDelay={i * 0.6}
            >
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 14,
                position: "relative",
                zIndex: 2,
              }}>
                <div style={{ minWidth: 0, flex: 1, paddingRight: 10 }}>
                  <div style={{
                    fontSize: 11,
                    color: c.text,
                    letterSpacing: "0.4px",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}>
                    {m.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 32, fontWeight: 200, color: "#fff", letterSpacing: "-1.2px", lineHeight: 1 }}>
                      {m.value}
                    </span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>kg</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: c.text, letterSpacing: "0.3px", paddingTop: 4 }}>
                  {m.delta >= 0 ? "+" : ""}{m.delta} %
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 14, position: "relative", zIndex: 2 }}>
                <button
                  className="card-btn card-btn-primary"
                  onClick={() => onNewRM(m.id)}
                >
                  Nouveau RM
                </button>
                <button
                  className="card-btn card-btn-secondary"
                  onClick={() => onHistory(m.id)}
                >
                  Historique
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
