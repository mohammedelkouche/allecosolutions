"use client";

import Image from "next/image";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { navigation, type NavigationItem } from "@/lib/navigation";

// Client state is required for Radix keyboard/click control and desktop hover opening.
const triggerClassName = "group relative inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:font-semibold hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2";
const itemClassName = "flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-700 outline-none transition-colors data-[highlighted]:bg-slate-100 data-[highlighted]:font-semibold data-[highlighted]:text-black";

interface DesktopMenuItemProps {
  item: NavigationItem;
  label: string;
}

function DesktopMenuItem({ item, label }: DesktopMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={triggerClassName}>
        {label}
        <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-lime-500 transition-transform duration-200 group-hover:scale-x-100" />
      </Link>
    );
  }

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger className={triggerClassName} onPointerEnter={() => setIsOpen(true)}>
        {label}
        <span aria-hidden="true" className="text-xs">▾</span>
        <span aria-hidden="true" className={`absolute inset-x-4 bottom-0 h-0.5 origin-left bg-lime-500 transition-transform duration-200 ${isOpen ? "scale-x-100" : "scale-x-0"}`} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content side="bottom" align="start" sideOffset={0} className="z-50 flex w-64 flex-col rounded-md bg-white py-2 shadow-lg">
          {item.children.map((child) => <DesktopSubmenu key={child.href} item={child} />)}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function DesktopSubmenu({ item }: { item: NavigationItem }) {
  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children?.length) {
    return <DropdownMenu.Item asChild className={itemClassName}><Link href={item.href}>{t(item.labelKey)}</Link></DropdownMenu.Item>;
  }

  return (
    <div onPointerEnter={() => setIsOpen(true)} onPointerLeave={() => setIsOpen(false)}>
      <button
        type="button"
        className="group relative flex w-full items-center justify-between gap-1 rounded-md px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:font-semibold hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {t(item.labelKey)}
        <span aria-hidden="true" className="text-xs">{isOpen ? "▴" : "▾"}</span>
        <span aria-hidden="true" className={`absolute inset-x-4 bottom-0 h-0.5 origin-left bg-lime-500 transition-transform duration-200 ${isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
      </button>
      {isOpen && (
        <div className="mt-1 ml-3 border-l border-slate-200 pl-3">
          {item.children.map((child) => (
            <DropdownMenu.Item key={child.href} asChild className={`${itemClassName} pl-4`}>
              <Link href={child.href}>{t(child.labelKey)}</Link>
            </DropdownMenu.Item>
          ))}
        </div>
      )}
    </div>
  );
}

interface MobileMenuItemProps {
  item: NavigationItem;
  closeMenu: () => void;
  depth?: number;
}

function MobileMenuItem({ item, closeMenu, depth = 0 }: MobileMenuItemProps) {
  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);
  const mobileLinkClassName = item.children?.length
    ? `flex w-full items-center justify-between rounded-md px-3 ${depth === 0 ? "py-3 text-base" : "py-2 text-sm"} text-left font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2`
    : `block rounded-md px-3 ${depth === 0 ? "py-3 text-base" : "py-2 text-sm"} font-medium text-slate-700 hover:bg-slate-100 hover:font-semibold hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2`;

  if (!item.children?.length) {
    return <Link href={item.href} className={mobileLinkClassName} onClick={closeMenu}>{t(item.labelKey)}</Link>;
  }

  return (
    <div>
      <button type="button" aria-expanded={isOpen} className={mobileLinkClassName} onClick={() => setIsOpen((open) => !open)}>
        {t(item.labelKey)}
        <span aria-hidden="true" className="text-xs">{isOpen ? "▴" : "▾"}</span>
      </button>
      {isOpen && <div className="ml-3 border-l border-slate-200 pl-3">{item.children.map((child) => <MobileMenuItem key={child.href} item={child} closeMenu={closeMenu} depth={depth + 1} />)}</div>}
    </div>
  );
}

export function Header() {
  const t = useTranslations("navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative border-b border-slate-200 bg-white text-slate-950">
      <nav aria-label={t("label")} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <button type="button" aria-expanded={isMobileMenuOpen} aria-controls="main-navigation" aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")} className="relative inline-flex items-center justify-center rounded-md p-2 text-slate-950 hover:bg-slate-100 hover:text-black focus-visible:outline-2 sm:hidden" onClick={() => setIsMobileMenuOpen((open) => !open)}>
            {isMobileMenuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
          </button>
          <Link href="#accueil" className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4">
            <Image src="/Logoalleco.png" alt="Alleco Solutions" width={226} height={128} priority className="h-15 w-auto object-contain" />
          </Link>
          <div id="main-navigation" className="hidden sm:block">
            <div className="flex items-center gap-1">
            {navigation.map((item) => <DesktopMenuItem key={item.href} item={item} label={t(item.labelKey)} />)}
            </div>
          </div>
          <LanguageSwitcher />
        </div>
        {isMobileMenuOpen && <div className="border-t border-slate-200 py-3 sm:hidden"><div className="flex flex-col gap-1">{navigation.map((item) => <MobileMenuItem key={item.href} item={item} closeMenu={() => setIsMobileMenuOpen(false)} />)}</div></div>}
      </nav>
    </header>
  );
}

export default Header;
