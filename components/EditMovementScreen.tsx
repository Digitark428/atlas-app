"use client";

import { useState } from "react";
import { Movement, gradBg, PALETTE, PaletteId } from "@/lib/types";

interface EditMovementScreenProps {
  movement: Movement;
  onBack: () => void;
  onSave: (patch: Partial<Movement>) => void;
  onDelete: () => void;
}

export function EditMovementScreen({ movement, onBack, onSave, onDelete }: EditMovementScreenProps) {
  const [name, setName] = useState(movement.name);
  const [color, setColor] = useState<PaletteId>(movement.color);

  const save = () => {
    onSave({ name: name.trim() || movement.name, color });
  };

  return (
    <div className="screen">
      <button
        onClick={onBack}
        style={{ color: "var(--text-mid)", fontSize: 13, padding: "8px 0", marginTop: 4, marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Réglages
      </button>

      <div className="overline" style={{ marginBottom: 8 }}>Modifier</div>
      <div className="title" style={{ marginBottom: 32 }}>{movement.name}</div>

      <div className="overline" style={{ marginBottom: 10 }}>Nom</div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        style={{
          width: "100%",
          borderBottom: "0.5px solid var(--border-mid)",
          fontSize: 17,
          padding: "8px 0 14px",
          fontWeight: 300,
          letterSpacing: "-0.2px",
          marginBottom: 32,
        }}
      />

      <div className="overline" style={{ marginBottom: 14 }}>Couleur</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 36 }}>
        {PALETTE.map(p => {
          const selected = color === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setColor(p.id)}
              style={{
                aspectRatio: "1",
                borderRadius: "50%",
                background: gradBg(p),
                border: selected ? `1.5px solid ${p.text}` : `0.5px solid ${p.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.25s ease",
              }}
              aria-label={`Couleur ${p.id}`}
            >
              <div style={{
                width: "55%",
                height: "55%",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${p.text}, ${p.text}88)`,
                opacity: 0.9,
              }} />
            </button>
          );
        })}
      </div>

      <button className="btn btn-primary" onClick={save}>Enregistrer</button>
      <button
        className="btn btn-danger"
        onClick={() => { if (confirm("Supprimer ce mouvement ?")) onDelete(); }}
        style={{ marginTop: 6 }}
      >
        Supprimer ce mouvement
      </button>
    </div>
  );
}
