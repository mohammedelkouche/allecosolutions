# Navigation & Routing — Services et International

## Structure du menu principal

```
À propos                    → /a-propos (statique)
Nos services                → /services (liste)
  ├─ Efficacité énergétique → /services/efficacite-energetique
  ├─ Énergies renouvelables → /services/energies-renouvelables
  ├─ CVC                    → /services/cvc
  ├─ Fluides & plomberie    → /services/fluides-plomberie
  └─ Isolation              → /services/isolation
À l'international           → /international (vue d'ensemble)
  ├─ Rénovation énergétique → /international/renovation-energetique
  │    ├─ Espagne           → /international/renovation-energetique/espagne
  │    └─ France            → /international/renovation-energetique/france
  ├─ Formations             → /international/formations
  └─ Implantation & Développement au Maroc     → /international/Implantation & Développement au Maroc
Contactez-nous               → /contact
```

## Décision d'architecture : route dynamique vs route statique

**Règle appliquée dans ce projet** : une route dynamique (`[slug]`) n'est utilisée que quand
plusieurs pages partagent strictement la même forme de contenu (mêmes champs, même layout) ET
qu'il y en a suffisamment pour que dupliquer des `page.tsx` soit un vrai coût de maintenance.
Sinon, route statique explicite — plus simple, mieux typée, metadata SEO plus précise par page,
pas de logique de résolution générique à maintenir pour rien.

| Section | Nombre d'items | Forme homogène ? | Décision |
|---|---|---|---|
| Services | 6 | Oui | Route dynamique `[slug]` |
| Rénovation énergétique (pays) | 2 (extensible) | Oui | Route dynamique `[country]` |
| Formations | 1 | N/A (contenu unique) | Route statique |
| Extension au Maroc | 1 | N/A (contenu unique) | Route statique |
| À propos, Contact | 1 chacune | N/A | Route statique |

## Structure de contenu

Markdown/MDX avec frontmatter, cohérent avec `docs/i18n-guidelines.md` — pas de fichier
TS/JSON hardcodé pour le contenu long (titre, description, corps de texte). Un fichier TS
reste correct pour des données structurées courtes (la config de nav elle-même, par exemple).

```
content/
├── fr/
│   ├── services/
│   │   ├── efficacite-energetique.md
│   │   ├── energies-renouvelables.md
│   │   ├── cvc.md
│   │   ├── fluides-plomberie.md
│   │   └── isolation.md
│   └── international/
│       ├── renovation-energetique/
│       │   ├── espagne.md
│       │   └── france.md
│       ├── formations.md
│       └── extension-maroc.md
└── es/
    └── (même arborescence)
```

Frontmatter type pour un service :
```md
---
title: "Audit énergétique"
metaTitle: "Audit énergétique | [Nom Entreprise]"
metaDescription: "..."
icon: "search-check"
order: 2
---

Corps du texte en Markdown...
```

## Structure des routes

```
app/[locale]/
├── a-propos/page.tsx
├── services/
│   ├── page.tsx                      # liste des 6 services, générée depuis content/services
│   └── [slug]/page.tsx               # dynamique, generateStaticParams depuis les fichiers .md
├── international/
│   ├── page.tsx
│   ├── formations/page.tsx           # statique
│   ├── extension-maroc/page.tsx      # statique
│   └── renovation-energetique/
│       ├── page.tsx                  # optionnel, vue d'ensemble du programme
│       └── [country]/page.tsx        # dynamique, generateStaticParams (espagne, france, ...)
└── contact/page.tsx
```

Chaque route dynamique utilise `generateStaticParams` (lecture des fichiers dans `content/`) pour
pré-générer les pages au build (SSG) — meilleur pour la performance et le SEO que du rendu à la demande.
Chaque route (dynamique ou statique) exporte `generateMetadata` avec `alternates.languages`
conformément à `docs/seo-guidelines.md`.

## Configuration de navigation (menu, séparée du contenu)

Le menu déroulant ne connaît que les libellés (via clés next-intl) et les hrefs — jamais le
contenu complet des pages. Fichier dédié : `lib/navigation.ts`, structure arborescente typée,
consommée par le composant Header pour générer les dropdowns (y compris le sous-sous-menu
Rénovation énergétique → Espagne/France).

## Composant menu déroulant

- Primitive : `@radix-ui/react-dropdown-menu` (avec `DropdownMenuSub` pour le niveau imbriqué
  Rénovation énergétique → pays) — pas `NavigationMenu`, qui gère mal plus d'un niveau de sous-menu.
- Interaction : hover pour desktop **en plus** du clic/clavier natif de Radix, jamais hover seul
  (casse l'accessibilité clavier et le comportement tactile — voir `docs/design-ux-ui.md`,
  section accessibilité).
- Voir `docs/design-ux-ui.md` pour le style visuel des dropdowns (couleurs, transitions, focus).