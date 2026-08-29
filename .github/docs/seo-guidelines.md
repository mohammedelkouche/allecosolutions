# SEO Guidelines

## Objectif
Site bilingue FR/ES pour une entreprise d'audit énergétique. Le SEO doit couvrir :
- Des requêtes génériques ("audit énergétique", "diagnostic performance énergétique")
- Des requêtes segmentées par secteur ("audit énergétique immeuble collectif",
  "auditoría energética edificio residencial")
- Des requêtes locales/nationales et, à terme, internationales

## Metadata — obligatoire sur chaque page

Chaque `page.tsx` exporte `generateMetadata` (car le contenu dépend de la locale) :

```ts
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "servicePage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `https://domaine.com/${params.locale}/services/efficacite-energetique`,
      languages: {
        fr: "https://domaine.com/fr/services/efficacite-energetique",
        es: "https://domaine.com/es/services/efficacite-energetique",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: params.locale,
      type: "website",
      images: ["/og/services-efficacite-energetique.jpg"],
    },
  };
}
```

**Règles :**
- `title` : 50–60 caractères, unique par page, format `[Sujet précis] | [Nom Entreprise]`
- `description` : 140–160 caractères, orientée conversion (inclure un bénéfice ou un appel à l'action implicite)
- Toujours renseigner `alternates.languages` avec les deux locales — évite le duplicate content
  aux yeux de Google entre FR et ES
- Une image OpenGraph dédiée par page importante (pas juste l'image par défaut du site)

## Structure des titres (hiérarchie)

- Un seul `<h1>` par page, contenant le mot-clé principal de la page
- `<h2>` pour les sections principales, `<h3>` pour les sous-sections
- Ne jamais sauter de niveau (pas de `<h3>` sans `<h2>` parent)

## Structured Data (JSON-LD)

À implémenter via des composants dans `components/seo/StructuredData.tsx`, injectés dans les layouts/pages concernés :

- **Organization** (layout racine) : nom, logo, adresses, contact, réseaux sociaux
- **LocalBusiness** (page contact / accueil) : adresse, horaires, zone de service
- **Service** (chaque page service) : nom du service, description, provider
- **BreadcrumbList** (toutes les pages sauf accueil) : fil d'ariane pour l'affichage enrichi Google
- **FAQPage** (si une section FAQ est ajoutée sur une page service) : questions/réponses

Exemple minimal pour Organization :
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Nom Entreprise]",
  "url": "https://domaine.com",
  "logo": "https://domaine.com/logo.png",
  "sameAs": ["https://linkedin.com/company/...", "https://twitter.com/..."]
}
```

## URLs et routing

- URLs propres, en minuscules, sans accents, mots séparés par des tirets :
  `/fr/services/efficacite-energetique`, `/es/services/efficacite-energetique`
- Prévoir des slugs différents par langue quand c'est plus naturel pour le SEO local
  (`/es/servicios/...` plutôt que de forcer les mêmes slugs FR sur la version ES)
- Toujours un lien canonique explicite, jamais de contenu dupliqué accessible à deux URLs différentes

## Sitemap et robots.txt

- `app/sitemap.ts` : génère automatiquement toutes les URLs pour les deux locales à partir
  des fichiers de contenu dans `content/fr/` et `content/es/`
- `app/robots.ts` : autoriser l'indexation complète, référencer le sitemap

## Performance = SEO

Le Core Web Vitals fait partie du ranking Google. Règles strictes :
- Toute image passe par `next/image` avec `width`/`height` explicites (évite le CLS)
- Fonts chargées via `next/font` (pas de `<link>` externe vers Google Fonts)
- Pas de librairie JS lourde ajoutée sans justification (vérifier l'impact bundle avec
  `@next/bundle-analyzer` avant d'ajouter une dépendance non triviale)
- Objectif : Lighthouse ≥ 95 sur Performance, SEO, Accessibilité, Best Practices

## Images

- Format WebP/AVIF (généré automatiquement par `next/image`)
- `alt` descriptif et naturel, incluant le contexte métier quand pertinent
  (ex: `alt="Technicien analysant la performance énergétique d'un immeuble collectif"`,
  pas `alt="performance énergétique immeuble collectif pas cher devis gratuit"`)

## Contenu et mots-clés

- Ne jamais faire de bourrage de mots-clés (keyword stuffing) — Google le pénalise
- Un mot-clé principal par page, décliné naturellement dans le H1, un H2, le premier paragraphe,
  et le meta title/description
- Prévoir une section blog/actualités à terme pour capter des requêtes longue traîne
  (ex: "aides financières rénovation énergétique 2026", "obligations DPE tertiaire")