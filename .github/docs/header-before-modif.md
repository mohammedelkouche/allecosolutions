
"use client";

import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "À propos", href: "#a-propos" },
  {
    name: "Nos services",
    href: "#services",
    children: [
      { name: "Efficacité énergétique", href: "#efficacite-energetique" },

      { name: "Énergies renouvelables", href: "#energies-renouvelables" },
      { name: "CVC", href: "#cvc" },
      { name: "Fluides & plomberie", href: "#fluides-plomberie" },
      { name: "Isolation", href: "#isolation" },
    ],
  },
  {
    name: "À l'international",
    href: "#international",
    children: [
      {
        name: "Rénovation énergétique",
        href: "#renovation-energetique",
        children: [
          { name: "Espagne", href: "#espagne" },
          { name: "France", href: "#france" },
        ],
      },
      { name: "Formations", href: "#formations" },
      { name: "Implantation & Développement au Maroc", href: "#maroc" },
    ],
  },
  { name: "Contactez-nous", href: "#contact" },
];

export function Header() {
  const t = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="relative border-b border-slate-200 bg-white text-slate-950">
      <nav aria-label={t("label")} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-950 hover:bg-slate-100 hover:text-black sm:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
            </span>
          </button>

          <Link href="#accueil" className="flex shrink-0 items-center">
            <Image
              src="/Logoalleco.png"
              alt="Alleco Solutions"
              width={226}
              height={128}
              priority
              className="h-15 w-auto object-contain"
            />
          </Link>

          <div id="main-navigation" className="hidden sm:block">
            <div className="flex items-center gap-1">
              {navigation.map((item) => {
                const hasChildren = Boolean(item.children?.length);

                return (
                  <div key={item.name} className="group relative">
                    <a
                      href={item.href}
                      className="relative inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:font-semibold hover:text-black"
                    >
                      {t(item.name)}
                      {hasChildren && <span aria-hidden="true" className="text-xs">▾</span>}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-lime-500 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      />
                    </a>

                    {hasChildren && (
                      <div className="invisible absolute left-0 top-full z-20 w-64 translate-y-1 rounded-md border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                        {item.children?.map((child) => (
                          <div key={child.name} className="group/sub relative">
                            <a
                              href={child.href}
                              className="flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus:bg-slate-100 focus:outline-none"
                            >
                              {t(child.name)}
                              {child.children && <span aria-hidden="true" className="text-xs">›</span>}
                            </a>
                            {child.children && (
                              <div className="invisible absolute left-full top-0 z-30 w-40 rounded-md border border-slate-200 bg-white py-2 opacity-0 shadow-lg transition-all group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
                                {child.children.map((grandchild) => (
                                  <a
                                    key={grandchild.name}
                                    href={grandchild.href}
                                    className="block px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus:bg-slate-100 focus:outline-none"
                                  >
                                    {t(grandchild.name)}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <LanguageSwitcher />
        </div>

        {isMenuOpen && (
          <div className="border-t border-slate-200 py-3 sm:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={openMobileSection === item.name}
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black"
                      onClick={() => setOpenMobileSection((open) => open === item.name ? null : item.name)}
                    >
                      {t(item.name)}
                      <span aria-hidden="true">{openMobileSection === item.name ? "▴" : "▾"}</span>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.name)}
                    </a>
                  )}
                  {item.children && openMobileSection === item.name && (
                    <div className="ml-3 border-l border-slate-200 pl-3">
                      {item.children.map((child) => (
                        <div key={child.name}>
                          {child.children ? (
                            <button
                              type="button"
                              aria-expanded={openMobileSubmenu === child.name}
                              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus:outline-none"
                              onClick={() => setOpenMobileSubmenu((open) => open === child.name ? null : child.name)}
                            >
                              {t(child.name)}
                              <span aria-hidden="true">{openMobileSubmenu === child.name ? "▴" : "▾"}</span>
                            </button>
                          ) : (
                            <a
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus:outline-none"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {t(child.name)}
                            </a>
                          )}
                          {child.children && openMobileSubmenu === child.name && (
                            <div className="ml-3 border-l border-slate-200 pl-3">
                              {child.children.map((grandchild) => (
                                <a
                                  key={grandchild.name}
                                  href={grandchild.href}
                                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus:outline-none"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {t(grandchild.name)}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;