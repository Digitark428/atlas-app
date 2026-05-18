"use client";

export type TabId = "records" | "progression" | "rankings" | "profile";

interface TabBarProps {
  active: TabId;
  onSelect: (t: TabId) => void;
}

export function TabBar({ active, onSelect }: TabBarProps) {
  const tabs: { id: TabId; label: string; icon: JSX.Element }[] = [
    {
      id: "records",
      label: "Records",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9v6M10 6v12M14 9v6M18 6v12" />
        </svg>
      ),
    },
    {
      id: "progression",
      label: "Progression",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18 L10 12 L14 16 L20 8" />
        </svg>
      ),
    },
    {
      id: "rankings",
      label: "Classement",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="4" />
          <path d="M9 13 L7 21 L12 18 L17 21 L15 13" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profil",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21 C4 16 8 14 12 14 C16 14 20 16 20 21" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="tabbar">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`tab ${active === t.id ? "active" : ""}`}
          onClick={() => onSelect(t.id)}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
