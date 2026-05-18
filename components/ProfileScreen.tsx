"use client";

import { useRef, useState, ChangeEvent } from "react";
import { Movement, Photo, Profile } from "@/lib/types";
import { compressImage } from "@/lib/media";

interface ProfileScreenProps {
  profile: Profile;
  movements: Movement[];
  album: Photo[];
  onAddPhoto: (data: string) => void;
  onRemovePhoto: (id: string) => void;
  onUpdateProfile: (patch: Partial<Profile>) => void;
}

export function ProfileScreen({ profile, movements, album, onAddPhoto, onRemovePhoto, onUpdateProfile }: ProfileScreenProps) {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const initials = profile.name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();

  // Find top 2 PRs with videos
  const videoRecords = movements
    .map(m => ({ m, latest: m.history.find(h => h.video) }))
    .filter(x => x.latest)
    .slice(0, 2);

  const handlePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await compressImage(file);
      onAddPhoto(data);
    } catch (err) {
      console.error(err);
    }
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await compressImage(file, 400, 0.85);
      onUpdateProfile({ avatar: data });
    } catch (err) {
      console.error(err);
    }
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  };

  const saveEdit = () => {
    onUpdateProfile(draft);
    setEditing(false);
  };

  return (
    <div className="screen">
      <input ref={photoInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
      <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatar} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 16, marginBottom: 32 }}>
        <button
          onClick={() => avatarInputRef.current?.click()}
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: profile.avatar
              ? `url(${profile.avatar}) center/cover`
              : "linear-gradient(135deg, #2a2520, #0f0d0a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 300,
            color: "var(--accent)",
            letterSpacing: 1,
            marginBottom: 16,
            border: "0.5px solid rgba(200,164,122,0.25)",
            cursor: "pointer",
          }}
          aria-label="Modifier la photo"
        >
          {!profile.avatar && initials}
        </button>

        {editing ? (
          <>
            <input
              value={draft.name}
              onChange={e => setDraft({ ...draft, name: e.target.value })}
              style={{ fontSize: 22, fontWeight: 300, textAlign: "center", borderBottom: "0.5px solid var(--border-mid)", padding: "4px 0", width: 220 }}
            />
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
              <input
                value={draft.city}
                onChange={e => setDraft({ ...draft, city: e.target.value })}
                style={{ fontSize: 12, textAlign: "right", borderBottom: "0.5px solid var(--border-mid)", padding: "4px 6px", width: 90, color: "var(--text-mid)" }}
                placeholder="Ville"
              />
              <span style={{ color: "var(--text-faint)" }}>·</span>
              <input
                value={draft.box}
                onChange={e => setDraft({ ...draft, box: e.target.value })}
                style={{ fontSize: 12, borderBottom: "0.5px solid var(--border-mid)", padding: "4px 6px", width: 130, color: "var(--text-mid)" }}
                placeholder="Box"
              />
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 14 }}>
              <button onClick={saveEdit} style={{ fontSize: 12, color: "var(--accent)" }}>Enregistrer</button>
              <button onClick={() => { setDraft(profile); setEditing(false); }} style={{ fontSize: 12, color: "var(--text-mid)" }}>Annuler</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 22, fontWeight: 300, color: "#fff" }}>{profile.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4, letterSpacing: "0.3px" }}>
              {profile.city} · {profile.box}
            </div>
            <button onClick={() => { setDraft(profile); setEditing(true); }} style={{ fontSize: 11, color: "var(--text-mid)", marginTop: 12, letterSpacing: "0.3px" }}>
              Modifier
            </button>
          </>
        )}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px 0",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        marginBottom: 32,
      }}>
        <Stat value={String(movements.length)} label="Records" />
        <div style={{ width: "0.5px", background: "rgba(255,255,255,0.08)" }} />
        <Stat value="#142" label="National" />
        <div style={{ width: "0.5px", background: "rgba(255,255,255,0.08)" }} />
        <Stat value={String(videoRecords.length)} label="Vidéos" />
      </div>

      {videoRecords.length > 0 && (
        <>
          <div className="overline" style={{ marginBottom: 14 }}>Vidéos de records</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 32 }}>
            {videoRecords.map(({ m, latest }) => (
              <div
                key={m.id}
                style={{
                  aspectRatio: "3/4",
                  background: "linear-gradient(180deg, #1a1a1a 0%, #050505 100%)",
                  borderRadius: 14,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {latest?.video && (
                  <video
                    src={latest.video}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
                    muted
                    playsInline
                    preload="metadata"
                  />
                )}
                <div style={{
                  position: "absolute",
                  top: 10,
                  left: 12,
                  fontSize: 9,
                  letterSpacing: "1.5px",
                  color: "rgba(255,255,255,0.7)",
                  textTransform: "uppercase",
                }}>
                  {m.name.split(" ")[0]}
                </div>
                <div style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  fontSize: 20,
                  fontWeight: 300,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}>
                  {latest?.w}<span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginLeft: 2 }}>kg</span>
                </div>
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24">
                    <polygon points="6 4 20 12 6 20" fill="#fff" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="overline" style={{ marginBottom: 14 }}>Album</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
        {album.map(p => (
          <div
            key={p.id}
            onClick={() => { if (confirm("Supprimer cette photo ?")) onRemovePhoto(p.id); }}
            style={{
              aspectRatio: "1",
              background: `url(${p.data}) center/cover`,
              borderRadius: 8,
              border: "0.5px solid rgba(255,255,255,0.04)",
              cursor: "pointer",
            }}
          />
        ))}
        <button
          onClick={() => photoInputRef.current?.click()}
          style={{
            aspectRatio: "1",
            border: "0.5px dashed rgba(255,255,255,0.15)",
            borderRadius: 8,
            color: "var(--text-mid)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Ajouter une photo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 300, color: "#fff" }}>{value}</div>
      <div className="overline" style={{ marginTop: 4 }}>{label}</div>
    </div>
  );
}
