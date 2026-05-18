"use client";

import { Movement, pal } from "@/lib/types";

interface SettingsScreenProps {
  movements: Movement[];
  onBack: () => void;
  onEdit: (movementId: string) => void;
  onAdd: () => void;
  onResetOnboarding: () => void;
}

export function SettingsScreen({ movements, onBack, onEdit, onAdd, onResetOnboarding }: SettingsScreenProps) {
  return (
    <div className="screen">
      <button
        onClick={onBack}
        style={{ color: "var(--text-mid)", fontSize: 13, padding: "8px 0", marginTop: 4, marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Retour
      </button>

      <div className="overline" style={{ marginBottom: 8 }}>Réglages</div>
      <div className="title" style={{ marginBottom: 28 }}>Mouvements</div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {movements.map(m => {
          const c = pal(m.color);
          return (
            <button
              key={m.id}
              onClick={() => onEdit(m.id)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 4px",
                borderBottom: "0.5px solid var(--border)",
                width: "100%",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: c.text,
                  opacity: 0.85,
                }} />
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)" }}>{m.name}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          );
        })}
      </div>

      <button
        onClick={onAdd}
        style={{
          marginTop: 18,
          width: "100%",
          padding: "14px 0",
          color: "var(--text-mid)",
          border: "0.5px dashed rgba(255,255,255,0.18)",
          borderRadius: 14,
          fontSize: 12,
          letterSpacing: "0.3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Ajouter un mouvement
      </button>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: "0.5px solid var(--border)" }}>
        <div className="overline" style={{ marginBottom: 12 }}>Compte</div>
        <button
          onClick={() => { if (confirm("Réinitialiser et revenir à l'écran d'accueil ?")) onResetOnboarding(); }}
          style={{
            color: "var(--text-mid)",
            fontSize: 13,
            padding: "10px 0",
            letterSpacing: "0.2px",
          }}
        >
          Réinitialiser l&rsquo;application
        </button>
      </div>
    </div>
  );
}
