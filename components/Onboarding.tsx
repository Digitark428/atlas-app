"use client";

import { Logo } from "./Logo";

export function Onboarding({ onStart }: { onStart: () => void }) {
  return (
    <div className="full-height" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background layers */}
      <div style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(200,164,122,0.12), transparent 70%), " +
          "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(80,50,30,0.18), transparent 60%)",
      }} />

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }} preserveAspectRatio="none">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
      }} />

      <div className="full-height" style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "40px 32px 36px",
      }}>
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
          <Logo size={44} />
        </div>

        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 34,
            fontWeight: 200,
            color: "#fff",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: 18,
          }}>
            Simple.<br />Puissant.
          </div>
          <div style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.3px",
            lineHeight: 1.6,
            maxWidth: 220,
          }}>
            Fait pour les athlètes qui mesurent leur progression.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button className="btn btn-primary" onClick={onStart}>
            Commencer · 30 jours offerts
          </button>
          <button className="btn btn-ghost" onClick={onStart}>
            J&rsquo;ai déjà un compte
          </button>
          <div style={{
            textAlign: "center",
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.4px",
            marginTop: 6,
          }}>
            Puis 3,90 € par mois · résiliable
          </div>
        </div>
      </div>
    </div>
  );
}
