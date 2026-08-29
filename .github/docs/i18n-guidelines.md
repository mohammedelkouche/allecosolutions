# Internationalisation (i18n) — FR / ES

## Librairie
`next-intl` — choisi car il s'intègre nativement à l'App Router de Next.js, gère le routing
par préfixe de locale, et fonctionne aussi bien en Server Components qu'en Client Components.

## Configuration de base

- Locale par défaut : `fr`
- Locale secondaire : `es`
- Stratégie de routing : préfixe toujours visible (`/fr/...`, `/es/...`), y compris pour
  la langue par défaut — évite toute ambiguïté et facilite le SEO multilingue (voir seo-guidelines.md)

`i18n/routing.ts` :
```ts
export const routing = defineRouting({
  locales: ["fr", "es"],
  defaultLocale: "fr",
  localePrefix: "always",
});
```

## Structure des fichiers de traduction

`messages/fr.json` et `messages/es.json`, organisés par namespace correspondant aux sections/pages :

```json
{
  "nav": {
    "home": "Accueil",
    "about": "À propos",
    "services": "Services",
    "sectors": "Secteurs d'intervention",
    "contact": "Contact"
  },
  "hero": {
    "title": "...",
    "subtitle": "...",
    "cta": "Demander un audit"
  },
  "contactForm": {
    "nameLabel": "Nom complet",
    "emailLabel": "Adresse e-mail",
    "messageLabel": "Votre message",
    "submitButton": "Envoyer",
    "successMessage": "Merci, nous vous recontactons sous 48h.",
    "errorMessage": "Une erreur est survenue, veuillez réessayer."
  }
}
```

**Règle stricte : toute clé ajoutée dans `fr.json` doit être ajoutée dans `es.json` dans le même
commit.** Un texte manquant dans une langue ne doit jamais atterrir en production.

## Utilisation dans les composants

Server Component :
```tsx
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");
  return <h1>{t("title")}</h1>;
}
```

Client Component (formulaire, éléments interactifs) :
```tsx
"use client";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contactForm");
  // ...
}
```

## Contenu Markdown bilingue

- Le contenu métier long (descriptions de services, secteurs) vit dans `content/fr/` et `content/es/`
- **Même nom de fichier des deux côtés** pour garder le lien explicite entre les deux versions
  (ex: `content/fr/services/efficacite-energetique.md` ↔ `content/es/services/efficacite-energetique.md`
  — le nom de fichier peut différer si le slug SEO diffère, mais il faut un mapping explicite
  dans le frontmatter, ex: `slugFr: efficacite-energetique` / `slugEs: eficiencia-energetica`)
- Ne jamais faire de traduction automatique brute pour du contenu qui sera publié — un texte
  traduit littéralement du français sonne rarement naturel en espagnol commercial. Prévoir
  une relecture humaine (le client ou un traducteur) avant mise en ligne, même si Copilot peut
  proposer une première version.

## Sélecteur de langue

- Composant `LanguageSwitcher.tsx` dans `components/layout/`, visible dans le header
- Doit rediriger vers l'équivalent exact de la page courante dans l'autre langue
  (pas vers la page d'accueil de l'autre langue — mauvais pour l'UX et la conversion)

## Points d'attention spécifiques

- Formats de date, numéros de téléphone : adapter selon la locale si affichés dynamiquement
- Ne jamais concaténer des chaînes traduites entre elles (`t("part1") + t("part2")`) —
  la grammaire diffère entre FR et ES, toujours prévoir une clé de traduction complète et
  contextuelle pour chaque phrase
- Vérifier que `hreflang` et `alternates.languages` sont cohérents avec les routes réelles
  (voir `docs/seo-guidelines.md`)