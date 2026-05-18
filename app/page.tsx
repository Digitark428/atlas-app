"use client";

import { useState, useEffect } from "react";
import { useStore, newDefaultMovement } from "@/lib/store";
import { TabBar, TabId } from "@/components/TabBar";
import { Onboarding } from "@/components/Onboarding";
import { RecordsScreen } from "@/components/RecordsScreen";
import { ProgressionScreen } from "@/components/ProgressionScreen";
import { HistoryScreen } from "@/components/HistoryScreen";
import { RankingsScreen } from "@/components/RankingsScreen";
import { ProfileScreen } from "@/components/ProfileScreen";
import { SettingsScreen } from "@/components/SettingsScreen";
import { EditMovementScreen } from "@/components/EditMovementScreen";
import { NewRMModal } from "@/components/NewRMModal";

type View =
  | { kind: "tab"; tab: TabId }
  | { kind: "history"; movementId: string }
  | { kind: "settings" }
  | { kind: "edit"; movementId: string };

export default function Home() {
  const {
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
  } = useStore();

  const [view, setView] = useState<View>({ kind: "tab", tab: "records" });
  const [rmTarget, setRmTarget] = useState<string | null>(null);

  // Avoid hydration mismatch flicker
  if (!hydrated) {
    return <div style={{ minHeight: "100vh", background: "#0a0a0a" }} />;
  }

  if (!state.onboarded) {
    return <Onboarding onStart={completeOnboarding} />;
  }

  const findMovement = (id: string) => state.movements.find(m => m.id === id);

  const activeTab: TabId =
    view.kind === "tab" ? view.tab :
    view.kind === "history" ? "progression" :
    "records";

  return (
    <>
      {view.kind === "tab" && view.tab === "records" && (
        <RecordsScreen
          name={state.profile.name}
          movements={state.movements}
          onOpenSettings={() => setView({ kind: "settings" })}
        />
      )}

      {view.kind === "tab" && view.tab === "progression" && (
        <ProgressionScreen
          movements={state.movements}
          onNewRM={(id) => setRmTarget(id)}
          onHistory={(id) => setView({ kind: "history", movementId: id })}
        />
      )}

      {view.kind === "tab" && view.tab === "rankings" && (
        <RankingsScreen
          profile={state.profile}
          userValue={state.movements[0]?.value ?? 0}
        />
      )}

      {view.kind === "tab" && view.tab === "profile" && (
        <ProfileScreen
          profile={state.profile}
          movements={state.movements}
          album={state.album}
          onAddPhoto={addPhoto}
          onRemovePhoto={removePhoto}
          onUpdateProfile={updateProfile}
        />
      )}

      {view.kind === "history" && (() => {
        const m = findMovement(view.movementId);
        if (!m) { setView({ kind: "tab", tab: "progression" }); return null; }
        return <HistoryScreen movement={m} onBack={() => setView({ kind: "tab", tab: "progression" })} />;
      })()}

      {view.kind === "settings" && (
        <SettingsScreen
          movements={state.movements}
          onBack={() => setView({ kind: "tab", tab: "records" })}
          onEdit={(id) => setView({ kind: "edit", movementId: id })}
          onAdd={() => {
            const id = addMovement(newDefaultMovement(state.movements.length));
            setView({ kind: "edit", movementId: id });
          }}
          onResetOnboarding={resetOnboarding}
        />
      )}

      {view.kind === "edit" && (() => {
        const m = findMovement(view.movementId);
        if (!m) { setView({ kind: "settings" }); return null; }
        return (
          <EditMovementScreen
            movement={m}
            onBack={() => setView({ kind: "settings" })}
            onSave={(patch) => {
              updateMovement(view.movementId, patch);
              setView({ kind: "settings" });
            }}
            onDelete={() => {
              deleteMovement(view.movementId);
              setView({ kind: "settings" });
            }}
          />
        );
      })()}

      {rmTarget && (() => {
        const m = findMovement(rmTarget);
        if (!m) { setRmTarget(null); return null; }
        return (
          <NewRMModal
            movement={m}
            onClose={() => setRmTarget(null)}
            onSave={(weight, video) => {
              addRecord(rmTarget, weight, video);
              setRmTarget(null);
            }}
          />
        );
      })()}

      <TabBar
        active={activeTab}
        onSelect={(t) => setView({ kind: "tab", tab: t })}
      />
    </>
  );
}
