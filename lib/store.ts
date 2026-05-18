"use client";

import { useEffect, useState, useCallback } from "react";
import { AppState, DEFAULT_STATE, Movement, Photo, HistoryEntry, PaletteId } from "./types";

const STORAGE_KEY = "atlas-state-v1";

function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(s: AppState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // quota — silently ignore (album/video may be too heavy)
  }
}

export function todayLabelFR(): string {
  const d = new Date();
  const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function useStore() {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveState(state);
  }, [state, hydrated]);

  const completeOnboarding = useCallback(() => {
    setState(s => ({ ...s, onboarded: true }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setState(s => ({ ...s, onboarded: false }));
  }, []);

  const updateProfile = useCallback((patch: Partial<AppState["profile"]>) => {
    setState(s => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const addMovement = useCallback((m: Omit<Movement, "id">): string => {
    const id = "m" + Date.now();
    setState(s => ({ ...s, movements: [...s.movements, { ...m, id }] }));
    return id;
  }, []);

  const updateMovement = useCallback((id: string, patch: Partial<Movement>) => {
    setState(s => ({
      ...s,
      movements: s.movements.map(m => (m.id === id ? { ...m, ...patch } : m)),
    }));
  }, []);

  const deleteMovement = useCallback((id: string) => {
    setState(s => ({ ...s, movements: s.movements.filter(m => m.id !== id) }));
  }, []);

  const addRecord = useCallback((movementId: string, weight: number, video?: string) => {
    setState(s => {
      const movements = s.movements.map(m => {
        if (m.id !== movementId) return m;
        const first = m.history[m.history.length - 1]?.w ?? weight;
        const newEntry: HistoryEntry = { w: weight, d: todayLabelFR(), video };
        const newHistory = [newEntry, ...m.history];
        const newValue = Math.max(weight, m.value);
        const delta = first > 0 ? Math.round(((newValue - first) / first) * 100) : 0;
        return { ...m, value: newValue, delta, history: newHistory };
      });
      return { ...s, movements };
    });
  }, []);

  const addPhoto = useCallback((data: string) => {
    setState(s => ({ ...s, album: [...s.album, { id: "p" + Date.now(), data }] }));
  }, []);

  const removePhoto = useCallback((id: string) => {
    setState(s => ({ ...s, album: s.album.filter(p => p.id !== id) }));
  }, []);

  return {
    state,
    hydrated,
    completeOnboarding,
    resetOnboarding,
    updateProfile,
    addMovement,
    updateMovement,
    deleteMovement,
    addRecord,
    addPhoto,
    removePhoto,
  };
}

export function newDefaultMovement(existingCount: number): Omit<Movement, "id"> {
  const colors: PaletteId[] = ["sand", "sage", "rose", "sky", "lilac", "terra", "mist", "fog", "amber", "olive", "plum", "slate"];
  return {
    name: "Nouveau mouvement",
    value: 0,
    delta: 0,
    color: colors[existingCount % colors.length],
    history: [],
  };
}
