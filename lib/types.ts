export type PaletteId =
  | "sand" | "sage" | "rose" | "sky" | "lilac" | "terra"
  | "mist" | "fog"  | "amber" | "olive" | "plum" | "slate";

export interface PaletteEntry {
  id: PaletteId;
  fillFrom: string;
  fillTo: string;
  text: string;
  border: string;
}

export const PALETTE: PaletteEntry[] = [
  { id: "sand",  fillFrom: "rgba(200,164,122,0.16)", fillTo: "rgba(200,164,122,0.04)", text: "#d9b78a", border: "rgba(200,164,122,0.20)" },
  { id: "sage",  fillFrom: "rgba(140,170,140,0.16)", fillTo: "rgba(140,170,140,0.04)", text: "#a8c4a8", border: "rgba(140,170,140,0.20)" },
  { id: "rose",  fillFrom: "rgba(190,140,150,0.16)", fillTo: "rgba(190,140,150,0.04)", text: "#c9a3ad", border: "rgba(190,140,150,0.20)" },
  { id: "sky",   fillFrom: "rgba(140,170,200,0.16)", fillTo: "rgba(140,170,200,0.04)", text: "#a8c0d8", border: "rgba(140,170,200,0.20)" },
  { id: "lilac", fillFrom: "rgba(170,150,190,0.16)", fillTo: "rgba(170,150,190,0.04)", text: "#bcaad0", border: "rgba(170,150,190,0.20)" },
  { id: "terra", fillFrom: "rgba(200,140,120,0.16)", fillTo: "rgba(200,140,120,0.04)", text: "#d4a896", border: "rgba(200,140,120,0.20)" },
  { id: "mist",  fillFrom: "rgba(160,180,180,0.16)", fillTo: "rgba(160,180,180,0.04)", text: "#b8cccc", border: "rgba(160,180,180,0.20)" },
  { id: "fog",   fillFrom: "rgba(170,170,180,0.16)", fillTo: "rgba(170,170,180,0.04)", text: "#c4c4cf", border: "rgba(170,170,180,0.20)" },
  { id: "amber", fillFrom: "rgba(200,170,100,0.16)", fillTo: "rgba(200,170,100,0.04)", text: "#d8bf80", border: "rgba(200,170,100,0.20)" },
  { id: "olive", fillFrom: "rgba(160,170,130,0.16)", fillTo: "rgba(160,170,130,0.04)", text: "#bdc4a0", border: "rgba(160,170,130,0.20)" },
  { id: "plum",  fillFrom: "rgba(180,140,170,0.16)", fillTo: "rgba(180,140,170,0.04)", text: "#caaac0", border: "rgba(180,140,170,0.20)" },
  { id: "slate", fillFrom: "rgba(150,160,170,0.16)", fillTo: "rgba(150,160,170,0.04)", text: "#b4bec8", border: "rgba(150,160,170,0.20)" },
];

export const pal = (id: PaletteId): PaletteEntry =>
  PALETTE.find(p => p.id === id) ?? PALETTE[0];

export const gradBg = (c: PaletteEntry): string =>
  `linear-gradient(135deg, ${c.fillFrom} 0%, ${c.fillTo} 100%)`;

export interface HistoryEntry {
  w: number;
  d: string;
  video?: string; // base64 data URL
}

export interface Movement {
  id: string;
  name: string;
  value: number;
  /** percentage growth vs first record */
  delta: number;
  color: PaletteId;
  history: HistoryEntry[];
}

export interface Profile {
  name: string;
  city: string;
  country: string;
  box: string;
  avatar?: string; // base64
}

export interface Photo {
  id: string;
  data: string; // base64
}

export interface AppState {
  onboarded: boolean;
  profile: Profile;
  movements: Movement[];
  album: Photo[];
}

export const DEFAULT_STATE: AppState = {
  onboarded: false,
  profile: {
    name: "Alex Moreau",
    city: "Paris",
    country: "France",
    box: "CrossFit Louvre",
  },
  movements: [
    { id: "dl", name: "Soulevé de terre", value: 185, delta: 12, color: "sand",
      history: [
        { w: 185, d: "12 mai 2026" },
        { w: 175, d: "28 février 2026" },
        { w: 170, d: "14 novembre 2025" },
        { w: 165, d: "2 août 2025" },
      ] },
    { id: "bs", name: "Back squat", value: 160, delta: 8, color: "sage",
      history: [{ w: 160, d: "5 mai 2026" }, { w: 150, d: "10 janvier 2026" }, { w: 148, d: "3 octobre 2025" }] },
    { id: "fs", name: "Front squat", value: 130, delta: 15, color: "rose",
      history: [{ w: 130, d: "18 avril 2026" }, { w: 113, d: "12 décembre 2025" }] },
    { id: "sn", name: "Arraché", value: 95, delta: 22, color: "sky",
      history: [{ w: 95, d: "2 mai 2026" }, { w: 85, d: "15 janvier 2026" }, { w: 78, d: "7 septembre 2025" }] },
    { id: "cj", name: "Épaulé-jeté", value: 125, delta: 10, color: "lilac",
      history: [{ w: 125, d: "20 avril 2026" }, { w: 114, d: "1 février 2026" }] },
    { id: "sp", name: "Strict press", value: 70, delta: 6, color: "terra",
      history: [{ w: 70, d: "10 mars 2026" }, { w: 66, d: "20 novembre 2025" }] },
    { id: "bp", name: "Développé couché", value: 115, delta: 9, color: "mist",
      history: [{ w: 115, d: "8 mai 2026" }, { w: 106, d: "12 février 2026" }] },
    { id: "th", name: "Thruster", value: 92, delta: 18, color: "fog",
      history: [{ w: 92, d: "15 avril 2026" }, { w: 78, d: "5 décembre 2025" }] },
  ],
  album: [],
};
