# Design UX/UI Guidelines

## Statut du design system (état réel du projet)

- **shadcn/ui : pas encore installé.** Ne pas importer depuis `@/components/ui` tant que ce n'est
  pas fait. Ce document définit les principes à respecter dès maintenant en Tailwind pur, pour que
  l'installation de shadcn plus tard (si elle a lieu) soit une couche d'accessibilité/comportement
  par-dessus des choix déjà cohérents — pas une refonte visuelle.
- **Tailwind v4** (confirmé dans `package.json` — `@tailwindcss/postcss` v4). Important : en v4,
  les tokens de thème (couleurs, fonts, etc.) se définissent en CSS via le bloc `@theme` directement
  dans `app/globals.css`, **pas** dans un fichier `tailwind.config.ts` séparé comme en v3.
  Ne pas créer de `tailwind.config.ts` pour les couleurs — étendre `@theme` dans `globals.css`.
- `app/globals.css` est actuellement le fichier par défaut généré par `create-next-app`
  (`--background` / `--foreground`, fonts Geist Sans/Mono via `next/font`). C'est le point de départ
  à étendre, pas à réécrire entièrement.

### Comment étendre le thème en Tailwind v4

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --background: #F8F9FA;        /* blanc cassé, pas #ffffff pur */
  --foreground: #0F172A;        /* gris très foncé, pas #000000 pur */
  --primary: #0B3D2E;           /* vert profond désaturé - à valider avec le client */
  --primary-foreground: #ffffff;
  --secondary: #1E3A5F;         /* bleu profond désaturé */
  --accent: #D97706;            /* ambre/orange contenu, réservé aux CTA */
  --accent-foreground: #ffffff;
  --muted: #E2E8F0;
  --muted-foreground: #475569;
  --border: #E2E8F0;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --font-sans: var(--font-geist-sans);
}
```

Une fois déclaré ainsi, ces tokens sont utilisables directement comme classes Tailwind :
`bg-primary`, `text-foreground`, `border-border`, `bg-accent text-accent-foreground`, etc.
**Ne jamais écrire de couleur hexadécimale en dur dans un composant** — toujours passer par
ces tokens, pour que shadcn (s'il est installé plus tard) puisse se brancher sur les mêmes
variables sans tout redéfinir.

- Le mode sombre (`@media (prefers-color-scheme: dark)`) présent dans le fichier par défaut :
  **à retirer ou figer volontairement**, pas à laisser par défaut sans décision. Un site vitrine
  B2B/confiance gagne généralement à n'avoir qu'un seul thème clair, cohérent et maîtrisé, plutôt
  qu'un dark mode non designé qui casse la charte sur certains appareils. Trancher avec le client.

## Direction artistique

Secteur : audit énergétique / efficacité énergétique. Trois audiences très différentes
(particulier, syndic de copropriété, responsable tertiaire/entreprise) → le design doit
**inspirer confiance et sérieux avant tout**, pas être "flashy" ou trop startup.

**Mots-clés :** sobre, professionnel, clair, rassurant, moderne sans effet de mode éphémère.
À éviter : dégradés verts génériques "eco-friendly" partout, icônes feuille en série, look
"template gratuit".

## Palette de couleurs

- **Primaire** : teinte sobre associée à l'énergie/technique (vert profond désaturé ou bleu
  profond — voir exemple `@theme` ci-dessus). À valider avec le client s'il a déjà un logo/une
  charte existante — ne pas figer définitivement sans vérifier.
- **Secondaire** : une deuxième couleur sobre pour créer de la hiérarchie visuelle sans multiplier
  les accents.
- **Accent** : une seule couleur chaude et contenue, réservée aux CTA principaux (bouton "Demander
  un audit", liens d'action) — doit ressortir sans jurer avec le sérieux du reste. Ne jamais
  l'utiliser pour de la décoration pure.
- **Neutres** : pas de noir pur ni de blanc pur (voir exemple ci-dessus) — plus confortable
  visuellement et perçu comme plus qualitatif.
- Contraste WCAG AA minimum systématique, en particulier vu le public (syndics, propriétaires,
  parfois plus âgés) — vérifier `foreground` sur `background` et `accent-foreground` sur `accent`.

## Typographie

- Le projet a déjà `next/font` avec Geist Sans/Mono configuré par défaut — décider si on garde
  Geist (moderne, très lisible, bon choix par défaut) ou si on la remplace par une police avec
  un peu plus de caractère pour les titres (ex: une sans-serif géométrique) + une police texte
  très lisible pour le corps. Deux familles maximum.
- Chargement toujours via `next/font` (déjà en place) — jamais de `<link>` Google Fonts externe
  (voir `seo-guidelines.md`, impact Core Web Vitals).
- Échelle limitée et cohérente : `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`,
  `text-3xl`, `text-4xl` — pas de tailles ad hoc en dehors de cette échelle.
- `leading-relaxed` pour le texte courant. Réserver `font-bold`/`font-semibold` aux titres et CTA.

## Layout et grille

- Largeur de contenu maximale cohérente (`max-w-7xl` centré) avec padding responsive
  (`px-4 sm:px-6 lg:px-8`).
- Rythme vertical constant entre sections de page (`py-16 md:py-24`) — pas d'espacements
  incohérents d'une section à l'autre.
- Grilles Tailwind natives (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) pour les cartes
  de services/secteurs — pas de positionnement manuel sauf élément décoratif isolé.

## Composants et patterns UX orientés conversion

- **Header** (`components/layout/Header.tsx` — actuellement un stub à construire) : navigation
  simple (5-6 liens max : Accueil, Services, Secteurs, À propos, International, Contact),
  CTA `bg-accent` visible en permanence, pas noyé dans le menu.
- **Footer** (`components/layout/Footer.tsx` — actuellement un stub à construire) : coordonnées,
  liens légaux, sélecteur de langue, réseaux sociaux si disponibles.
- **Hero (accueil)** : promesse claire en un titre, sous-titre qui rassure, CTA principal net,
  élément de preuve immédiate visible sans scroller (certification, nombre de bâtiments audités,
  zone d'intervention).
- **Trust badges** : section dédiée certifications (RGE, Qualibat…), chiffres clés — positionnée
  tôt sur la page d'accueil, pas repoussée en bas.
- **Cartes Services/Secteurs** : structure strictement identique et répétée (icône/image, titre,
  description courte, lien "en savoir plus") — la répétition rassure et facilite le scan visuel.
- **CTA répétés** : un CTA "Nous contacter" en fin de chaque section importante, pas seulement
  header/footer.
- **Formulaire de contact (Google Forms embarqué en iframe)** : présenté avec un texte de
  réassurance autour (délai de réponse, confidentialité) — jamais l'iframe seule sans contexte.
  Voir `docs/coding standards.md` pour l'implémentation technique.
- **Preuve sociale** : témoignages/études de cas si fournis par le client, positionnés juste
  avant le formulaire de contact final.

## Responsive

- Mobile-first systématique — concevoir d'abord l'empilement mobile de chaque section.
- Menu mobile : composant accessible dédié (`Sheet` si shadcn installé plus tard, sinon un
  composant custom avec focus trap et fermeture au clavier) — jamais un menu qui bloque le
  scroll sans fermeture claire.
- Cibles tactiles ≥ 44x44px pour tout élément cliquable sur mobile.

## Micro-interactions

- Transitions courtes (150–250ms) sur hover/focus (`transition-colors`, `transition-transform`
  légers) — pas d'animations d'entrée agressives qui ralentissent la perception de vitesse.
- Respecter `prefers-reduced-motion` pour toute animation non essentielle.
- Pas de librairie d'animation lourde (Framer Motion, GSAP) sans besoin justifié — Tailwind seul
  suffit pour la majorité des interactions ici, et reste plus léger/rapide (aligné avec la
  priorité Performance du projet).

## Imagerie

- Photos réalistes et professionnelles (techniciens sur site, bâtiments réels) plutôt
  qu'illustrations génériques — renforce la confiance. Demander explicitement au client s'il a
  des photos propres à l'entreprise plutôt que de partir sur une banque d'images stock reconnaissable.
- Cohérence de traitement (ratio, ton colorimétrique léger) entre toutes les photos.
- Toujours `next/image`, jamais `<img>` natif (voir `copilot-instructions.md`).

## Accessibilité liée au design

- Ne jamais coder une information uniquement par la couleur (ex: état de succès/erreur) —
  toujours accompagner d'un texte ou d'une icône.
- Focus visible sur tout élément interactif (`focus-visible:ring-2` avec `ring-accent` ou
  équivalent) — ne jamais mettre `outline: none` sans remplacer par un style de focus alternatif.