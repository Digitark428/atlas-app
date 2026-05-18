"use client";

import { Movement } from "@/lib/types";

interface HistoryScreenProps {
  movement: Movement;
  onBack: () => void;
}

export function HistoryScreen({ movement, onBack }: HistoryScreenProps) {
  const history = movement.history;

  // Build path
  let pathD = "";
  let areaD = "";
  if (history.length > 0) {
    const reversed = [...history].reverse(); // chrono
    const values = reversed.map(h => h.w);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = Math.max(1, max - min);
    const w = 280;
    const h = 100;
    const pts = reversed.map((entry, i) => {
      const x = reversed.length === 1 ? w / 2 : (i / (reversed.length - 1)) * w;
      const y = h - 18 - ((entry.w - min) / range) * (h - 36);
      return { x, y };
    });
    pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    areaD = pathD + ` L ${w},${h} L 0,${h} Z`;
  }

  return (
    <div className="screen">
      <button
        onClick={onBack}
        style={{
          color: "var(--text-mid)",
          fontSize: 13,
          padding: "8px 0",
          marginTop: 4,
          marginBottom: 18,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Retour
      </button>

      <div className="overline" style={{ marginBottom: 8 }}>{movement.name}</div>
      <div className="title" style={{ marginBottom: 32 }}>Historique</div>

      {history.length > 0 ? (
        <svg viewBox="0 0 280 100" style={{ width: "100%", height: 100, marginBottom: 36 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="hist-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c8a47a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c8a47a" stopOpacity="0" />
            </linearGradient>
          </defs>
          {history.length > 1 && <path d={areaD} fill="url(#hist-grad)" />}
          <path d={pathD} fill="none" stroke="#c8a47a" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      ) : (
        <div style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 36, textAlign: "center", padding: "30px 0" }}>
          Aucun record enregistré
        </div>
      )}

      <div className="overline" style={{ marginBottom: 16 }}>Tous les records</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {history.map((h, i) => {
          const isLast = i === history.length - 1;
          const isLatest = i === 0;
          return (
            <div
              key={`${h.d}-${i}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: isLast ? "none" : "0.5px solid var(--border)",
              }}
            >
              <div>
                <div style={{
                  fontSize: 15,
                  color: isLatest ? "#fff" : "rgba(255,255,255,0.85)",
                }}>
                  {h.w} kg
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
                  {h.d}
                </div>
              </div>
              {isLatest && (
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  background: "rgba(200,164,122,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21" fill="#c8a47a" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
