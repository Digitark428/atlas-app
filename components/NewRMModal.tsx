"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Movement } from "@/lib/types";
import { todayLabelFR } from "@/lib/store";

interface NewRMModalProps {
  movement: Movement;
  onClose: () => void;
  onSave: (weight: number, video?: string) => void;
}

export function NewRMModal({ movement, onClose, onSave }: NewRMModalProps) {
  const [weight, setWeight] = useState(movement.value + 5);
  const [videoData, setVideoData] = useState<string | undefined>(undefined);
  const [videoName, setVideoName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setVideoData(reader.result as string);
    reader.readAsDataURL(file);
  };

  const canSave = videoData !== undefined && weight > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="overline" style={{ marginBottom: 8 }}>{movement.name}</div>
        <div style={{
          fontSize: 22,
          fontWeight: 300,
          color: "#fff",
          letterSpacing: "-0.4px",
          marginBottom: 32,
        }}>
          Nouveau record
        </div>

        <div className="overline" style={{ marginBottom: 12 }}>Charge</div>
        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 4,
          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
          paddingBottom: 14,
        }}>
          <input
            type="number"
            value={weight}
            onChange={e => setWeight(parseInt(e.target.value) || 0)}
            style={{
              fontSize: 56,
              fontWeight: 200,
              letterSpacing: "-2px",
              lineHeight: 1,
              width: 140,
              padding: 0,
            }}
            inputMode="numeric"
          />
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>kg</span>
        </div>
        <div style={{
          fontSize: 11,
          color: "var(--text-dim)",
          marginBottom: 32,
          letterSpacing: "0.2px",
        }}>
          Aujourd&rsquo;hui · {todayLabelFR()}
        </div>

        <div className="overline" style={{ marginBottom: 12 }}>Vidéo</div>
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleVideo}
        />
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            minHeight: 70,
            border: "0.5px dashed rgba(255,255,255,0.18)",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: videoData ? "var(--accent)" : "var(--text-mid)",
            fontSize: 13,
            cursor: "pointer",
            transition: "background 0.3s ease",
            marginBottom: 8,
            background: videoData ? "rgba(200,164,122,0.04)" : "transparent",
            padding: "16px",
            textAlign: "center",
          }}
        >
          {videoData ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
                {videoName || "Vidéo sélectionnée"}
              </span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Ajouter une vidéo
            </>
          )}
        </div>
        <div style={{
          fontSize: 11,
          color: "var(--text-faint)",
          textAlign: "center",
          marginBottom: 24,
          letterSpacing: "0.2px",
        }}>
          Obligatoire · 30 secondes max recommandées
        </div>

        <button
          className="btn btn-primary"
          disabled={!canSave}
          onClick={() => canSave && onSave(weight, videoData)}
        >
          Enregistrer
        </button>
        <button className="btn btn-ghost" onClick={onClose} style={{ marginTop: 4 }}>
          Annuler
        </button>
      </div>
    </div>
  );
}
