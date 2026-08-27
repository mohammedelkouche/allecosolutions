# Coding Standards

## TypeScript

- Mode strict activé (`strict: true` dans `tsconfig.json`), ne jamais l'affaiblir
- Pas de `any` — utiliser `unknown` si le type est vraiment indéterminé, puis affiner avec un type guard
- Props de composants toujours typées via `interface`, pas de type inline complexe répété
- Utiliser les types utilitaires (`Pick`, `Omit`, `Partial`) plutôt que de dupliquer des interfaces proches

```ts
// ✅ Bon
interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

// ❌ À éviter
function ServiceCard(props: any) { ... }
```

## Composants React

- Server Components par défaut. `"use client"` uniquement si nécessaire (state, effects,
  event handlers, hooks navigateur).
- Un composant reste focalisé sur une seule responsabilité visuelle. Si un composant gère
  à la fois de l'affichage ET de la logique complexe, extraire la logique dans un hook
  personnalisé (`hooks/useContactForm.ts`) ou une fonction utilitaire.
- Toujours destructurer les props explicitement, pas de `props.xxx` répété.
- Composition plutôt qu'héritage de props : préférer `children` à des props du type
  `renderHeader`, `renderFooter`.

## Formulaires

- `react-hook-form` + `zod` pour tout formulaire (contact, éventuel devis)
- Schéma zod centralisé dans `lib/schema.ts`, réutilisé côté client (validation immédiate)
  et côté serveur (Server Action — ne jamais faire confiance uniquement au client)

```ts
// lib/schema.ts
export const contactFormSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  sector: z.enum(["residentiel", "collectif", "tertiaire"]),
  message: z.string().min(10, "Message trop court"),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;
```

## Gestion des erreurs

- Server Actions : toujours retourner un objet structuré (`{ success: boolean; error?: string }`),
  ne jamais laisser une exception non catchée remonter côté client sans message clair
- Prévoir des états de chargement (`isSubmitting`) et de confirmation visuelle pour toute action
  utilisateur (surtout le formulaire de contact — c'est le point de conversion principal du site)

## Tailwind CSS

- Ordre conventionnel des classes : positionnement/layout → dimensions → spacing → typographie →
  couleurs/fond → bordures/ombres → états (`hover:`, `focus:`, `disabled:`)
- Utiliser `clsx` ou la fonction `cn()` fournie par shadcn (`lib/utils.ts`) pour les classes conditionnelles,
  jamais de concaténation de strings manuelle
- Composants réutilisables > classes dupliquées partout : si un pattern de classes se répète
  3 fois ou plus, en faire un composant ou une variante shadcn (`cva`)
- Toujours penser mobile-first : classes de base = mobile, puis breakpoints croissants

## Commentaires et documentation

- Commenter le "pourquoi", pas le "quoi" (le code doit déjà être lisible pour le "quoi")
- Tout contenu textuel provisoire doit être marqué `// TODO: contenu à valider avec le client`
- Les fonctions complexes dans `lib/` ont une JSDoc courte décrivant l'objectif et les paramètres

## Organisation des imports

Ordre conventionnel, avec une ligne vide entre chaque groupe :
1. Imports React/Next.js
2. Imports de librairies externes
3. Imports internes (`@/components`, `@/lib`)
4. Imports de types
5. Imports de styles (rare avec Tailwind)

## Tests et vérifications avant commit

- `npm run lint` et `npm run build` doivent passer sans erreur avant tout commit
- Vérifier visuellement le rendu mobile (375px) et desktop (1440px) minimum pour toute nouvelle section
- Vérifier qu'aucune chaîne de texte visible n'est restée en dur (voir `docs/i18n-guidelines.md`)