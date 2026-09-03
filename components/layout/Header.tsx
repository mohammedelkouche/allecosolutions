"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { navigation, type NavigationItem } from "@/lib/navigation";

// ─── Shared class strings ────────────────────────────────────────────────────
const triggerClassName =
  "group relative inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:font-semibold hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2";
const itemClassName =
  "flex w-full items-center px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:font-semibold hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2";
const quoteButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2";
const moroccoButtonClassName =
  "inline-flex min-h-11 flex-col items-center justify-center rounded-md border border-primary px-4 py-2 text-center text-xs font-semibold leading-tight text-primary transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2";

const quoteFormUrl = process.env.NEXT_PUBLIC_QUOTE_FORM_URL ?? "";

const moroccoHref =
  navigation
    .find((item) => item.labelKey === "international")
    ?.children?.find((child) => child.labelKey === "moroccoExtension")?.href ??
  "/international/extension-maroc";

// ─── useHoverMenu ─────────────────────────────────────────────────────────────
//
// A minimal hook that owns one boolean + one debounce timer.
//
// WHY NO RADIX DROPDOWNMENU FOR THE PANEL?
//   Radix DropdownMenu was removed from the hover panels entirely.
//   Two hard-to-kill bugs came from it:
//
//   1. SCROLL LOCK — Radix sets `document.body.style.overflow = hidden` when
//      any DropdownMenu.Root opens, to prevent scroll-behind-modal. In a
//      hover-driven nav without a Portal the lock fires but the "close on
//      pointer-outside" logic runs at the wrong time, so the lock never
//      releases cleanly → page scroll is blocked until full reload.
//      `modal={false}` suppresses the lock but then Radix's focus-trap and
//      click-outside handling break in other ways.
//
//   2. PHANTOM CLOSE — Radix's internal `onOpenChange(false)` fires whenever
//      it considers the pointer to have left the menu area. Without a Portal
//      the Content sits inline, which confuses Radix's hit-testing (it was
//      designed for Portal use). Result: the menu flickers closed even though
//      our wrapper div still has pointer focus.
//
//   Solution: plain <div> panels controlled entirely by this hook.
//   We get hover-open/close, keyboard/Escape close, and click-outside close
//   ourselves — a dozen lines of code with zero framework interference.
//
// DEBOUNCE:
//   Open is immediate. Close waits 150 ms so the pointer can cross the gap
//   between the trigger and the panel without the panel collapsing.
//
// FORCE-MOUNT + CSS HIDE:
//   Panels are always in the DOM; visibility is CSS-only (opacity + pointer-
//   events + visibility). No DOM insertion/removal means no phantom pointer
//   events when a node appears under the cursor.
// ─────────────────────────────────────────────────────────────────────────────
function useHoverMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const open = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setIsOpen(false);
  }, []);

  return { isOpen, open, scheduleClose, close };
}

// ─── DesktopMenuItem ──────────────────────────────────────────────────────────
interface DesktopMenuItemProps {
  item: NavigationItem;
  label: string;
}

function DesktopMenuItem({ item, label }: DesktopMenuItemProps) {
  const { isOpen, open, scheduleClose, close } = useHoverMenu();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  // Simple leaf link — no panel needed
  if (!item.children?.length) {
    return (
      <Link href={item.href} className={triggerClassName}>
        {label}
        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100"
        />
      </Link>
    );
  }

  return (
    // The wrapper is the single hover zone — both trigger button and panel
    // live inside it, so the pointer never "leaves" while moving between them.
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={open}
      onPointerLeave={scheduleClose}
    >
      {/* Trigger button — purely visual, hover is on the wrapper */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        suppressHydrationWarning
        className={triggerClassName}
        onClick={() => (isOpen ? close() : open())}
      >
        {label}
        <span aria-hidden="true" className="text-xs">▾</span>
        <span
          aria-hidden="true"
          className={`absolute inset-x-4 bottom-0 h-0.5 origin-left bg-primary transition-transform duration-200 ${
            isOpen ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      {/* Panel — always mounted, shown/hidden with CSS only.
          `visibility:hidden` removes it from tab order and hit-testing
          when closed so nothing underneath is accidentally clickable. */}
      <div
        role="menu"
        className={`absolute left-0 top-full z-50 w-64 rounded-md border border-border bg-background py-2 shadow-lg transition-all duration-150 ${
          isOpen
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {item.children.map((child) => (
          <DesktopSubmenu key={child.href} item={child} onClose={close} />
        ))}
      </div>
    </div>
  );
}

// ─── DesktopSubmenu ───────────────────────────────────────────────────────────
interface DesktopSubmenuProps {
  item: NavigationItem;
  onClose: () => void; // propagates close up to the top-level menu
}

function DesktopSubmenu({ item, onClose }: DesktopSubmenuProps) {
  const t = useTranslations("navigation");
  const { isOpen, open, scheduleClose } = useHoverMenu();

  // Leaf item — plain link, no nested panel
  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        role="menuitem"
        className={itemClassName}
        onClick={onClose}
      >
        {t(item.labelKey)}
      </Link>
    );
  }

  // Item with a third-level flyout panel
  return (
    <div
      className="relative"
      onPointerEnter={open}
      onPointerLeave={scheduleClose}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`${itemClassName} justify-between`}
      >
        {t(item.labelKey)}
        <span aria-hidden="true" className="text-xs ml-2">▸</span>
      </button>

      {/* Third-level flyout — same always-mounted CSS pattern */}
      <div
        role="menu"
        className={`absolute left-full top-0 ml-1 w-56 rounded-md border border-border bg-background py-2 shadow-lg transition-all duration-150 ${
          isOpen
            ? "visible opacity-100 translate-x-0"
            : "invisible opacity-0 -translate-x-1 pointer-events-none"
        }`}
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            role="menuitem"
            className={itemClassName}
            onClick={onClose}
          >
            {t(child.labelKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── MobileMenuItem ───────────────────────────────────────────────────────────
interface MobileMenuItemProps {
  item: NavigationItem;
  closeMenu: () => void;
  depth?: number;
}

function MobileMenuItem({ item, closeMenu, depth = 0 }: MobileMenuItemProps) {
  const t = useTranslations("navigation");
  const [isOpen, setIsOpen] = useState(false);

  const mobileLinkClassName = item.children?.length
    ? `flex w-full items-center justify-between rounded-md px-3 ${
        depth === 0 ? "py-3 text-base" : "py-2 text-sm"
      } text-left font-medium text-muted-foreground hover:bg-secondary hover:font-semibold hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2`
    : `block rounded-md px-3 ${
        depth === 0 ? "py-3 text-base" : "py-2 text-sm"
      } font-medium text-muted-foreground hover:bg-secondary hover:font-semibold hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2`;

  if (!item.children?.length) {
    return (
      <Link href={item.href} className={mobileLinkClassName} onClick={closeMenu}>
        {t(item.labelKey)}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        className={mobileLinkClassName}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {t(item.labelKey)}
        <span aria-hidden="true" className="text-xs">
          {isOpen ? "▴" : "▾"}
        </span>
      </button>
      {isOpen && (
        <div className="ml-3 border-l border-border pl-3">
          {item.children.map((child) => (
            <MobileMenuItem
              key={child.href}
              item={child}
              closeMenu={closeMenu}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const t = useTranslations("navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isOnMoroccoPage = pathname === moroccoHref;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white text-foreground">
      <nav
        aria-label={t("label")}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="relative flex h-20 items-center justify-between">

          {/* Mobile hamburger */}
          <button
            type="button"
            suppressHydrationWarning
            aria-expanded={isMobileMenuOpen}
            aria-controls="main-navigation"
            aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
            className="relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary hover:text-foreground focus-visible:outline-2 sm:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Image
              src="/Logoalleco.png"
              alt="Alleco Solutions"
              width={226}
              height={128}
              priority
              className="h-15 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <div id="main-navigation" className="hidden items-center gap-4 sm:flex">
            <div className="flex items-center gap-1">
              {navigation.map((item) => (
                <DesktopMenuItem
                  key={item.href}
                  item={item}
                  label={t(item.labelKey)}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={quoteFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={quoteButtonClassName}
              >
                {t("requestQuote")}
              </a>
              {!isOnMoroccoPage && (
                <Link href={moroccoHref} className={moroccoButtonClassName}>
                  <span className="block">{t("growMoroccoLine1")}</span>
                  <span className="block">{t("growMoroccoLine2")}</span>
                </Link>
              )}
            </div>
          </div>

          <LanguageSwitcher />
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-white py-3 sm:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <MobileMenuItem
                  key={item.href}
                  item={item}
                  closeMenu={() => setIsMobileMenuOpen(false)}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-3 border-t border-border px-3 pt-3">
              <a
                href={quoteFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${quoteButtonClassName} w-full`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("requestQuote")}
              </a>
              {!isOnMoroccoPage && (
                <Link
                  href={moroccoHref}
                  className={`${moroccoButtonClassName} w-full`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="block">{t("growMoroccoLine1")}</span>
                  <span className="block">{t("growMoroccoLine2")}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;