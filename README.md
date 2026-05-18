# Atlas

Application premium pour athlètes CrossFit — records, progression, classements, profil.

Stack : **Next.js 14** (App Router) + **React 18** + **TypeScript**. Aucune dépendance UI tierce. Stockage `localStorage` côté client — pas de backend requis pour démarrer.

---

## Installation locale

Pré-requis : Node 18+ et npm.

```bash
npm install
npm run dev
```

Ouvre <http://localhost:3000>.

Pour tester sur ton iPhone en local, lance `npm run dev` et connecte-toi à `http://<ip-de-ton-mac>:3000` depuis Safari sur le même réseau.

---

## Déploiement Vercel

### Méthode 1 — via Git (recommandée)

1. Initialise un repo et pousse-le :
   ```bash
   git init
   git add .
   git commit -m "Atlas v1"
   git branch -M main
   git remote add origin <ton-repo-github>
   git push -u origin main
   ```
2. Sur <https://vercel.com>, clique **Add New → Project**, importe ton repo.
3. Vercel détecte Next.js. Clique **Deploy**.

### Méthode 2 — via CLI

```bash
npm i -g vercel
vercel
```

---

## Architecture

```
atlas/
├── app/
│   ├── layout.tsx          # Layout racine + metadata
│   ├── page.tsx            # Orchestration de toutes les vues
│   └── globals.css         # Design tokens, animations, layout
├── components/
│   ├── Onboarding.tsx      # Écran d'inscription
│   ├── Logo.tsx
│   ├── TabBar.tsx          # Barre de navigation basse (blur iOS)
│   ├── Card.tsx            # Card premium avec flare animé
│   ├── RecordsScreen.tsx   # Onglet 1 — informatif
│   ├── ProgressionScreen.tsx # Onglet 2 — cards avec actions
│   ├── HistoryScreen.tsx   # Détail historique d'un mouvement
│   ├── NewRMModal.tsx      # Feuille modale d'ajout d'un PR
│   ├── RankingsScreen.tsx  # Onglet 3 — classement avec avatars
│   ├── ProfileScreen.tsx   # Onglet 4 — profil + album
│   ├── SettingsScreen.tsx  # Liste des mouvements à éditer
│   └── EditMovementScreen.tsx # Édition nom + couleur d'un mouvement
├── lib/
│   ├── types.ts            # Types, palette pastel, gradient helper
│   ├── store.ts            # Hook useStore (localStorage)
│   └── media.ts            # Upload fichiers, compression images
├── public/
│   ├── manifest.json       # PWA
│   ├── icon.svg, icon-512.png, icon-192.png, apple-icon.png, favicon.ico
└── package.json
```

---

## Système de design

**Couleurs** : noir profond (`#0a0a0a`), accent bronze (`#c8a47a`), texte blanc en 4 paliers d'opacité. Chaque mouvement reçoit une des 12 teintes pastel sombres définies dans `lib/types.ts`.

**Typo** : SF Pro Display / Inter, weights 200–500. Chiffres en weight 200 pour les valeurs clés.

**Animations** : courbe `cubic-bezier(0.22, 1, 0.36, 1)` pour les transitions de vue. Flare de 7s en boucle sur chaque card (passe lumineuse), avec décalages temporels pour éviter la synchronie. `prefers-reduced-motion` respecté.

**Espacement** : grille basée sur multiples de 4. Padding écran 24px. Cards radius 14–18px.

---

## Persistance et données

Toutes les données utilisateur sont sauvegardées en `localStorage` sous la clé `atlas-state-v1`. La structure est définie par `AppState` dans `lib/types.ts`.

⚠️ **Limite à connaître** : les vidéos et photos sont stockées en base64 dans localStorage, dont la quota est ~5–10 MB selon le navigateur. Pour la v1 c'est suffisant pour quelques records / photos test. Avant lancement production, migre vers Supabase Storage, Cloudflare R2 ou similaire — n'édite que `lib/store.ts`.

---

## Roadmap technique

- [ ] Backend Supabase (auth + storage)
- [ ] Vrai classement mondial avec données serveur
- [ ] Trim vidéo client-side à 30s (actuellement la vidéo est uploadée telle quelle)
- [ ] Notifications push pour les records des amis
- [ ] Paiement Stripe pour l'abonnement 3,90 €/mois

