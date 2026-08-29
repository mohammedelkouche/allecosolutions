# Copilot Instructions — Site Vitrine Audit Énergétique

## Contexte du projet

Site web vitrine professionnel pour une entreprise d'audit énergétique et d'amélioration
de l'efficacité énergétique. Cible : particuliers (résidentiel individuel), syndics/copropriétés
(immeubles collectifs), et entreprises (bâtiments tertiaires). Le site doit inspirer confiance,
paraître moderne, et convertir les visiteurs en prospects (formulaire de contact, appels à l'action).

**Priorités absolues du projet, dans l'ordre :**
1. Performance (Core Web Vitals) — impacte le SEO et la conversion
2. SEO (bilingue FR/ES)
3. Accessibilité (a11y)
4. Design épuré et professionnel
5. Code maintenable et documenté

## Stack technique

- **Framework** : Next.js 14+ (App Router uniquement — jamais Pages Router)
- **Langage** : TypeScript strict (pas de `any`, pas de `// @ts-ignore` sans justification en commentaire)
- **Styling** : Tailwind CSS — classes utilitaires uniquement, pas de CSS custom sauf cas exceptionnel
- **Composants UI** : shadcn/ui — **pas encore installé au moment de la rédaction de ce document**.
  Tant qu'il n'est pas installé, ne pas importer de composants depuis `@/components/ui`. Une fois
  installé, les composants shadcn vivent dans `components/ui/`, ne jamais les modifier directement,
  toujours composer par-dessus dans `components/sections/` ou `components/layout/`.
  Voir `docs/design-ux-ui.md` pour les principes de design à respecter avec ou sans shadcn.
- **Formulaire de contact** : Google Forms fourni par le client, intégré en iframe (pas de
  formulaire custom, pas de librairie de validation — voir section dédiée plus bas)
- **i18n** : next-intl (FR = langue par défaut, ES = langue secondaire)
- **Contenu** : fichiers Markdown/MDX locaux dans `content/`, pas de CMS, pas de base de données
- **Icônes** : lucide-react uniquement
- **Déploiement** : Vercel

## Règles de code — à toujours respecter

### Général
- Composants React en fonctions nommées (`export function Hero() {}`), jamais de `export default () => {}`
  anonyme sauf pour les fichiers `page.tsx`/`layout.tsx` imposés par Next.js.
- Un composant = un fichier = une responsabilité. Si un composant dépasse ~150 lignes, le découper.
- Toujours typer les props avec une interface explicite (`interface HeroProps { title: string }`),
  jamais de props implicites ou `any`.
- Server Components par défaut. N'ajouter `"use client"` que si le composant a besoin d'interactivité
  (formulaire, state, event handlers, hooks). Documenter pourquoi en commentaire si ce n'est pas évident.
- Pas de logique métier dans les composants JSX — extraire dans `lib/` ou des hooks dédiés.

### Nommage
- Composants : PascalCase (`ServiceCard.tsx`)
- Fonctions/variables : camelCase
- Fichiers utilitaires : kebab-case (`format-date.ts`)
- Constantes globales : UPPER_SNAKE_CASE dans `lib/constants.ts`

### Style et Tailwind
- **Projet en Tailwind v4** — les tokens de thème (couleurs, fonts) sont définis en CSS via
  le bloc `@theme` dans `app/globals.css`, pas dans un `tailwind.config.ts` (ne pas en créer un).
- Respecter l'ordre des classes Tailwind : layout → spacing → typography → couleurs → états.
- Utiliser les tokens de couleur définis dans `@theme` (`bg-primary`, `text-foreground`, etc.),
  jamais de couleurs arbitraires type `bg-[#1a2b3c]` sauf cas exceptionnel documenté.
- Mobile-first systématique : classes de base = mobile, puis `sm:` `md:` `lg:` `xl:` pour le desktop.
- Voir `docs/design-ux-ui.md` pour la palette, la typographie et les patterns UX complets,
  et `docs/coding-standards.md` pour le détail des conventions de code.

### SEO — non négociable sur chaque page
- Chaque `page.tsx` doit exporter un objet `metadata` (ou `generateMetadata` si dynamique) avec
  au minimum : `title`, `description`, `alternates.canonical`, `alternates.languages` (hreflang FR/ES).
- Utiliser une hiérarchie de titres stricte (un seul `<h1>` par page).
- Toute image doit avoir un `alt` descriptif et pertinent (pas de mots-clés bourrés).
- Voir `docs/seo-guidelines.md` pour le détail complet (structured data, sitemap, etc.).

### i18n
- Ne jamais coder du texte visible en dur dans un composant. Toujours passer par next-intl
  (`useTranslations()` côté client, `getTranslations()` côté serveur).
- Toute nouvelle chaîne de texte doit être ajoutée dans `messages/fr.json` ET `messages/es.json`
  en même temps.
- Voir `docs/i18n-guidelines.md` pour la structure complète des routes et fichiers de traduction.

### Accessibilité
- Tout élément interactif doit être accessible au clavier (pas de `<div onClick>`, utiliser `<button>`).
- Contrastes de couleur conformes WCAG AA minimum.
- Formulaires : chaque champ a un `<label>` associé, messages d'erreur liés via `aria-describedby`.

### Formulaire de contact
- Le formulaire est un **Google Forms fourni par le client** (lien type `https://forms.gle/...`),
  pas un formulaire custom. Pas de zod, pas de react-hook-form, pas de Server Action pour ça.
- Intégration recommandée : **iframe** dans la section Contact, pas un simple lien qui fait sortir
  le visiteur du site (meilleur pour la conversion et la cohérence de marque).
  Utiliser l'URL d'embed fournie par Google Forms (`.../viewform?embedded=true`), jamais le lien
  `forms.gle` court directement en `src` d'iframe.
- Prévoir un `<noscript>` ou un lien de secours visible (texte "Ouvrir le formulaire dans un nouvel
  onglet") en cas de souci d'affichage de l'iframe (bloqueurs de pub, cookies tiers désactivés).
- Composant dédié : `components/sections/ContactFormEmbed.tsx`, Server Component simple
  (pas besoin de `"use client"` pour un iframe statique).

## Ce que Copilot ne doit PAS faire
- Ne pas introduire de nouvelle librairie UI sans qu'elle soit demandée explicitement.
- Ne pas générer de contenu textuel définitif (textes de vente, descriptions de services) —
  utiliser des placeholders clairs (`// TODO: contenu à valider avec le client`) sauf si un texte
  est explicitement fourni.
- Ne pas utiliser `<img>` natif — toujours `next/image` pour l'optimisation automatique.
- Ne pas utiliser `<a>` pour la navigation interne — toujours `next/link`.
- Ne pas désactiver ESLint ou TypeScript strict pour "faire passer" une erreur.

## Documents de référence
- `docs/coding-standards.md` — conventions de code détaillées
- `docs/seo-guidelines.md` — checklist SEO complète, structured data, sitemap
- `docs/i18n-guidelines.md` — stratégie FR/ES, structure des routes
- `docs/design-ux-ui.md` — principes de design UX/UI, palette, typographie, patterns de conversion

> Remarque : la structure exacte des dossiers n'est pas encore figée. Copilot doit rester
> cohérent avec l'organisation déjà présente dans le projet plutôt que d'imposer une structure
> imaginée à l'avance — proposer une organisation raisonnable (par fonctionnalité/section)
> si aucune n'existe encore, mais ne pas la considérer comme gravée dans le marbre.