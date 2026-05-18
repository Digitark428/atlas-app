"use client";

import { Profile } from "@/lib/types";

interface RankingsScreenProps {
  profile: Profile;
  userValue: number;
}

interface Athlete {
  rank: number;
  name: string;
  city: string;
  value: number;
  color: string;
  initials: string;
  you?: boolean;
}

export function RankingsScreen({ profile, userValue }: RankingsScreenProps) {
  const initials = profile.name
    .split(" ")
    .map(p => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const ranks: Athlete[] = [
    { rank: 1, name: "Thomas L.", city: "Lyon", value: 250, color: "#3a2a1e", initials: "TL" },
    { rank: 2, name: "Lucas D.", city: "Paris", value: 230, color: "#1e2a3a", initials: "LD" },
    { rank: 3, name: "Antoine R.", city: "Marseille", value: 215, color: "#2a1e2a", initials: "AR" },
    { rank: 4, name: "Hugo M.", city: "Bordeaux", value: 210, color: "#1e2a2a", initials: "HM" },
    { rank: 5, name: "Étienne P.", city: "Paris", value: 205, color: "#2a2a1e", initials: "ÉP" },
    { rank: 6, name: "Mathis B.", city: "Lille", value: 200, color: "#251e2a", initials: "MB" },
    { rank: 142, name: profile.name, city: profile.city, value: userValue, color: "#2a2520", initials, you: true },
  ];

  return (
    <div className="screen">
      <div style={{ marginTop: 8, marginBottom: 28 }}>
        <div className="overline">Classements</div>
        <div className="title">Soulevé · France</div>
      </div>

      <div className="scroll-x" style={{ marginBottom: 32 }}>
        <span className="chip chip-active">Soulevé</span>
        <span className="chip chip-default">France</span>
        <span className="chip chip-default">Toutes villes</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {ranks.map((p, idx) => (
          <div key={`${p.rank}-${p.name}`}>
            {idx === 6 && (
              <div style={{
                padding: "18px 0",
                textAlign: "center",
                color: "var(--text-faint)",
                fontSize: 14,
                letterSpacing: "4px",
              }}>
                ···
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: p.you ? "14px 16px" : "14px 0",
                margin: p.you ? "0 -16px" : 0,
                borderBottom: p.you ? "none" : "0.5px solid rgba(255,255,255,0.04)",
                background: p.you ? "rgba(200,164,122,0.06)" : "transparent",
                borderRadius: p.you ? 14 : 0,
                border: p.you ? "0.5px solid rgba(200,164,122,0.18)" : undefined,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 15,
                  fontWeight: p.you || p.rank <= 3 ? 300 : 400,
                  color: p.you ? "var(--accent)" : p.rank <= 3 ? "#fff" : "var(--text-dim)",
                  minWidth: 34,
                  letterSpacing: "-0.3px",
                }}>
                  #{p.rank}
                </div>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${p.color}, #0a0a0a)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: p.you ? "var(--accent)" : "rgba(255,255,255,0.85)",
                  fontWeight: 500,
                  border: p.you ? "0.5px solid rgba(200,164,122,0.4)" : "0.5px solid rgba(255,255,255,0.08)",
                  flexShrink: 0,
                  letterSpacing: "0.3px",
                }}>
                  {p.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: 13,
                    color: p.you ? "#fff" : "rgba(255,255,255,0.9)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 1 }}>
                    {p.city}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: 17,
                fontWeight: 300,
                color: "#fff",
                letterSpacing: "-0.4px",
                flexShrink: 0,
                marginLeft: 10,
              }}>
                {p.value}<span className="kg-suffix">kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
