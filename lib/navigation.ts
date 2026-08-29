export interface NavigationItem {
  labelKey: string;
  href: string;
  children?: readonly NavigationItem[];
}

export const navigation = [
  { labelKey: "about", href: "/a-propos" },
  {
    labelKey: "services",
    href: "/services",
    children: [
      { labelKey: "energyEfficiency", href: "/services/efficacite-energetique" },
      { labelKey: "renewableEnergy", href: "/services/energies-renouvelables" },
      { labelKey: "hvac", href: "/services/cvc" },
      { labelKey: "plumbing", href: "/services/fluides-plomberie" },
      { labelKey: "insulation", href: "/services/isolation" },
    ],
  },
  {
    labelKey: "international",
    href: "/international",
    children: [
      {
        labelKey: "energyRenovation",
        href: "/international/renovation-energetique",
        children: [
          { labelKey: "spain", href: "/international/renovation-energetique/espagne" },
          { labelKey: "france", href: "/international/renovation-energetique/france" },
        ],
      },
      { labelKey: "training", href: "/international/formations" },
      { labelKey: "moroccoExtension", href: "/international/extension-maroc" },
    ],
  },
  { labelKey: "contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

export const serviceSlugs = [
  "efficacite-energetique",
  "energies-renouvelables",
  "cvc",
  "fluides-plomberie",
  "isolation",
] as const;

export const countries = ["espagne", "france"] as const;